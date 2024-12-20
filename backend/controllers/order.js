const Order = require("../models/order");
const Skarpette = require("../models/skarpette");
const { format } = require("date-fns");
const { DateTime } = require("luxon");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getKyivTime = () => {
    return DateTime.now().setZone("Europe/Kyiv").toJSDate();
};

const generateOrderNumber = async () => {
    const orderDate = getKyivTime();
    const datePart = format(orderDate, "ddMMyy");

    let sequenceNumber = "01";
    let orderNumber = `${datePart}${sequenceNumber}`;

    let latestOrder = await Order.findOne({ orderNumber });

    while (latestOrder) {
        const latestSequence = orderNumber.slice(-2);
        sequenceNumber = (parseInt(latestSequence, 10) + 1)
            .toString()
            .padStart(2, "0");

        orderNumber = `${datePart}${sequenceNumber}`;

        latestOrder = await Order.findOne({ orderNumber });
    }

    return orderNumber;
};

const validateRecipientData = (orderData) => {
    console.log(orderData);
    if (orderData.isDifferentRecipient) {
        if (
            !orderData.recipientData.firstName ||
            !orderData.recipientData.lastName ||
            !orderData.recipientData.phoneNumber
        ) {
            return "All fields must be filled";
        }
    } else {
        if (orderData.recipientData) {
            return "No fields should be filled";
        }
    }
    return null;
};

const validateDeliveryData = (deliveryData) => {
    if (!deliveryData.deliveryType) {
        return "Delivery type is missing";
    }

    if (deliveryData.deliveryType === "НПКур'єр") {
        if (
            !deliveryData.street ||
            !deliveryData.apartmentNumber ||
            !deliveryData.houseNumber
        ) {
            return `Street, Apartment Number and House Number should be filled for ${deliveryData.deliveryType}`;
        } else if (deliveryData.departmentNumber) {
            return `${deliveryData.deliveryType} does not require Department Number`;
        }
    } else {
        if (!deliveryData.departmentNumber) {
            return `Department Number should be filled for ${deliveryData.deliveryType}`;
        } else if (deliveryData.street || deliveryData.apartmentNumber) {
            return `${deliveryData.deliveryType} does not require Street or Apartment Number`;
        }
    }
};

function encrypt(text) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY, "hex");
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

