import React, { useState } from 'react';
import { summitFrom } from '../../../Services/contact';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(), // Adding the current time
    };

    summitFrom(templateParams);

    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Get in Touch</h1>
          <p className="text-secondary mx-auto col-lg-6">
            Have a question about a course or need technical support? We're here to help.
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex gap-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-3 d-flex align-items-center justify-content-center" style={{height: 'fit-content'}}>
                    <i className="bi bi-envelope fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Email Us</h5>
                    <p className="text-secondary small mb-2">Replies within 24 hours.</p>
                    <a href="mailto:support@learncode.com" className="fw-medium text-decoration-none">support@learncode.com</a>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex gap-3">
                  <div className="bg-success-subtle text-success p-3 rounded-3 d-flex align-items-center justify-content-center" style={{height: 'fit-content'}}>
                    <i className="bi bi-telephone fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Call Us</h5>
                    <p className="text-secondary small mb-2">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+919236530730" className="fw-medium text-decoration-none">+91 789-7063-398</a>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex gap-3">
                  <div className="bg-danger-subtle text-danger p-3 rounded-3 d-flex align-items-center justify-content-center" style={{height: 'fit-content'}}>
                    <i className="bi bi-geo-alt fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Visit Us</h5>
                    <p className="text-secondary small mb-0">
                      Noida,<br />India 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-soft rounded-4 p-4 p-lg-5 h-100">
              {submitted ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 py-5">
                  <div className="bg-success-subtle text-success rounded-circle p-4 mb-4">
                    <i className="bi bi-send fs-1"></i>
                  </div>
                  <h2 className="fw-bold mb-2">Message Sent!</h2>
                  <p className="text-secondary mb-4">Thank you for contacting us. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn btn-light"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bi bi-chat-text text-primary"></i>
                    <h4 className="fw-bold mb-0">Send us a message</h4>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-bold small text-secondary">Full Name</label>
                      <input
                        type="text"
                        className="form-control bg-light border-0 py-3 rounded-3"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-bold small text-secondary">Email Address</label>
                      <input
                        type="email"
                        className="form-control bg-light border-0 py-3 rounded-3"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-bold small text-secondary">Subject</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-3 rounded-3"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-bold small text-secondary">Message</label>
                    <textarea
                      className="form-control bg-light border-0 py-3 rounded-3"
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      style={{resize: 'none'}}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 rounded-3 fw-bold"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;