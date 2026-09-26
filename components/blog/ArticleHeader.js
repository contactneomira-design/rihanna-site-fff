'use client'

import { Calendar, User } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { formatPostDate, localizePost } from '@/lib/blogData'

// Top of the article: category, title and meta.
// The article body itself is written in French only — EN/AR visitors get a
// short notice under the title.
export default function ArticleHeader({ post: rawPost }) {
  const { lang, t } = useLang()
  const post = localizePost(rawPost, lang)

  return (
    <>
      <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-4">
        {post.category}
      </p>
      <h1 className="font-display text-[10vw] sm:text-5xl lg:text-6xl leading-[0.95] uppercase text-offwhite">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-offwhite/50 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-terracotta" />
          {formatPostDate(post, lang)}
        </span>
        <span className="flex items-center gap-1.5">
          <User size={14} className="text-terracotta" />
          {post.author}
        </span>
      </div>

      {lang !== 'fr' && (
        <p className="mt-5 text-offwhite/60 text-xs sm:text-sm border border-offwhite/15 bg-night-soft px-4 py-3">
          {t('articleFrOnly')}
        </p>
      )}
    </>
  )
}
