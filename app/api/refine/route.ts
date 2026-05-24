import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY; 
    if (!apiKey) {
      return NextResponse.json({ error: "API Key configurations missing." }, { status: 500 });
    }

    const prompt = `You are the elite core engine of LIMITLESS AI, a premium text transformation utility. 
Your task is to take standard machine-like AI text and upgrade it into a 100% human-sounding, highly engaging copy.

CRITICAL DIRECTIVES:
1. Remove all stereotypical AI words: 'delve', 'testament', 'revolutionize', 'furthermore', 'moreover', 'robust'.
2. Inject natural variation in sentence length (burstiness) and completely dynamic structural flow.
3. Strictly execute according to the selected mode:
   - 'premium': Elegant, professional, authoritative, and clean corporate style.
   - 'creative': Vivid, story-driven, deeply engaging, using powerful metaphors.
   - 'ultra': Radical, sharp, high-impact, premium direct-response marketing style.
4. Maintain the core factual meaning perfectly, but rewrite the syntax entirely.

Text to optimize: "${text}"`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const refinedText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ result: refinedText });
  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "Failed to process AI request parameters safely." }, { status: 500 });
  }
}
