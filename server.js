// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Или используйте axios
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware для обработки JSON-запросов и CORS
app.use(express.json());
app.use(cors());

// Загружаем API-ключ из .env
const apiKey = process.env.API_KEY;

// Роут для работы с OpenAI API
app.post('/api/gpt', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
