'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './CaseStudyConversionBlock.module.css';

interface CaseStudyConversionBlockProps {
  caseStudySlug: string;
  caseStudyTitle: string;
}

export default function CaseStudyConversionBlock({
  caseStudySlug,
  caseStudyTitle,
}: CaseStudyConversionBlockProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectOutline: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [intent, setIntent] = useState<'enquiry' | 'pdf-request'>('enquiry');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (submittedIntent: 'enquiry' | 'pdf-request') => {
    setIntent(submittedIntent);
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          caseStudySlug,
          intent: submittedIntent,
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

  if (status === 'success') {
    return (
      <section className={styles.block}>
        <div className={styles.successState}>
          <h2 className={styles.successHeading}>Thank you for reaching out.</h2>
          <p className={styles.successText}>
            {intent === 'pdf-request'
              ? 'We have received your request. A member of our team will send you the case study PDF and be in touch within one business day.'
              : 'We have received your enquiry. A member of our team will be in touch within one business day.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.block}>
      <div className={styles.inner}>

        {/* Headline */}
        <div className={styles.headlineGroup}>
          <h2 className={styles.headline}>
            Planning a project at {caseStudyTitle}&apos;s scale?
          </h2>
          <p className={styles.subline}>
            We have delivered enterprise-grade solutions across AI, blockchain,
            and custom software for clients in 13+ countries. Tell us about
            your project.
          </p>
        </div>

        {/* Form */}
        <div className={styles.formWrapper}>
          {status === 'error' && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cs-name">
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                id="cs-name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Jane Smith"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cs-email">
                Work Email <span className={styles.required}>*</span>
              </label>
              <input
                id="cs-email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="jane@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="cs-company">
              Company <span className={styles.required}>*</span>
            </label>
            <input
              id="cs-company"
              name="company"
              type="text"
              className={styles.input}
              placeholder="Acme Corporation"
              value={formData.company}
              onChange={handleChange}
              disabled={status === 'submitting'}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="cs-outline">
              Project Outline <span className={styles.required}>*</span>
            </label>
            <textarea
              id="cs-outline"
              name="projectOutline"
              className={styles.textarea}
              placeholder="Briefly describe your project, timeline, and any specific requirements..."
              value={formData.projectOutline}
              onChange={handleChange}
              disabled={status === 'submitting'}
              rows={4}
              required
            />
          </div>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <button
              className={styles.primaryCta}
              onClick={() => handleSubmit('enquiry')}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' && intent === 'enquiry'
                ? 'Sending...'
                : 'Start Your Project'}
            </button>
            <button
              className={styles.secondaryCta}
              onClick={() => handleSubmit('pdf-request')}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' && intent === 'pdf-request'
                ? 'Sending...'
                : 'Request PDF'}
            </button>
          </div>
        </div>

        {/* Trust Strip */}
        <div className={styles.trustStrip}>
          <Image
            src="/images/home/IsoCertificate.svg"
            alt="ISO Certified"
            width={80}
            height={40}
            className={styles.trustBadge}
          />
          <Image
            src="/images/home/appg.png"
            alt="APPG AI Secretariat"
            width={80}
            height={40}
            className={styles.trustBadge}
          />
          <Image
            src="/images/awards/clutch.png"
            alt="Clutch Top Rated"
            width={80}
            height={40}
            className={styles.trustBadge}
          />
        </div>

      </div>
    </section>
  );
}
