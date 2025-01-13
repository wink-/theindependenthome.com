import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold tracking-wide">The Independent Home</Link>
          <div className="space-x-4">
            <Button variant="ghost" asChild className="font-serif">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild className="font-serif">
              <Link href="/blog">Blog</Link>
            </Button>
            <Button variant="ghost" asChild className="font-serif">
              <Link href="/plans">Plans</Link>
            </Button>
            <Button variant="ghost" asChild className="font-serif">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="ghost" asChild className="font-serif">
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

