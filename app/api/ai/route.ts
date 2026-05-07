import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { word } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an English accent coach. Explain US vs UK differences simply and clearly.",
        },
        {
          role: "user",
          content: `Explain US vs UK usage of: ${word}`,
        },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error: any) {
  console.log("OPENAI ERROR:", error.response?.data || error.message);

    return Response.json(
      {
        result:
          "AI failed. Check API key or OpenAI access.",
      },
      { status: 500 }
    );
  }
}