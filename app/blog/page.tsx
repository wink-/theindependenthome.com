import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  rating: number
}

function getPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      category: data.category,
      rating: data.rating || 0,
    }
  })
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-1">
              {post.category} • {post.date} • Independence Rating: {post.rating}/5
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

