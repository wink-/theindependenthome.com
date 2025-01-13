'use client'

import { useState } from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPostPreview from '@/components/BlogPostPreview'

const pillars = [
  {
    title: 'Financial Independence',
    description: 'Learn strategies for budgeting, investing, and building multiple income streams to achieve financial freedom.'
  },
  {
    title: 'Energy Independence',
    description: 'Explore renewable energy solutions and energy-efficient practices to reduce reliance on the grid and lower your carbon footprint.'
  },
  {
    title: 'Food Independence',
    description: 'Discover techniques for growing your own food, preserving harvests, and creating a sustainable food system for your household.'
  },
  {
    title: 'Physical Wellness',
    description: 'Focus on holistic health practices, exercise routines, and natural remedies to maintain optimal physical and mental well-being.'
  }
]

export default function Home() {
  const [selectedPillar, setSelectedPillar] = useState(0)

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
  }).slice(0, 2) // Only show the two most recent posts

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">The Independent Home</h1>
        <p className="text-xl mb-8">Empowering individuals toward self reliance in a changing world.</p>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Our Four Pillars of Independence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {pillars.map((pillar, index) => (
            <button
              key={pillar.title}
              className={`bg-white p-4 rounded shadow text-left transition-colors duration-200 ${
                selectedPillar === index ? 'ring-2 ring-gray-800' : ''
              }`}
              onClick={() => setSelectedPillar(index)}
            >
              <h3 className="font-semibold">{pillar.title}</h3>
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{pillars[selectedPillar].title}</h3>
          <p>{pillars[selectedPillar].description}</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Recent Blog Posts</h2>
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
      </section>
    </div>
  )
}

