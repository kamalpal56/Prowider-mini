"use client";

import { useState } from "react";
import axios from "axios";

export default function RequestService() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "Service 1",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/leads",
        form
      );

      alert(res.data.message);

      setForm({
        name: "",
        phone: "",
        city: "",
        service: "Service 1",
        description: ""
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Error"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Request Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>Service 1</option>
          <option>Service 2</option>
          <option>Service 3</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          className="bg-black text-white px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}