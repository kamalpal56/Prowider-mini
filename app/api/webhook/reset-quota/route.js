import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Provider from "@/models/Provider";
import WebhookEvent from "@/models/WebhookEvent";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        {
          message:
            "eventId required"
        },
        { status: 400 }
      );
    }

    // Idempotency check
    const existing =
      await WebhookEvent.findOne({
        eventId
      });

    if (existing) {
      return NextResponse.json({
        message:
          "Already processed"
      });
    }

    // Reset quota
    await Provider.updateMany(
      {},
      {
        usedQuota: 0
      }
    );

    // Save event
    await WebhookEvent.create({
      eventId,
      processed: true
    });

    return NextResponse.json({
      message:
        "Quota reset successful"
    });

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error.message
      },
      { status: 500 }
    );
  }
}