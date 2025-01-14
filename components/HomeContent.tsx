'use client'

import { useState } from 'react'
import BlogPostPreview from '@/components/BlogPostPreview'

interface Pillar {
  title: string;
}

interface Post {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  thumbnail: string;
  date: string;
  rating: number;
}

interface HomeContentProps {
  pillars: Pillar[];
  posts: Post[];
}

export default function HomeContent({ pillars, posts }: HomeContentProps) {
  const [selectedPillar, setSelectedPillar] = useState(0)

  const pillarDescriptions = [
    {
      title: 'Financial Independence',
      description: (
        <>
          <p className="mb-4">
            Financial independence is the cornerstone of a truly self-reliant lifestyle. It&apos;s not just about having money; it&apos;s about having the freedom to make choices that align with your values and goals.
          </p>
          <p className="mb-4">
            We explore various strategies to achieve financial independence, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Creating and sticking to a budget that works for your lifestyle</li>
            <li>Investing wisely in diverse portfolios to grow your wealth over time</li>
            <li>Building multiple income streams to increase financial stability</li>
            <li>Reducing debt and increasing savings to create a strong financial foundation</li>
            <li>Understanding and optimizing your taxes to keep more of what you earn</li>
          </ul>
          <p>
            By mastering your finances, you gain the power to weather economic storms, pursue your passions, and live life on your own terms.
          </p>
        </>
      ),
    },
    {
      title: 'Energy Independence',
      description: (
        <>
          <p className="mb-4">
            Energy independence is about taking control of your power needs and reducing reliance on external sources. It&apos;s a key step towards a more sustainable and self-sufficient lifestyle.
          </p>
          <p className="mb-4">
            Our approach to energy independence covers:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Exploring renewable energy solutions like solar, wind, and micro-hydro power</li>
            <li>Implementing energy-efficient practices to reduce overall consumption</li>
            <li>Understanding and choosing the right battery storage systems</li>
            <li>Creating a resilient home energy system that can withstand outages</li>
            <li>Navigating regulations and incentives for home energy projects</li>
          </ul>
          <p>
            By becoming energy independent, you not only reduce your carbon footprint but also insulate yourself from rising energy costs and potential grid failures.
          </p>
        </>
      ),
    },
    {
      title: 'Food Independence',
      description: (
        <>
          <p className="mb-4">
            Food independence is about more than just growing a few vegetables; it&apos;s about creating a sustainable food system for your household that provides nutrition, security, and connection to the earth.
          </p>
          <p className="mb-4">
            Our comprehensive approach to food independence includes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Planning and creating productive vegetable gardens, even in small spaces</li>
            <li>Raising small livestock for eggs, milk, and meat</li>
            <li>Mastering food preservation techniques like canning, fermenting, and dehydrating</li>
            <li>Understanding season extension methods to grow food year-round</li>
            <li>Building healthy soil to ensure long-term garden productivity</li>
            <li>Exploring foraging and wild food identification for additional food sources</li>
          </ul>
          <p>
            By developing food independence, you ensure access to fresh, healthy food while reducing your reliance on industrial food systems.
          </p>
        </>
      ),
    },
    {
      title: 'Physical Independence',
      description: (
        <>
          <p className="mb-4">
            Physical independence is about maintaining optimal health and wellness through natural means, reducing reliance on conventional healthcare systems when possible, and being prepared to handle medical situations independently.
          </p>
          <p className="mb-4">
            Our holistic approach to physical independence encompasses:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Developing a personalized fitness routine that doesn&apos;t require a gym membership</li>
            <li>Understanding nutrition and how to meet your body&apos;s needs through whole foods</li>
            <li>Learning about herbal medicine and creating a home apothecary</li>
            <li>Mastering basic first aid and emergency medical skills</li>
            <li>Exploring natural remedies and alternative healing modalities</li>
            <li>Implementing stress-reduction techniques for mental and emotional well-being</li>
          </ul>
          <p>
            By focusing on physical independence, you take control of your health, build resilience, and reduce your reliance on external healthcare systems.
          </p>
        </>
      ),
    },
  ]

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
          <h3 className="text-2xl font-semibold mb-4">{pillarDescriptions[selectedPillar].title}</h3>
          <div className="prose max-w-none">
            {pillarDescriptions[selectedPillar].description}
          </div>
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
              rating={post.rating}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

