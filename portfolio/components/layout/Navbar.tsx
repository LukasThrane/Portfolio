"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Lukas Thrane
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            <Link href="/experience" className="text-foreground hover:text-primary">
              Experience
            </Link>
            <Link
              href="/projects"
              className="text-foreground hover:text-primary"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              <Link
                href="/about"
                className="block text-foreground hover:bg-accent rounded-md px-3 py-2"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-foreground hover:bg-accent rounded-md px-3 py-2"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block text-foreground hover:bg-accent rounded-md px-3 py-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
