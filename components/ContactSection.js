'use client'

import { useState } from 'react'
import { ArrowUpRight, MapPin, Send } from 'lucide-react'
import { whatsappLink, phoneNumberIntl, mapsLink } from '@/lib/data'
import { useLang } from '@/lib/i18n'

// Channels: WhatsApp, phone and the Marrakech location only.
export default function ContactSection() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`POST /api/contact failed (${res.status})`)
      setForm({ name: '', phone: '', message: '' })
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-offwhite/25 focus:border-terracotta outline-none py-2 text-offwhite placeholder:text-offwhite/30 transition-colors'
  const labelClass = 'text-[11px] tracking-widest text-offwhite/50 uppercase'

  const channels = [
    { name: t('whatsapp'), value: phoneNumberIntl, href: whatsappLink, external: true, ltr: true },
    {
      name: t('phone'),
      value: phoneNumberIntl,
      href: `tel:${phoneNumberIntl.replace(/\s/g, '')}`,
      ltr: true,
    },
    { name: t('location'), value: null, href: mapsLink, external: true, icon: MapPin },
  ]

  const rowClass =
    'group flex min-h-[48px] items-center justify-between gap-4 sm:gap-6 py-6 sm:py-8'

  return (
    <section className="relative bg-night pt-32 sm:pt-44 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
      <h1 className="font-display text-5xl sm:text-8xl uppercase leading-none text-offwhite break-words">
        {t('contactTitle')}
      </h1>
      <p className="mt-6 max-w-md text-offwhite/60 font-light leading-relaxed">
        {t('contactSub')}
      </p>

      <ul className="mt-12 sm:mt-20 max-w-4xl border-t border-night-line">
        {channels.map((c) => (
          <li key={c.name} className="border-b border-night-line">
            {c.href ? (
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`${rowClass} focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-offwhite`}
              >
                <span className="flex items-center gap-4 font-display text-3xl sm:text-5xl uppercase text-offwhite group-hover:text-terracotta transition-colors duration-300">
                  {c.icon && <c.icon size={26} className="shrink-0 text-terracotta" />}
                  {c.name}
                </span>
                <span className="flex items-center gap-3 text-offwhite/60 group-hover:text-offwhite text-sm sm:text-base transition-colors duration-300">
                  <span dir={c.ltr ? 'ltr' : undefined}>{c.value}</span>
                  <ArrowUpRight size={18} className="shrink-0 rtl:-scale-x-100" />
                </span>
              </a>
            ) : (
              <div className={rowClass}>
                <span className="flex items-center gap-4 font-display text-3xl sm:text-5xl uppercase text-offwhite">
                  <MapPin size={26} className="shrink-0 text-terracotta" />
                  {c.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-12 sm:mt-16 max-w-xl flex flex-col gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t('fullName')}
          </label>
          <input
            id="contact-name"
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className={inputClass}
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            {t('whatsappNumber')}
          </label>
          <input
            id="contact-phone"
            required
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+212 6XX XXX XXX"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {t('messageLabel')}
          </label>
          <textarea
            id="contact-message"
            required
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
            placeholder={t('messagePlaceholder')}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 min-h-[48px] inline-flex items-center justify-center gap-2 bg-terracotta text-night font-semibold tracking-widest2 uppercase text-xs py-4 hover:bg-offwhite transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={15} /> {t('sendMessage')}
        </button>

        {status === 'sent' && (
          <p role="status" className="text-sm text-offwhite/80">
            {t('messageSent')}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-sm text-terracotta">
            {t('messageError')}
          </p>
        )}
      </form>
    </section>
  )
}
