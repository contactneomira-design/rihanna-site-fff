'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { whatsappNumber } from '@/lib/data'
import { useLang } from '@/lib/i18n'

export default function BookingModal({ car, onClose }) {
  const { t, tf } = useLang()
  const [form, setForm] = useState({ name: '', pickup: '', ret: '', whatsapp: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    // Open the tab inside the click, before awaiting, so mobile browsers
    // don't block the WhatsApp window.
    const tab = window.open('', '_blank')

    // Save the booking. A failure never blocks the WhatsApp request.
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carName: car?.name ?? '',
          fullName: form.name,
          phone: form.whatsapp,
          startDate: form.pickup,
          endDate: form.ret,
        }),
      })
      if (!res.ok) console.error(`POST /api/bookings failed (${res.status})`)
    } catch (err) {
      console.error('POST /api/bookings failed', err)
    }

    // Message follows the site language (FR / EN / AR) and is fully URL-encoded,
    // so Arabic names and characters like & or # are sent intact.
    const msg = tf('bookingMsg', {
      car: car?.name ?? '',
      name: form.name,
      pickup: form.pickup,
      ret: form.ret,
      whatsapp: form.whatsapp,
    })
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
    if (tab) tab.location.href = url
    else window.open(url, '_blank')

    setSending(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-night/85 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md max-h-[calc(100svh-2rem)] overflow-y-auto glass p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label={t('close')}
              className="absolute top-3 end-3 w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center border border-offwhite/20 hover:border-terracotta transition-colors"
            >
              <X size={16} />
            </button>

            <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-2 pe-14">
              {car.name}
            </p>
            <h3 className="font-display text-3xl sm:text-4xl uppercase mb-6">
              {t('checkAvailability')}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] tracking-widest text-offwhite/50 uppercase">
                  {t('fullName')}
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-offwhite/25 focus:border-terracotta outline-none py-2 text-offwhite placeholder:text-offwhite/30 transition-colors"
                  placeholder={t('namePlaceholder')}
                />
              </div>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] tracking-widest text-offwhite/50 uppercase">
                    {t('pickupDate')}
                  </label>
                  <input
                    required
                    type="date"
                    name="pickup"
                    value={form.pickup}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-offwhite/25 focus:border-terracotta outline-none py-2 text-offwhite transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest text-offwhite/50 uppercase">
                    {t('returnDate')}
                  </label>
                  <input
                    required
                    type="date"
                    name="ret"
                    min={form.pickup || undefined}
                    value={form.ret}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-offwhite/25 focus:border-terracotta outline-none py-2 text-offwhite transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-widest text-offwhite/50 uppercase">
                  {t('whatsappNumber')}
                </label>
                <input
                  required
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-offwhite/25 focus:border-terracotta outline-none py-2 text-offwhite placeholder:text-offwhite/30 transition-colors"
                  placeholder="+212 6XX XXX XXX"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-4 min-h-[48px] inline-flex items-center justify-center gap-2 bg-terracotta text-night font-semibold tracking-widest2 uppercase text-xs py-4 hover:bg-offwhite transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={15} /> {t('send')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
