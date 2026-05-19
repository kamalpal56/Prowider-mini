import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Provider from "@/models/Provider";
import LeadAssignment from "@/models/LeadAssignment";
import Lead from "@/models/Lead";

export async function GET() {
  try {

    await connectDB();

    const providers =
      await Provider.find();

    const result = [];

    for (const provider of providers) {

      const assignments =
        await LeadAssignment.find({
          providerId: provider._id
        }).populate("leadId");

      result.push({
        providerId: provider._id,
        name: provider.name,
        monthlyQuota:
          provider.monthlyQuota,
        usedQuota:
          provider.usedQuota,
        remainingQuota:
          provider.monthlyQuota -
          provider.usedQuota,
        leadsReceived:
          assignments.length,
        assignments
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      {
        message: error.message
      },
      { status: 500 }
    );
  }
}
