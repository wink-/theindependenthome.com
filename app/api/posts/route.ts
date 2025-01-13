import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: fileName.replace(/\.md$/, ''),
      ...data,
    }
  })

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  })
}

