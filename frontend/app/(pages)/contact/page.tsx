'use client';

import { useState } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import styles from './Contact.module.css';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSendContactForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phoneNumber, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send');
      }
      setStatus('✅ Message sent—thanks!');
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles['container']}>
        <div className={styles['title-section']}>
          <p className={styles['page-title']}>Contact</p>
        </div>

        <form onSubmit={handleSendContactForm} className={styles['form-container']}>
          <div className={styles['form-wrapper']}>
            <label className={styles['label']}>Full name</label>
            <input className={styles['input']} value={fullName} onChange={(e) => setFullName(e.target.value)} />

            <label className={styles['label']}>Email</label>
            <input className={styles['input']} value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className={styles['label']}>Phone number</label>
            <input className={styles['input']} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <label className={styles['label']}>Message</label>
            <textarea className={styles['input']} value={message} onChange={(e) => setMessage(e.target.value)} />

            <div className={styles['btn-container']}>
              <button className={styles['btn']} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>

            {status && <p style={{ marginTop: 8 }}>{status}</p>}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
