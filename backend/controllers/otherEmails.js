const nodemailer = require("nodemailer");

const sendFeedbackToOwner = async (req, res) => {
    const feedback = req.body;
    if (feedback.score > 5 || feedback.score <= 0 || !feedback.score) {
        return res.status(400).json("Score should be between 1 and 5");
    }
    if (!feedback.firstname || !feedback.lastname || !feedback.comment) {
        return res.status(400).json("All fields should be filled");
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });

    let filledStars = "";
    for (let i = 0; i < feedback.score; i++) {
        filledStars += `
    <span style="font-size: 18px; display: inline-block; line-height: 1; color: #FFC000;">★</span>`;
    }

    let emptyStars = "";
    for (let i = 0; i < 5 - feedback.score; i++) {
        emptyStars += `
    <span style="font-size: 18px; display: inline-block; line-height: 1;">✩</span>`;
    }

    const starRating = filledStars + emptyStars;

    const mailOptions = {
        from: `"Skarpette" ${process.env.EMAIL_USER}`,
        to: process.env.EMAIL_USER,
        subject: "Новий відгук в магазині Skarpette!",
        html: `
              <div style="
                    font-family: MacPaw Fixel, sans-serif;
                    max-width: 800px;
                    margin-inline: auto;
                ">
                    <h1 style="font-size: 35px;">
                        На Вашому сайті Skarpette.com.ua, залишили нове звернення
                    </h1>
                    <div>
                        <h4 style="margin: 0; font-size: 18px;"><b>ПІБ:</b> ${feedback.firstname} ${feedback.lastname}</h4>
                        <h4 style="margin: 0; font-size: 18px;"><b>Пошта:</b> ${feedback.email}</h4>
                        <!-- Виправлений контейнер для оцінки -->
                        <div style="margin-top: 5px;">
                            <p style="font-size: 18px; margin: 0;"><b>Оцінка:</b> ${starRating}</p>
                        </div>
                    </div>
                    <p style="
                        color: rgb(60, 60, 60);
                        margin-top: 25px;
                        font-size: 18px;
                    ">${feedback.comment}</p>
                </div>
        `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json(info.response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sendHelpFormToOwner = async (req, res) => {
    const helpBody = req.body;
    if (!helpBody.firstname || !helpBody.email || !helpBody.comment) {
        return res.status(400).json("All fields should be filled");
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });
    const mailOptions = {
        from: `"Skarpette" ${process.env.EMAIL_USER}`,
        to: process.env.EMAIL_USER,
        subject: "Нове запитання у магазині Skarpette!",
        html: `
            <div style="
              font-family: MacPaw Fixel, sans-serif;
              max-width: 800px;
              margin-inline: auto;
            ">
              <h1 style="font-size: 35px;">
                На Вашому сайті Skarpette.com.ua, залишили нове звернення
              </h1>
              <div>
                <h4 style="margin: 0; font-size: 18px;"><b>ПІБ:</b> ${helpBody.firstname}</h4>
                <h4 style="margin: 0; font-size: 18px;"><b>Пошта:</b> ${helpBody.email}</h4>
              </div>
              <p style="
                color: rgb(60, 60, 60);
                margin-top: 25px;
                font-size: 18px;
              ">${helpBody.comment}</p>
            </div>
        `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json(info.response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendFeedbackToOwner,
    sendHelpFormToOwner,
};
