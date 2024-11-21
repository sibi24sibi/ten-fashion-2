import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    Subject: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to:`, value); 
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); 
    try {
      const response = await axios.post('http://localhost:8000/contactForm', formData);
      console.log('Response from server:', response.data); 
      setResponseMessage(response.data.message);
      setFormData({
        fullName: '',
        email: '',
        Subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error during form submission:', error); // Debug log
      setResponseMessage(
        error.response?.data?.error || 'Failed to submit the form. Please try again.'
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Subject" className="block text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            id="Subject"
            name="Subject"
            value={formData.Subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Submit
        </button>
      </form>
      {responseMessage && <p className="mt-4 text-center text-green-700">{responseMessage}</p>}
    </div>
  );
};

export default ContactForm;
