import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface BlogPostPreviewProps {
  title: string
  category: string
  summary: string
  imageUrl: string
  link: string
  date: string
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ title, category, summary, imageUrl, link, date }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image src={imageUrl} alt={title} width={800} height={400} className="object-cover w-full h-48" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-xl">{title}</CardTitle>
        <p className="text-sm text-gray-500 mb-2">{category} • {date}</p>
        <p className="text-sm mb-4">{summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={link}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BlogPostPreview

