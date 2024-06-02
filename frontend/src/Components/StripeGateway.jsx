import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../css/StripeGateway.css";
import { Alert, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const StripeGateway = () => {
  const location = useLocation();
  const bookingInfo = location.state?.bookingInfo || {};

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country: "United States",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.cardNumber || formData.cardNumber.includes("_"))
      newErrors.cardNumber = "Valid card number is required";
    if (!formData.expiryDate || formData.expiryDate.includes("_"))
      newErrors.expiryDate = "Valid expiry date is required";
    if (!formData.cvc || formData.cvc.length !== 3)
      newErrors.cvc = "Valid CVC is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setPaymentSuccess(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/bookings",
          bookingInfo
        );
        if (response.status === 201) {
          setTimeout(() => {
            setPaymentSuccess(true);
            navigate("/");
          }, 3000);
        }
      } catch (err) {
        errors.server = "Server error, please try again later";
      }
    } else {
      setErrors(formErrors);
    }
  };
  const errorMessages = Object.values(errors).join(", ");
  const navigate = useNavigate();
  return (
    <div className="mock-payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Shipping information</h2>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="Pakistan">Pakistan</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <h2>Payment details</h2>
        <div className="form-row">
          <label htmlFor="cardNumber">Card Number</label>
          <InputMask
            mask="9999 9999 9999 9999"
            maskChar=""
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="expiryDate">Expiry Date</label>
          <InputMask
            mask="99/99"
            maskChar=""
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="cvc">CVC</label>
          <InputMask
            mask="999"
            maskChar=""
            id="cvc"
            name="cvc"
            placeholder="123"
            value={formData.cvc}
            onChange={handleChange}
            required
          />
        </div>
        {errors && <span className="error">{errorMessages}</span>}
        {paymentSuccess && (
          <>
            <Alert severity="success">Payment successful! Redirectig...</Alert>
            <CircularProgress color="secondary" />
          </>
        )}
        <button type="submit">Pay ${bookingInfo.price}</button>
      </form>
    </div>
  );
};

export default StripeGateway;
