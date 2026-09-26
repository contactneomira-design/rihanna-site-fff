'use client'

import { motion } from 'framer-motion'
import { Users2, Headset, Hotel, ShieldCheck } from 'lucide-react'
import { useLang } from '@/lib/i18n'

const icons = [Users2, Headset, Hotel, ShieldCheck]
// Copy lives in lib/i18n.js as trust1Title/trust1Text … trust4Title/trust4Text
const points = [1, 2, 3, 4]

export default function Trust() {
  const { t } = useLang()

  return (
    <section id="trust" className="relative bg-night py-20 sm:py-32 px-5 sm:px-8 lg:px-12">
      <div className="mb-12 sm:mb-16">
        <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
          {t('trustTitle')}
        </p>
        <h2 className="font-display text-[13vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] uppercase max-w-3xl">
          {t('trustSub')}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-night-line">
        {points.map((n, i) => {
          const Icon = icons[i]
          return (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-night p-7 sm:p-8 flex flex-col gap-5"
            >
              <Icon size={28} strokeWidth={1.3} className="text-terracotta" />
              <div>
                <h3 className="font-display text-xl sm:text-2xl uppercase mb-2">
                  {t(`trust${n}Title`)}
                </h3>
                <p className="text-offwhite/55 text-sm font-light leading-relaxed">
                  {t(`trust${n}Text`)}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
