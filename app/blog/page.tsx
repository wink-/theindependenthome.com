'use client'

import { useEffect, useState } from 'react'
import BlogPostPreview from '@/components/BlogPostPreview'

interface Post {
  slug: string
  title: string
  category: string
  summary: string
  thumbnail: string
  date: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogPostPreview
            key={post.slug}
            title={post.title}
            category={post.category}
            summary={post.summary || ''}
            imageUrl={post.thumbnail}
            link={`/blog/${post.slug}`}
            date={post.date}
          />
        ))}
      </div>
    </div>
  )
}

