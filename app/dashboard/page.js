"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [providers, setProviders] =
    useState([]);

  const fetchDashboard =
    async () => {
      const res =
        await axios.get(
          "/api/dashboard"
        );

      setProviders(res.data);
    };

 useEffect(() => {

  fetchDashboard();

  const interval =
    setInterval(() => {
      fetchDashboard();
    }, 3000);

  return () =>
    clearInterval(interval);

}, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Provider Dashboard
      </h1>

      <div className="space-y-6">

        {providers.map((provider) => (

          <div
            key={provider.providerId}
            className="border p-4 rounded"
          >

            <h2 className="font-bold text-xl">
              {provider.name}
            </h2>

            <p>
              Remaining Quota:
              {" "}
              {provider.remainingQuota}
            </p>

            <p>
              Leads Received:
              {" "}
              {provider.leadsReceived}
            </p>

            <div className="mt-3">

              <h3 className="font-semibold">
                Assigned Leads
              </h3>

              <ul className="list-disc ml-6">

                {provider.assignments.map(
                  (a) => (

                  <li
                    key={a._id}
                  >
                    {a.leadId?.name}
                    {" - "}
                    {a.leadId?.service}
                  </li>

                ))}
              </ul>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}