const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

// YOUR TELEGRAM BOT TOKEN
const BOT_TOKEN = '8639768633:AAECOGGd5DDDSNgb8lpPZfodZAL7GZaxWPY';

// YOUR TELEGRAM CHAT ID
const CHAT_ID = '8715498548';

app.post('/submit', async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            message
        } = req.body;

        const text = `
🔥 New Lead Received

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
💬 Message: ${message}
        `;

        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await axios.post(telegramURL, {
            chat_id: CHAT_ID,
            text: text
        });

        res.json({
            success: true,
            message: 'Form submitted successfully'
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Error submitting form'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});