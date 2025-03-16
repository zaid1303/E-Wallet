// app/api/approved-transaction/route.js
import { NextResponse } from "next/server";
import db from "@repo/db/client";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    const paymentInformation = {
      token: body.token,
      userId: body.user_identifier,
      amount: body.amount
    };

    const tx = await db.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.token
      }
    });
    
    if (tx != null && tx.status === "Processing") {
      await db.$transaction([
        db.balance.updateMany({
          where: {
            userId: Number(paymentInformation.userId)
          },
          data: {
            amount: {
              increment: Number(paymentInformation.amount)
            }
          }
        }),
        db.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token
          },
          data: {
            status: "Success",
          }
        })
      ]);
      
      return NextResponse.json({
        message: "Transaction approved successfully"
      }, { status: 200 });
    } else {
      return NextResponse.json({
        message: "Transaction not found or not in Processing state"
      }, { status: 400 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Error while processing transaction"
    }, { status: 500 });
  }
}