function decrypt(encryptedData) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY, "hex");
    if (typeof encryptedData !== "string") {
        return;
    }

    const parts = encryptedData.split(":");
    if (parts.length !== 2) {
        throw new Error("Invalid encrypted data format.");
    }

    const iv = Buffer.from(parts.shift(), "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

const encryptObject = (obj) => {
    const encryptedObject = {};
    for (let key in obj) {
        if (typeof obj[key] === "string" && key !== "deliveryType") {
            encryptedObject[key] = encrypt(obj[key]);
        } else {
            encryptedObject[key] = obj[key];
        }
    }
    return encryptedObject;
};

const decryptObject = (obj) => {
    const decryptedObject = {};
    for (let key in obj) {
        if (typeof obj[key] === "string" && key !== "deliveryType") {
            decryptedObject[key] = decrypt(obj[key]);
        } else {
            decryptedObject[key] = obj[key];
        }
    }
    return decryptedObject;
};

const sendOrderEmailToCustomer = async (orderData, userEmail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });

    let orderDetails = "";
    for (let item of orderData.items) {
        const skarpette = await Skarpette.findOne({
            vendor_code: item.skarpetteVendorCode,
        });
        if (skarpette) {
            const price = skarpette.price2 || skarpette.price;
            const imageUrl =
                skarpette.images_urls?.[0] || "https://via.placeholder.com/200";
            orderDetails += `
                <div style="display: flex; align-items: center; gap: 60px; margin-top: 30px;"> <!-- Збільшено gap -->
                    <div style="flex-shrink: 0; margin-right: 20px;"> <!-- Додано margin-right -->
                        <img src="${imageUrl}" alt="${skarpette.name}" style="width: 124px; height: 124px; object-fit: cover; border-radius: 10px;" />
                    </div>
                    <div>
                        <p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Артикул:</b> ${skarpette.vendor_code}</p>
                        <p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Назва:</b> ${skarpette.name}</p>
                        <p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Розмір:</b> ${item.size}</p>
                        <p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Кількість:</b> ${item.quantity}</p>
                        <p style="margin: 0; font-size: 16px;"><b>Ціна:</b> ${price} грн</p>
                    </div>
                </div>
            `;
        }
    }

    const customerInfo = `<p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Покупець: </b>${
        orderData.customerData.firstName
    } ${orderData.customerData.lastName}, ${
        orderData.customerData.phoneNumber
    }, ${orderData.deliveryData.city}${
        orderData.deliveryData.street
            ? ", " + orderData.deliveryData.street
            : ""
    }${
        orderData.deliveryData.houseNumber
            ? ", " + orderData.deliveryData.houseNumber
            : ""
    }${
        orderData.deliveryData.apartmentNumber
            ? ", " + orderData.deliveryData.apartmentNumber
            : ""
    }</p>`;

    let otherCustomerInfo = "";
    if (orderData.isDifferentRecipient) {
        otherCustomerInfo = `<p style="margin: 0; margin-bottom: 8px; font-size: 16px;"><b>Інший отримувач: </b>${orderData.recipientData.firstName} ${orderData.recipientData.lastName}, ${orderData.recipientData.phoneNumber}</p>`;
    }

    const mailOptions = {
        from: `Skarpette <${process.env.EMAIL_USER}>`,
        to: orderData.customerData.email,
        subject: "Дякуємо за замовлення!",
        html: `
          <!DOCTYPE html>
          <html style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.42857143; margin: 0; padding: 0;">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Деталі замовлення</title>
            </head>
            <body>
              <div style="max-width: 800px; margin: 20px auto; padding: 20px;">
                <h2 style="color: black; font-size: 22px; font-weight: 400; line-height: 26.4px; letter-spacing: -0.01em; text-align: left; text-underline-position: from-font;
                text-decoration-skip-ink: none;">
                    Дякуємо, що обрали Skarpette.com.ua! <br />
                    Ваше замовлення №${orderData.orderNumber}. <br />
                    Менеджер онлайн замовлень зв'яжеться з Вами найближчим часом для
                    узгодження всіх деталей. <br />
                    Якщо у Вас виникли будь-які запитання, напишіть нам на пошту
                    shop.skarpette@gmail.com або зателефонуйте за номером телефону
                    +38 (098) 32-64-872
                </h2>
                <hr style="height: 1px; border: none; background-color: #edeff1; margin-top: 20px;" />
    
                ${orderDetails}
    
                <hr style="height: 1px; border: none; background-color: #edeff1; margin-top: 20px;" />
    
                <p style="margin: 0; padding: 0; font-size: 16px; font-family: MacPaw Fixel, sans-serif;"><b>Вартість замовлення: </b>${
                    orderData.totalPrice
                } грн</p>
    
                <div style="margin-top: 20px;">
                    <div style="margin-bottom: 10px; font-size: 16px; font-family: MacPaw Fixel, sans-serif;">
                        ${customerInfo}
                    </div>
                    ${
                        orderData.isDifferentRecipient
                            ? `<div style="margin-bottom: 10px; font-size: 16px; font-family: MacPaw Fixel, sans-serif;">
                                <p><b>Інший отримувач:</b> ${otherCustomerInfo}</p> 
                            </div>`
                            : ""
                    }
                </div>
                <div style="margin-top: 20px;">
                    <p style="margin: 0; padding: 0; font-size: 16px;"><b>Спосіб оплати:</b> ${
                        orderData.paymentType
                    }</p>
                </div>
                <p style="margin-top: 40px; font-size: 22px; font-weight: 400; line-height: 26.4px; letter-spacing: -0.01em; text-align: left; text-underline-position: from-font; text-decoration-skip-ink: none;">
                    З любов’ю, Ваші
                    <a href="https://skarpette.com.ua/" target="_blank">Skarpette.com.ua</a>
                </p>
            </div>
            </body>
          </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

const sendOrderEmailToOwner = async (orderData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });

    let orderDetails = "";
    for (let item of orderData.items) {
        const skarpette = await Skarpette.findOne({
            vendor_code: item.skarpetteVendorCode,
        });
        if (skarpette) {
            const imageUrl =
                skarpette.images_urls?.[0] || "https://via.placeholder.com/200";
            orderDetails += `
                <div style="margin-bottom: 20px;">
                    <h3>${skarpette.name}</h3>
                    <img src="${imageUrl}" alt="${skarpette.name}" style="width: 200px; height: auto; margin-bottom: 10px;" />
                    <p><strong>Розмір:</strong> ${item.size}</p>
                    <p><strong>Кількість:</strong> ${item.quantity}</p>
                </div>
                <hr />
            `;
        }
    }

    const mailOptions = {
        from: `"Skarpette" ${process.env.EMAIL_USER}`,
        to: process.env.EMAIL_USER,
        subject: "Нове замовлення в магазині Skarpette!",
        html: `
            <h1>Нове замовлення в магазині Skarpette!</h1>
            <p><strong>Деталі замовлення:</strong></p>
            <ul>
                <li><strong>Номер замовлення:</strong> ${
                    orderData.orderNumber || "Невідомо"
                }</li>
                <li><strong>Загальна сума:</strong> ${
                    orderData.totalPrice || "Невідомо"
                } грн</li>
                <li><strong>Дані замовника:</strong>
                    <pre>${
                        JSON.stringify(orderData.customerData, null, 2) ||
                        "Відсутні"
                    }</pre>
                </li>
                <li><strong>Інший отримувач:</strong>
                    <pre>${
                        orderData.isDifferentRecipient &&
                        orderData.recipientData
                            ? JSON.stringify(orderData.recipientData, null, 2)
                            : "Відсутній"
                    }</pre>
                </li>
                <li><strong>Дані доставки:</strong>
                    <pre>${
                        JSON.stringify(orderData.deliveryData, null, 2) ||
                        "Відсутні"
                    }</pre>
                </li>
                <li><strong>Коментар:</strong> ${
                    orderData.comment || "Відсутній"
                }</li>
                <li><strong>Тип оплати:</strong> ${
                    orderData.paymentType || "Невідомо"
                }</li>
                <li><strong>Оплачено:</strong> ${
                    orderData.isPaid ? "Так" : "Ні"
                }</li>
            </ul>
            <h2>Товари в замовленні:</h2>
            <pre>${orderDetails || "Товари не знайдено."}</pre>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email to owner sent: ", info.response);
    } catch (error) {
        console.error("Error sending email to owner: ", error);
    }
};

