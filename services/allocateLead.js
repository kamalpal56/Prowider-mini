import mongoose from "mongoose";
import Provider from "@/models/Provider";
import AllocationState from "@/models/AllocationState";
import LeadAssignment from "@/models/LeadAssignment";

const rules = {
  "Service 1": {
    mandatory: ["Provider 1"],
    pool: [
      "Provider 2",
      "Provider 3",
      "Provider 4"
    ]
  },
  "Service 2": {
    mandatory: ["Provider 5"],
    pool: [
      "Provider 6",
      "Provider 7",
      "Provider 8"
    ]
  },
  "Service 3": {
    mandatory: [
      "Provider 1",
      "Provider 4"
    ],
    pool: [
      "Provider 2",
      "Provider 3",
      "Provider 5",
      "Provider 6",
      "Provider 7",
      "Provider 8"
    ]
  }
};

export default async function allocateLead(
  lead
) {

  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {

    const config =
      rules[lead.service];

    let assigned = [];

    // Mandatory
    for (
      const providerName
      of config.mandatory
    ) {

      const provider =
        await Provider.findOne({
          name:
            providerName
        }).session(
          session
        );

      if (
        provider &&
        provider.usedQuota <
          provider.monthlyQuota
      ) {
        assigned.push(
          provider
        );
      }
    }

    // Rotation
    let state =
      await AllocationState.findOne({
        service:
          lead.service
      }).session(
        session
      );

    let index =
      state.currentIndex;

      let attempts = 0;
    while (
      assigned.length < 3 &&
  attempts <
    config.pool.length * 2
    ) {

      const poolProvider =
        config.pool[
          index %
          config.pool.length
        ];

      const provider =
        await Provider.findOne({
          name:
            poolProvider
        }).session(
          session
        );

      const exists =
        assigned.some(
          (p) =>
            p._id.toString() ===
            provider._id.toString()
        );

      if (
        provider &&
        !exists &&
        provider.usedQuota <
          provider.monthlyQuota
      ) {

        assigned.push(
          provider
        );
      }

      index++;
      attempts++;
    }

    if (assigned.length < 3) {
  throw new Error(
    "Not enough providers available"
  );
}

    state.currentIndex =
      index %
      config.pool.length;

    await state.save({
      session
    });

    for (
      const provider
      of assigned
    ) {

      await LeadAssignment.create(
        [{
          leadId:
            lead._id,
          providerId:
            provider._id
        }],
        { session }
      );

      provider.usedQuota += 1;

      await provider.save({
        session
      });
    }

    await session.commitTransaction();

    return assigned;

  } catch (
    error
  ) {

    await session.abortTransaction();
    throw error;

  } finally {

    session.endSession();
  }
}