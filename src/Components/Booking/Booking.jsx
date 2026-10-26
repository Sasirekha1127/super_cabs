import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NiceSelect from "../Header/NiceSelect";

function Booking() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ service: "", vehicle: "", tripType: "", passengers: "" });
    const [formMessage, setFormMessage] = useState({ text: "", type: "" });

    const serviceOptions = [
        { value: "Local Taxi", label: "Local Taxi" },
        { value: "Outstation Taxi", label: "Outstation Taxi" },
        { value: "Airport Taxi", label: "Airport Taxi" },
        { value: "Corporate Taxi", label: "Corporate Taxi" },
        { value: "Tour Package", label: "Tour Package" },
    ];
    const vehicleOptions = [
        { value: "Hatchback", label: "Hatchback" },
        { value: "Sedan", label: "Sedan" },
        { value: "Premium Sedan", label: "Premium Sedan" },
        { value: "SUV", label: "SUV" },
        { value: "MPV / 7-Seater", label: "MPV / 7-Seater" },
        { value: "Tempo Traveller", label: "Tempo Traveller" },
    ];
    const tripOptions = [
        { value: "One-Way", label: "One-Way" },
        { value: "Round-Trip", label: "Round-Trip" },
        { value: "Hourly / Local", label: "Hourly / Local" },
    ];
    const passengerOptions = [
        { value: "1-4", label: "1 - 4 Passengers" },
        { value: "5-7", label: "5 - 7 Passengers" },
        { value: "8+", label: "8+ Passengers" },
    ];

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.service || !formData.vehicle || !formData.tripType || !formData.passengers) {
            setFormMessage({ text: "Please select all options before continuing.", type: "error" });
            return;
        }
        // Frontend only: carry the selection to the enquiry form on the Contact page.
        navigate("/contact", { state: { enquiry: formData } });
    };

    return (
        <div className="booking-sec">
            <div className="container">
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="input-wrap">
                        <div className="row align-items-center justify-content-between">
                            <div className="form-group col-md-6 col-lg-auto">
                                <div className="icon">
                                    <i className="fa-light fa-route" />
                                </div>
                                <div className="search-input">
                                    <label>Service</label>
                                    <NiceSelect options={serviceOptions} defaultValue="Select Service" onChange={(v) => handleChange("service", v)} />
                                </div>
                            </div>
                            <div className="form-group col-md-6 col-lg-auto">
                                <div className="icon">
                                    <i className="fa-regular fa-car" />
                                </div>
                                <div className="search-input">
                                    <label>Vehicle</label>
                                    <NiceSelect options={vehicleOptions} defaultValue="Select Vehicle" onChange={(v) => handleChange("vehicle", v)} />
                                </div>
                            </div>
                            <div className="form-group col-md-6 col-lg-auto">
                                <div className="icon">
                                    <i className="fa-light fa-clock" />
                                </div>
                                <div className="search-input">
                                    <label>Trip Type</label>
                                    <NiceSelect options={tripOptions} defaultValue="Select Trip" onChange={(v) => handleChange("tripType", v)} />
                                </div>
                            </div>
                            <div className="form-group col-md-6 col-lg-auto">
                                <div className="icon">
                                    <i className="fa-light fa-users" />
                                </div>
                                <div className="search-input">
                                    <label>Passengers</label>
                                    <NiceSelect options={passengerOptions} defaultValue="Select Passengers" onChange={(v) => handleChange("passengers", v)} />
                                </div>
                            </div>
                            <div className="form-btn col-md-12 col-lg-auto">
                                <button className="th-btn" type="submit">
                                    <img src="/assets/img/icon/search.svg" alt="" />
                                    Enquire
                                </button>
                            </div>
                        </div>

                        {formMessage.text && (
                            <p className="form-messages mb-0 mt-3 text-danger">{formMessage.text}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Booking;
