'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'

export default function Experience() {
  const { t } = useLang()

  return (
    <section id="experience" className="relative bg-night-soft">
      <div className="px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-10 sm:pb-14">
        <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
          {t('twoRoadsSouth')}
        </p>
        <h2 className="font-display text-[13vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] uppercase">
          {t('experienceTitle')}
        </h2>
      </div>

      {/* Belbala — image left, text right on desktop */}
      <div className="grid sm:grid-cols-2">
        <div className="relative h-[60vh] sm:h-[85vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/covers/belbala.jpg"
              alt={t('altBelbala')}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-night-soft via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-night-soft/20" />
        </div>
        <div className="flex flex-col justify-center px-5 sm:px-12 lg:px-16 py-12 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.95] mb-5 text-terracotta">
              {t('belbalaTitle')}
            </h3>
            <p className="text-offwhite/70 font-light leading-relaxed text-sm sm:text-base max-w-lg">
              {t('belbalaText')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Atlas — text left, image right on desktop */}
      <div className="grid sm:grid-cols-2">
        <div className="order-2 sm:order-1 flex flex-col justify-center px-5 sm:px-12 lg:px-16 py-12 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.95] mb-5 text-sand">
              {t('atlasTitle')}
            </h3>
            <p className="text-offwhite/70 font-light leading-relaxed text-sm sm:text-base max-w-lg">
              {t('atlasText')}
            </p>
          </motion.div>
        </div>
        <div className="order-1 sm:order-2 relative h-[60vh] sm:h-[85vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/covers/atlas.jpg"
              alt={t('altAtlas')}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-night-soft via-transparent to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-transparent sm:to-night-soft/20" />
        </div>
      </div>
    </section>
  )
}
