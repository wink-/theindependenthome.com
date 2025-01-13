import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Image from 'next/image'

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

async function getPostData(slug: string) {
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...data,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <article className="prose prose-slate mx-auto">
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <div className="mb-4 text-gray-600">
        <span>{postData.category}</span>
        {postData.date && <span> • {postData.date}</span>}
      </div>
      {postData.thumbnail && (
        <Image
          src={postData.thumbnail}
          alt={postData.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover mb-8"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}

