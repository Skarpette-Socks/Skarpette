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
    const mailOptions = {
        from: `"Skarpette" ${process.env.EMAIL_USER}`,
        to: process.env.EMAIL_USER,
        subject: "Новий відгук в магазині Skarpette!",
        html: `
            <h1>Новий відгук в магазині Skarpette!</h1>
            <p>Відгук:</p>
            <ul>
                <li>Оцінка: ${feedback.score}</li>
                <li>Ім'я: ${feedback.firstname}</li>
                <li>Прізвище: ${feedback.lastname}</li>
                <li>Текст відгуку: ${feedback.comment}</li>
            <ul>
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
            <h1>Нове запитання у магазині Skarpette!</h1>
            <ul>
                <li>Ім'я: ${helpBody.firstname}</li>
                <li>Email: ${helpBody.email}</li>
                <li>Запитання: ${helpBody.comment}</li>
            <ul>
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
