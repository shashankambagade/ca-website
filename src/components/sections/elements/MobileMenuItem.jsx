import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenuItem({ item, isActive, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link
          href={item.url}
          onClick={onClick}
          className={`text-base font-medium transition-colors ${
            isActive(item.url)
              ? 'text-caRed underline underline-offset-4'
              : 'hover:text-caRed'
          }`}
        >
          {item.title}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Submenu"
            className="ml-2 text-sm"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 mt-2 flex flex-col space-y-2">
          {item.children.map((child) => (
            <Link
              key={child.id}
              href={child.url}
              onClick={onClick}
              className={`text-sm transition-colors ${
                isActive(child.url)
                  ? 'text-caRed underline underline-offset-4'
                  : 'hover:text-caRed'
              }`}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
