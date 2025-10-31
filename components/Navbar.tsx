'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/gradespark-logo.svg"
                alt="Gradespark"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-900">Gradespark</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-gray-700 hover:text-gray-900">
              Features
            </Link>
            <Link href="/#solutions" className="text-gray-700 hover:text-gray-900">
              Solutions
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900">
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/#features"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Features
            </Link>
            <Link
              href="/#solutions"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Solutions
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Log in
            </Link>
            <Link
              href="/auth/sign-up"
              className="block px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
