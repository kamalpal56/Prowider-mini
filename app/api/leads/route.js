import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";
import allocateLead from "@/services/allocateLead";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const lead = await Lead.create(body);

console.log("Lead created:", lead._id);

const assignedProviders =
  await allocateLead(lead);

console.log(
  "Assigned providers:",
  assignedProviders
);

    return NextResponse.json({
      message: "Lead created",
      providers:
        assignedProviders.map(
          (p) => p.name
        )
    });

  } catch (error) {

    if (error.code === 11000) {
      return NextResponse.json(
        {
          message:
            "Duplicate lead for same service"
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: error.message
      },
      { status: 500 }
    );
  }
}