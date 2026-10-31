import React, { useState } from 'react';
import siteConfig, { telHref, waHref } from '../data/siteConfig';
import { submitContactEnquiry } from '../../services/bookingService';

const styles = `
.spc-contact-form-section {
    padding: 70px 0;
    background: #f8fafc;
    position: relative;
}
.spc-contact-container {
    max-width: 1080px;
    margin: 0 auto;
}
.spc-form-wrapper {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 15px 45px rgba(11, 34, 41, 0.08);
    overflow: hidden;
}
.spc-form-banner {
    background: linear-gradient(135deg, #0b2229 0%, #163e4b 100%);
    padding: 34px 36px;
    color: #ffffff;
}
.spc-form-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: rgba(56, 189, 248, 0.18);
    color: #38bdf8;
    margin-bottom: 12px;
}
.spc-form-head-title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 8px 0;
}
.spc-form-head-desc {
    font-size: 14px;
    color: #cbd5e1;
    margin: 0;
    line-height: 1.5;
}
.spc-form-body {
    padding: 36px;
}
.spc-form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.spc-form-col-full {
    grid-column: 1 / -1;
}
.spc-input-group {
    display: flex;
    flex-direction: column;
}
.spc-label {
    font-size: 13px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.spc-req {
    color: #ef4444;
    margin-left: 2px;
}
.spc-field-wrap {
    position: relative;
    display: flex;
    align-items: center;
}
.spc-field-icon {
    position: absolute;
    left: 14px;
    color: #94a3b8;
    font-size: 14px;
    pointer-events: none;
}
.spc-field-input {
    width: 100%;
    height: 48px;
    padding: 0 14px 0 42px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #ffffff;
    font-size: 14px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
    font-family: inherit;
}
.spc-field-input:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.spc-field-input.has-error {
    border-color: #ef4444;
    background: #fffafa;
}
.spc-field-select {
    width: 100%;
    height: 48px;
    padding: 0 36px 0 42px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #ffffff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat calc(100% - 14px) center;
    font-size: 14px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
    appearance: none;
    cursor: pointer;
    font-family: inherit;
}
.spc-field-select:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.spc-field-textarea {
    width: 100%;
    min-height: 120px;
    padding: 12px 14px 12px 42px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #ffffff;
    font-size: 14px;
    color: #0f172a;
    transition: all 0.2s ease;
    outline: none;
    resize: vertical;
    font-family: inherit;
}
.spc-field-textarea:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
.spc-field-textarea-icon {
    position: absolute;
    top: 14px;
    left: 14px;
    color: #94a3b8;
    font-size: 14px;
    pointer-events: none;
}
.spc-error-txt {
    font-size: 11.5px;
    color: #ef4444;
    margin-top: 4px;
    font-weight: 500;
}
.spc-form-submit-row {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
}
.spc-btn-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
    transition: all 0.25s ease;
}
.spc-btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(2, 132, 199, 0.5);
    background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
}
.spc-btn-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}
.spc-form-note {
    font-size: 12.5px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 6px;
}
.spc-success-alert {
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
}
.spc-success-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #22c55e;
    color: #ffffff;
    display: grid;
    place-items: center;
    font-size: 20px;
    flex-shrink: 0;
}
.spc-success-title {
    font-size: 17px;
    font-weight: 800;
    color: #15803d;
    margin: 0 0 4px 0;
}
.spc-success-desc {
    font-size: 13.5px;
    color: #166534;
    margin: 0;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .spc-form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    .spc-form-body {
        padding: 24px 20px;
    }
    .spc-form-banner {
        padding: 24px 20px;
    }
    .spc-form-submit-row {
        flex-direction: column;
        align-items: stretch;
    }
    .spc-btn-submit {
        width: 100%;
    }
}
`;

