// app/api/decline-transaction/route.js
import { NextResponse } from 'next/server';
import prisma from "@repo/db/client";

export async function POST(request) {
    try {
        const { token } = await request.json();
        
        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }
        
        await prisma.onRampTransaction.update({
            where: { token },
            data: { status: "Failure" }
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error declining transaction:', error);
        return NextResponse.json({ error: 'Failed to decline transaction' }, { status: 500 });
    }
}