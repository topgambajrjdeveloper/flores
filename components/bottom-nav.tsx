'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Rss , Info, Mail, ShoppingBag } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/blog', label: 'Blog', icon: Rss  },
    { href: '/about-me', label: 'Sobre Mí', icon: Info },
    { href: '/shop', label: 'Tienda', icon: ShoppingBag },
    { href: '/contact', label: 'Contacto', icon: Mail },
  ]

  return (
    <nav className="md:hidden z-30 fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <ul className="flex justify-around items-center h-16">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className={`flex flex-col items-center p-2 ${pathname === href ? 'text-primary' : 'text-muted-foreground'}`}>
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}