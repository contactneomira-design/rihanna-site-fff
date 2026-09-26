'use client'

import { useState } from 'react'
import { Facebook, MessageCircle, Link2, Check } from 'lucide-react'
import { useLang } from '@/lib/i18n'

export default function ShareButtons({ title, path }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()

  // Built from window.location at click-time so it always reflects the
  // actual deployed domain, with `path` as a safe fallback during SSR.
  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : path)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — silently ignore, the visible link
      // in the address bar is still a valid fallback for the user.
    }
  }

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${getUrl()}`)}`,
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
    },
  ]

  return (
    <div className="flex items-center gap-3">
      <span className="text-offwhite/40 text-[11px] tracking-widest2 uppercase font-semibold">
        {t('share')}
      </span>
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('shareOn')} ${label}`}
          className="w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center border border-offwhite/20 hover:border-terracotta hover:text-terracotta text-offwhite/70 transition-colors duration-300"
        >
          <Icon size={15} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={t('copyLink')}
        className="w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center border border-offwhite/20 hover:border-terracotta hover:text-terracotta text-offwhite/70 transition-colors duration-300"
      >
        {copied ? <Check size={15} className="text-terracotta" /> : <Link2 size={15} />}
      </button>
    </div>
  )
}
