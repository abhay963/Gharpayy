import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { question, report } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required"
      });
    }

    const prompt = `
You are an AI assistant for a CRM dashboard called Gharpayy.

You help managers understand analytics, leads, and conversions.

DASHBOARD REPORT:
${JSON.stringify(report, null, 2)}

USER QUESTION:
${question}

Rules:
- Keep answers short (3-5 lines)
- Explain metrics clearly
- If asked about leads, pipeline, conversion explain using report data
- Be simple and helpful
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a smart AI assistant for a CRM dashboard helping users understand analytics."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 200
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].message.content;

    res.json({
      success: true,
      answer
    });

  } catch (error) {

    console.error("AI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI assistant failed"
    });

  }
});

export default router;