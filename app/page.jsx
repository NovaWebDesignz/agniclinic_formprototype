"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Agni Logo & Name - Logo on Left, Text on Right, Both Centered */}
      <div className="flex items-center mb-7">
        <Image src="/images/agni_logo.png" alt="Agni Logo" width={60} height={80} />
        <div className="ml-4 ">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">AGNI</h1>
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Advanced Holistic Therapy</h2>
        </div>
      </div>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="dark:bg-slate-600 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="tel" name="phone" placeholder="Your Phone" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="w-full bg-blue-500 dark:text-white py-2 rounded">Submit</button>
      </form>

      {/* NovaWebDesignz Credits */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Developed by <span className="font-semibold">NovaWebDesignz</span>
        </p>
        <Image src="/images/NWDLogo.png" alt="NovaWebDesignz Logo" width={80} height={30} className="mt-2" />
      </div>
    </div>
  );
}
