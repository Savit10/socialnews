import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const response = await fetch('https://api-inference.huggingface.co/models/arpit-sri/news-sum', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"inputs": data.text })
    });
    return NextResponse.json(await response.json());
}