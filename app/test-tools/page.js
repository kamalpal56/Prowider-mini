"use client";

import axios from "axios";

export default function TestTools() {

  const resetQuota =
    async () => {

      const res =
        await axios.post(
          "/api/webhook/reset-quota",
          {
            eventId:
              "payment_demo"
          }
        );

      alert(
        res.data.message
      );
    };

  const generateLeads =
    async () => {

      const res =
        await axios.post(
          "/api/test/generate-leads"
        );

      alert(
        res.data.message
      );
    };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Test Tools
      </h1>

      <div className="space-y-4">

        <button
          onClick={
            resetQuota
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reset Quota
        </button>

        <button
          onClick={
            generateLeads
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate 10 Leads
        </button>

      </div>
    </div>
  );
}