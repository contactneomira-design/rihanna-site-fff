import Image from 'next/image'
import Link from 'next/link'
import {
  Car,
  Compass,
  ShieldCheck,
  Clock,
  Home,
  KeyRound,
  MessageCircle,
  ArrowRight,
  Quote,
} from 'lucide-react'
import { whatsappLink } from '@/lib/data'

// Icon registry for iconGrid blocks — keeps blogData.js as plain data
// (strings only), no components stored in the data file.
const icons = {
  Car,
  Compass,
  ShieldCheck,
  Clock,
  Home,
  KeyRound,
  MessageCircle,
}

function Lead({ text }) {
  return (
    <p className="text-offwhite/80 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-2xl">
      {text}
    </p>
  )
}

function H2({ text }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] text-offwhite mt-14 mb-6">
      {text}
    </h2>
  )
}

function P({ text }) {
  return (
    <p className="text-offwhite/65 text-sm sm:text-base font-light leading-relaxed mb-5 max-w-2xl">
      {text}
    </p>
  )
}

function Numbered({ items }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 my-8">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="flex gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-offwhite/10 last:border-b-0 last:pb-0"
        >
          <span className="font-display text-3xl sm:text-4xl text-terracotta shrink-0 leading-none pt-1">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="font-display text-xl sm:text-2xl uppercase leading-tight text-offwhite mb-2">
              {item.title}
            </h3>
            <p className="text-offwhite/60 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              {item.text}
            </p>
            {item.tip && (
              <p className="text-terracotta/90 text-xs sm:text-sm font-medium leading-relaxed mt-3 max-w-xl">
                {item.tip}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Tips({ items }) {
  return (
    <ul className="flex flex-col gap-3 my-6 max-w-2xl">
      {items.map((tip) => (
        <li key={tip} className="flex gap-3 items-start text-offwhite/65 text-sm sm:text-base font-light leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
          {tip}
        </li>
      ))}
    </ul>
  )
}

function IconGrid({ items }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-night-line my-8">
      {items.map((item) => {
        const Icon = icons[item.icon] ?? ShieldCheck
        return (
          <div key={item.title} className="bg-night p-6 sm:p-7 flex flex-col gap-4">
            <Icon size={26} strokeWidth={1.3} className="text-terracotta" />
            <div>
              <h3 className="font-display text-lg sm:text-xl uppercase mb-2 text-offwhite">
                {item.title}
              </h3>
              <p className="text-offwhite/55 text-sm font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ArticleImage({ src, alt, caption }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] overflow-hidden bg-night-soft border border-offwhite/10">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-offwhite/40 text-xs mt-3 font-light tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function CTA({ eyebrow, title, text, buttonText, href }) {
  const isWhatsapp = href === 'whatsapp'
  const finalHref = isWhatsapp ? whatsappLink : href

  return (
    <div className="my-10 p-6 sm:p-8 bg-night-soft border border-offwhite/10">
      {eyebrow && (
        <p className="text-terracotta text-[11px] tracking-widest2 uppercase font-semibold mb-2">
          {eyebrow}
        </p>
      )}
      <h3 className="font-display text-2xl sm:text-3xl uppercase text-offwhite mb-3 leading-none">
        {title}
      </h3>
      <p className="text-offwhite/60 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
        {text}
      </p>
      <Link
        href={finalHref}
        target={isWhatsapp ? '_blank' : undefined}
        rel={isWhatsapp ? 'noopener noreferrer' : undefined}
        className="inline-flex min-h-[48px] items-center gap-2 bg-terracotta hover:bg-offwhite text-night px-6 py-3.5 text-[11px] tracking-widest2 uppercase font-semibold transition-colors duration-300"
      >
        {buttonText}
        <ArrowRight size={14} className="rtl:-scale-x-100" />
      </Link>
    </div>
  )
}

function BlockQuote({ text, author }) {
  return (
    <blockquote className="my-10 ps-6 sm:ps-8 border-s-2 border-terracotta relative max-w-2xl">
      <Quote size={22} className="text-terracotta/40 mb-3" />
      <p className="text-offwhite/80 text-lg sm:text-xl font-light italic leading-relaxed">
        {text}
      </p>
      {author && (
        <p className="text-offwhite/40 text-xs tracking-widest2 uppercase mt-4 font-semibold">
          — {author}
        </p>
      )}
    </blockquote>
  )
}

export default function ArticleBlocks({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'lead':
            return <Lead key={i} text={block.text} />
          case 'h2':
            return <H2 key={i} text={block.text} />
          case 'p':
            return <P key={i} text={block.text} />
          case 'numbered':
            return <Numbered key={i} items={block.items} />
          case 'tips':
            return <Tips key={i} items={block.items} />
          case 'iconGrid':
            return <IconGrid key={i} items={block.items} />
          case 'image':
            return <ArticleImage key={i} src={block.src} alt={block.alt} caption={block.caption} />
          case 'cta':
            return <CTA key={i} {...block} />
          case 'quote':
            return <BlockQuote key={i} text={block.text} author={block.author} />
          default:
            return null
        }
      })}
    </div>
  )
}
