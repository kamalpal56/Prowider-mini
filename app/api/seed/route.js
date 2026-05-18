import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Provider from "@/models/Provider";
import Service from "@/models/Service";
import AllocationState from "@/models/AllocationState";

export async function GET() {
  try {
    await connectDB();

    await Provider.deleteMany();
    await Service.deleteMany();
    await AllocationState.deleteMany();

    await Service.insertMany([
      { name: "Service 1" },
      { name: "Service 2" },
      { name: "Service 3" }
    ]);

    const providers = [];

    for (let i = 1; i <= 8; i++) {
      providers.push({
        name: `Provider ${i}`
      });
    }

    await Provider.insertMany(providers);

    await AllocationState.insertMany([
      { service: "Service 1" },
      { service: "Service 2" },
      { service: "Service 3" }
    ]);

    return NextResponse.json({
      message: "Seed complete"
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}