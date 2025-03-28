// import { AssemblyAI } from "assemblyai"
// import { NextResponse } from "next/server"

// const assemblyAi = new AssemblyAI({apiKey:process.env.ASSEMBLY_API_KEY})

// export async function GET(req) {
//     const token = await assemblyAi.realtime.createTemporaryToken({expires_in:3600})
//     return NextResponse.json({token})
// }

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const assemblyAi = new AssemblyAI({ apiKey: process.env.ASSEMBLY_API_KEY}); // Ensure this matches your .env

export async function GET(req) {
    try {
        console.log('API Key from env:', process.env.ASSEMBLY_API_KEY); // Debug env variable
        if (!process.env.ASSEMBLY_API_KEY) {
            throw new Error('ASSEMBLYAI_API_KEY is not set in environment variables');
        }

        const token = await assemblyAi.realtime.createTemporaryToken({ expires_in: 3600 });
        console.log('Generated temporary token:', token); // Debug token
        return NextResponse.json({ token });
    } catch (error) {
        console.error('Error in /api/getToken:', error.message); // Log server-side error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}