const createOrder = async (req, res) => {
    try {
        let orderData = req.body;
        orderData.orderDate = getKyivTime();
        const recipientValidationError = validateRecipientData(orderData);
        if (recipientValidationError) {
            return res.status(400).json({ error: recipientValidationError });
        }
        const deliveryValidationError = validateDeliveryData(
            orderData.deliveryData
        );
        if (deliveryValidationError) {
            return res.status(400).json({ error: deliveryValidationError });
        }
        orderData.orderNumber = await generateOrderNumber();
        orderDataForEmail = { ...orderData };
        orderData.customerData = encryptObject(orderData.customerData);
        orderData.deliveryData = encryptObject(orderData.deliveryData);
        if (orderData.isDifferentRecipient) {
            orderData.recipientData = encryptObject(orderData.recipientData);
        }
        if (orderData.comment) {
            orderData.comment = encrypt(orderData.comment);
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        await sendOrderEmailToCustomer(
            orderDataForEmail,
            orderDataForEmail.customerData.email
        );
        await sendOrderEmailToOwner(orderDataForEmail);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json("Order not found");
        }
        if (order.customerData) {
            order.customerData = decryptObject(order.customerData);
        }
        if (order.deliveryData) {
            order.deliveryData = decryptObject(order.deliveryData);
        }
        if (order.recipientData) {
            order.recipientData = decryptObject(order.recipientData);
        }
        if (order.comment) {
            order.comment = encrypt(order.comment);
        }

        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json("Orders not found");
        }
        for (let order of orders) {
            if (order.customerData) {
                order.customerData = decryptObject(order.customerData);
            }
            if (order.deliveryData) {
                order.deliveryData = decryptObject(order.deliveryData);
            }
            if (order.recipientData) {
                order.recipientData = decryptObject(order.recipientData);
            }
            if (order.comment) {
                order.comment = decrypt(order.comment);
            }
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json("Order not found");
        }
        await order.deleteOne();
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json("Order not found");
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrder,
};
