const express = require('express');
const router = express.Router();
const axios = require('axios');

const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

async function queryHuggingFaceModel(prompt) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/distilgpt2',
      { inputs: prompt, parameters: { max_new_tokens: 50 } },
      { headers: { Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}` } }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data[0]?.generated_text || "No response";
  } catch (error) {
    console.error('Error querying Hugging Face API:', error.response?.status, error.response?.data || error.message);
    throw error;
  }
}

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await queryHuggingFaceModel(message);
    console.log('Generated reply:', reply);

    res.json({ reply });
  } catch (error) {
    console.error('Error in /api/ai/chat:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
