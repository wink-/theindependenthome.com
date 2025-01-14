import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import HomeContent from '@/components/HomeContent'

const pillars = [
  { title: 'Financial Independence' },
  { title: 'Energy Independence' },
  { title: 'Food Independence' },
  { title: 'Physical Independence' }
]

interface Post {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  thumbnail: string;
  date: string;
  rating: number;
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      category: data.category,
      summary: data.summary,
      thumbnail: data.thumbnail,
      date: data.date,
      rating: data.rating || 0,
    } as Post
  })
  return posts.slice(0, 2) // Only return the two most recent posts
}

export default function Home() {
  const posts = getPosts()

  return <HomeContent pillars={pillars} posts={posts} />
}

