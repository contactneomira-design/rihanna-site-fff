import Image from 'next/image'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import ArticleHeader from '@/components/blog/ArticleHeader'
import ArticleBlocks from '@/components/blog/ArticleBlocks'
import ShareButtons from '@/components/blog/ShareButtons'
import RelatedCars from '@/components/blog/RelatedCars'
import { getAllPosts, getPostBySlug } from '@/lib/blogData'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'

// Related cars come from the database: refresh once a minute.
export const revalidate = 60

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | ${brandFull}`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      images: [{ url: post.coverImage }],
    },
  }
}

export default async function BlogArticlePage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const cars = await getCars()

  return (
    <main className="relative">
      <article className="relative bg-night pt-24 sm:pt-32 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <ArticleHeader post={{ ...post, content: undefined }} />

          <div className="relative aspect-[16/9] overflow-hidden bg-night-soft border border-offwhite/10 mt-6 sm:mt-10">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-8 sm:mt-10 pb-8 border-b border-offwhite/10">
            <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
          </div>

          <div className="mt-10 sm:mt-12">
            <ArticleBlocks blocks={post.content} />
          </div>

          <RelatedCars slugs={post.relatedCars} cars={cars} />
        </div>
      </article>
      <Footer />
    </main>
  )
}
