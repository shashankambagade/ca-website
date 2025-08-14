'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getMenus } from '@/lib/wp-server';
import { Menu, X } from 'lucide-react';
import MobileMenuItem from '@/components/sections/elements/MobileMenuItem';

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getMenus().then((data) => {
      if (data && data.main) setMenuItems(data.main);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (url) => {
  try {
    const itemPath = new URL(url).pathname.replace(/^\/ca-poc/, '').replace(/\/+$/, '');
    const currentPath = pathname.replace(/\/+$/, '');
    return itemPath === currentPath;
  } catch {
    return false;
  }
};
  const headerClass = scrolled
    ? 'backdrop-blur-md bg-black/25 shadow-md'
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 w-full z-50 text-white transition-all duration-300 ${headerClass}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-7">
        {/* Logo */}
       <Link href="/" className="block">
          {pathname === '/' ? (
            <img src="/ca-logo.svg" alt="Collaboration Art" className="h-10" />
          ) : (
            <img src="/logo-high-res.png" alt="Collaboration Art" className="h-8" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 main-nav">
          {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.url}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.url)
                      ? scrolled
                        ? 'text-caRed underline underline-offset-4'
                        : 'text-yellow-300 underline underline-offset-4'
                      : scrolled
                      ? 'text-white hover:text-caRed'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.title}
                </Link>

                {/* Submenu */}
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 pt-5 top-0 w-48 shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.url}
                        className="bg-white block px-4 py-4 text-sm text-gray-800 hover:text-[#f34835]"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-white' : 'text-white'}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden px-6 pb-6 pt-2 shadow-md ${
            scrolled ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <MobileMenuItem
                key={item.id}
                item={item}
                isActive={isActive}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}

    </header>
  );
}
