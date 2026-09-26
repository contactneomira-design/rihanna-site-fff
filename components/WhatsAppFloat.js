'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/data'
import { useLang } from '@/lib/i18n'

export default function WhatsAppFloat() {
  const { t } = useLang()
  return (
    <motion.a
      href={whatsappUrl('Salam RIHANA DREAMS CARS')}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('whatsapp')}
      className="fixed bottom-6 end-5 sm:bottom-8 sm:end-8 z-50 flex items-center gap-2 rounded-full bg-terracotta text-night px-4 py-4 sm:px-5 sm:py-4 shadow-[0_8px_30px_rgba(200,106,59,0.5)]"
    >
      <MessageCircle size={22} strokeWidth={2.2} />
      <span className="hidden sm:inline text-sm font-semibold tracking-wide pe-1">
        {t('whatsapp')}
      </span>
    </motion.a>
  )
}
