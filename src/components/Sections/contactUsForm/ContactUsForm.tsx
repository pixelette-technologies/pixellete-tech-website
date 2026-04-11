'use client';

import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import React, { useState } from 'react';
import './contactusform.css';

type ContactUsProps = {
  backgrounds?: boolean;
  header?: boolean;
  insideHeading?: string;
  pageName?: string;
};

const PROJECT_TYPES = [
  'Blockchain Development',
  'Software Development',
  'AI Solutions',
  'Mobile App Development',
];

const HEARD_FROM_OPTIONS = [
  'Search Engine',
  'Clutch',
  'Social Media',
  'Referral',
  'Others',
];

export const ContactUsForm: React.FC<ContactUsProps> = (props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectType: '',
    budget: '',
    heardFrom: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          caseStudySlug: '',
          intent: 'enquiry',
          source: props.pageName || 'Contact Page',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      {!props.backgrounds && (
        <Container className="main">
          <div className="contactUs-background">
            <Image
              src="/assets/contactUs.contactUsLeftBackground"
              alt="left background"
              width={100}
              height={100}
            />
            <Image
              src="/assets/contactUs.contactUsRightBackground"
              alt="right background"
              width={100}
              height={100}
            />
          </div>
        </Container>
      )}

      <div className="contactUs">
        {!props.header && (
          <center>
            <h1 id="h_ani">
              Contact Us
            </h1>
            <p>
              Get in touch to let us know what you&apos;re looking for, and one of
              our solutions architects will get back to you.
            </p>
          </center>
        )}

        <section>
          <div>
            {props.insideHeading && (
              <h3>{props.insideHeading}</h3>
            )}

            {status === 'success' ? (
              <div className="contactUs-success">
                <h3>Thank you for reaching out.</h3>
                <p>
                  We have received your enquiry. A member of our team will be
                  in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {status === 'error' && (
                  <p className="contactUs-error">{errorMessage}</p>
                )}

                {/* Name row */}
                <div className="contactUs-form-flex">
                  <div className="contactUs-field">
                    <label htmlFor="cu-firstName">
                      First Name
                      {' '}
                      <span className="contactUs-required">*</span>
                    </label>
                    <input
                      id="cu-firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className="contactUs-field">
                    <label htmlFor="cu-lastName">
                      Last Name
                      {' '}
                      <span className="contactUs-required">*</span>
                    </label>
                    <input
                      id="cu-lastName"
                      name="lastName"
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                </div>

                {/* Email and Phone row */}
                <div className="contactUs-form-flex">
                  <div className="contactUs-field">
                    <label htmlFor="cu-email">
                      Email
                      {' '}
                      <span className="contactUs-required">*</span>
                    </label>
                    <input
                      id="cu-email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className="contactUs-field">
                    <label htmlFor="cu-phone">Phone number</label>
                    <input
                      id="cu-phone"
                      name="phone"
                      type="tel"
                      placeholder="+44 7700 000000"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                {/* Company and Job Title row */}
                <div className="contactUs-form-flex">
                  <div className="contactUs-field">
                    <label htmlFor="cu-company">Company name</label>
                    <input
                      id="cu-company"
                      name="company"
                      type="text"
                      placeholder="Acme Corporation"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div className="contactUs-field">
                    <label htmlFor="cu-jobTitle">Job title</label>
                    <input
                      id="cu-jobTitle"
                      name="jobTitle"
                      type="text"
                      placeholder="Chief Technology Officer"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                {/* Project Type and Budget row */}
                <div className="contactUs-form-flex">
                  <div className="contactUs-field">
                    <label htmlFor="cu-projectType">Project Type</label>
                    <select
                      id="cu-projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    >
                      <option value="">Please Select</option>
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="contactUs-field">
                    <label htmlFor="cu-budget">Budget (Optional)</label>
                    <input
                      id="cu-budget"
                      name="budget"
                      type="text"
                      placeholder="e.g. £50,000 – £100,000"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                {/* Heard from */}
                <div className="contactUs-field">
                  <label htmlFor="cu-heardFrom">How did you hear about us?</label>
                  <select
                    id="cu-heardFrom"
                    name="heardFrom"
                    value={formData.heardFrom}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                  >
                    <option value="">Please Select</option>
                    {HEARD_FROM_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="contactUs-field">
                  <label htmlFor="cu-message">
                    Message
                    {' '}
                    <span className="contactUs-required">*</span>
                  </label>
                  <textarea
                    id="cu-message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    rows={5}
                    required
                  />
                </div>

                {/* Consent */}
                <div className="contactUs-consent">
                  <input
                    id="cu-consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                  <label htmlFor="cu-consent">
                    I want to receive information about Pixelette Technologies
                    and its services. I agree to share my data with Pixelette
                    Technologies.
                  </label>
                </div>

                <button
                  type="submit"
                  className="contactUs-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
