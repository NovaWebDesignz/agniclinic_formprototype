"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const googleSheetURL = "YOUR_GOOGLE_SCRIPT_DEPLOYMENT_URL";

    try {
      await axios.post(googleSheetURL, formData);
      alert("Appointment booked successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="dark:bg-slate-600 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="tel" name="phone" placeholder="Your Phone" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="w-full bg-blue-500 dark:text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
