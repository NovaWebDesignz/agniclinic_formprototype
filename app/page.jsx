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
  
    const appointmentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: new Date().toISOString().split("T")[0], // Current date
    };
  
    try {
      // Step 1: Send data to Google Sheets
      const formDataEncoded = new URLSearchParams(appointmentData);
      const sheetResponse = await axios.post(
        "https://script.google.com/macros/s/AKfycbzZSrJioLt2fCWY53lc53kfKvaFOFjvb3hGBN9DBHDaDPEee8Y2tyXwLRZ7I1eQtoy2/exec",
        formDataEncoded
      );
  
      if (sheetResponse.status === 200) {
        console.log("Data saved to Google Sheets!");
  
        // Step 2: Send SMS confirmation
        const smsResponse = await axios.post("/api/sendSms", appointmentData);
  
        if (smsResponse.data.success) {
          console.log("SMS sent successfully!");
        } else {
          console.warn("SMS sending failed:", smsResponse.data.error);
        }
  
        // Step 3: Send Email confirmation
        const emailResponse = await axios.post("/api/sendEmail", appointmentData);
  
        if (emailResponse.data.success) {
          console.log("Email sent successfully!");
        } else {
          console.warn("Email sending failed:", emailResponse.data.error);
        }
  
        alert("Appointment booked! Confirmation sent via SMS and Email.");
        setFormData({ name: "", email: "", phone: "" }); // Reset form fields
      } else {
        throw new Error("Failed to save data in Google Sheets.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center mb-7">
        <img src="/images/agni_logo.png" alt="Agni Logo" width={60} height={80} />
        <div className="ml-4">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">AGNI</h1>
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Advanced Holistic Therapy</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="dark:bg-slate-600 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          onChange={handleChange}
          value={formData.phone}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 dark:text-white py-2 rounded">
          Submit
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Developed by <span className="font-semibold">NovaWebDesignz</span>
        </p>
        <img src="/images/NWDLogo.png" alt="NovaWebDesignz Logo" width={80} height={30} className="mt-2" />
      </div>
    </div>
  );
}