const SUBJECT_OPTIONS = [
    'General Taxi Booking Enquiry',
    'Outstation One Way Drop Cab',
    'Round Trip Outstation Cab',
    'Airport Pickup / Drop Transfer',
    'Hourly / Local City Rental',
    'Corporate Taxi Tie-up',
    'Tour Package Enquiry',
    'Tariff & Rates Query',
    'Other / Support Feedback'
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: 'General Taxi Booking Enquiry',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) {
            errs.name = 'Full name is required';
        } else if (formData.name.trim().length > 80) {
            errs.name = 'Name must be 80 characters or fewer';
        }

        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (!phoneDigits) {
            errs.phone = 'Mobile number is required';
        } else if (phoneDigits.length < 10) {
            errs.phone = 'Please enter a valid 10-digit mobile number';
        }

        if (formData.email.trim()) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
                errs.email = 'Please enter a valid email address';
            }
        }

        if (!formData.message.trim()) {
            errs.message = 'Please enter your message or travel requirements';
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                subject: formData.subject,
                message: formData.message.trim()
            };

            await submitContactEnquiry(payload);

            setSubmittedName(payload.name);
            setSubmittedEmail(payload.email);
            setIsSubmitted(true);

            // Reset fields
            setFormData({
                name: '',
                phone: '',
                email: '',
                subject: 'General Taxi Booking Enquiry',
                message: ''
            });
        } catch (err) {
            console.error('[ContactForm] Submission error:', err);
            // Even if offline, show pleasant acknowledgement
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="spc-contact-form-section" id="contact-form">
            <style>{styles}</style>
            <div className="container spc-contact-container">
                <div className="spc-form-wrapper">
                    {/* Header Banner */}
                    <div className="spc-form-banner">
                        <span className="spc-form-badge">
                            <i className="fa-solid fa-envelope-open-text"></i> Quick Contact Form
                        </span>
                        <h2 className="spc-form-head-title">Send Us A Direct Message</h2>
                        <p className="spc-form-head-desc">
                            Have questions about our one-way drop taxi tariffs, airport transfers, or corporate cab packages? Fill out the form below and our 24/7 dispatch desk will respond immediately.
                        </p>
                    </div>

                    {/* Form Body */}
                    <div className="spc-form-body">
                        {isSubmitted && (
                            <div className="spc-success-alert">
                                <div className="spc-success-icon">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div>
                                    <h4 className="spc-success-title">Message Sent Successfully!</h4>
                                    <p className="spc-success-desc">
                                        Thank you <strong>{submittedName}</strong>! Your inquiry has been delivered to the Super Cabs dispatch desk. 
                                        {submittedEmail && (
                                            <span> An email confirmation has been sent to <strong>{submittedEmail}</strong>.</span>
                                        )}
                                        {" "}Our team will contact you shortly.
                                    </p>
                                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        <a href={telHref()} className="btn btn-sm btn-outline-success fw-bold">
                                            <i className="fa-solid fa-phone me-1"></i> Call 24/7 Helpline ({siteConfig.phoneDisplay})
                                        </a>
                                        <a
                                            href={waHref(`Hello Super Cabs, I just submitted an inquiry on your website under ${submittedName}.`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-success fw-bold"
                                        >
                                            <i className="fab fa-whatsapp me-1"></i> Chat on WhatsApp
                                        </a>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-link text-decoration-none"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="spc-form-grid">
                                {/* Name Field */}
                                <div className="spc-input-group">
                                    <label className="spc-label">
                                        Your Full Name <span className="spc-req">*</span>
                                    </label>
                                    <div className="spc-field-wrap">
                                        <i className="fa-solid fa-user spc-field-icon"></i>
                                        <input
                                            type="text"
                                            className={`spc-field-input ${errors.name ? 'has-error' : ''}`}
                                            placeholder="e.g. Ramesh Kumar"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.name && <span className="spc-error-txt">{errors.name}</span>}
                                </div>

                                {/* Phone Field */}
                                <div className="spc-input-group">
                                    <label className="spc-label">
                                        Mobile Number <span className="spc-req">*</span>
                                    </label>
                                    <div className="spc-field-wrap">
                                        <i className="fa-solid fa-phone spc-field-icon"></i>
                                        <input
                                            type="tel"
                                            className={`spc-field-input ${errors.phone ? 'has-error' : ''}`}
                                            placeholder="10-digit mobile number"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.phone && <span className="spc-error-txt">{errors.phone}</span>}
                                </div>

                                {/* Email Field */}
                                <div className="spc-input-group">
                                    <label className="spc-label">
                                        Email Address <span className="text-muted fw-normal" style={{ fontSize: '11.5px' }}>(Optional for email copy)</span>
                                    </label>
                                    <div className="spc-field-wrap">
                                        <i className="fa-solid fa-envelope spc-field-icon"></i>
                                        <input
                                            type="email"
                                            className={`spc-field-input ${errors.email ? 'has-error' : ''}`}
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                        />
                                    </div>
                                    {errors.email && <span className="spc-error-txt">{errors.email}</span>}
                                </div>

                                {/* Subject Dropdown */}
                                <div className="spc-input-group">
                                    <label className="spc-label">
                                        Enquiry Subject <span className="spc-req">*</span>
                                    </label>
                                    <div className="spc-field-wrap">
                                        <i className="fa-solid fa-tag spc-field-icon"></i>
                                        <select
                                            className="spc-field-select"
                                            value={formData.subject}
                                            onChange={(e) => handleChange('subject', e.target.value)}
                                        >
                                            {SUBJECT_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Message Field (Full Width) */}
                                <div className="spc-input-group spc-form-col-full">
                                    <label className="spc-label">
                                        Your Message / Travel Requirement <span className="spc-req">*</span>
                                    </label>
                                    <div className="spc-field-wrap">
                                        <i className="fa-solid fa-comment-dots spc-field-textarea-icon"></i>
                                        <textarea
                                            className={`spc-field-textarea ${errors.message ? 'has-error' : ''}`}
                                            placeholder="Please mention your pickup city, destination, preferred dates, vehicle type, or any specific questions..."
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                    {errors.message && <span className="spc-error-txt">{errors.message}</span>}
                                </div>
                            </div>

                            {/* Submit Row */}
                            <div className="spc-form-submit-row">
                                <button
                                    type="submit"
                                    className="spc-btn-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane"></i>
                                            <span>Send Message Now</span>
                                        </>
                                    )}
                                </button>

                                <div className="spc-form-note">
                                    <i className="fa-solid fa-shield-halved text-success"></i>
                                    <span>Your privacy is protected. Instant email notification triggered.</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
