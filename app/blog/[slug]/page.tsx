import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Star } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  thumbnail: string
  rating: number
  contentHtml: string
}

async function getPostData(slug: string): Promise<BlogPost> {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    thumbnail: data.thumbnail,
    rating: data.rating || 0,
    contentHtml,
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 prose prose-slate">
      <h1 className="mb-4 text-4xl font-bold">{postData.title}</h1>
      <div className="mb-4 text-gray-600 flex items-center">
        <span>{postData.category}</span>
        {postData.date && <span className="mx-2">•</span>}
        <span>{postData.date}</span>
        <span className="mx-2">•</span>
        <span className="flex items-center">
          Independence Rating: 
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${index < postData.rating ? 'text-black fill-current' : 'text-gray-300'}`}
            />
          ))}
        </span>
      </div>
      {postData.thumbnail && (
        <Image
          src={postData.thumbnail}
          alt={postData.title}
          width={800}
          height={400}
          className="object-cover w-full h-64 mb-8"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}

