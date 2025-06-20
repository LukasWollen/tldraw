import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

export const app = express();
app.use(express.json({ limit: '1mb' }));

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post('/api/chat', async (req, res) => {
  const { prompt, canvas } = req.body;

  const messages = [
    { role: 'system', content: 'You are a canvas assistant.' },
    { role: 'assistant', content: `Canvas state: ${JSON.stringify(canvas)}` },
    { role: 'user', content: prompt },
  ];

  const functions = [
    {
      name: 'applyTldrawChanges',
      description: 'Apply changes to the canvas.',
      parameters: {
        type: 'object',
        properties: {
          shapes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                action: { type: 'string' },
                data: { type: 'object' },
              },
              required: ['action', 'data'],
            },
          },
        },
      },
    },
  ];

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    const completion = await openai.createChatCompletion(
      {
        model: 'gpt-4.1',
        messages,
        functions,
        function_call: 'auto',
        stream: true,
      },
      { responseType: 'stream' }
    );

    completion.data.on('data', (chunk: Buffer) => {
      const payload = chunk.toString();
      if (payload.trim()) res.write(payload);
    });

    completion.data.on('end', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
