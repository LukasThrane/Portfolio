"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-col md:flex-row">
          {/* Left Section: Brand and Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold text-foreground">Lukas Thrane</p>
            <p className="text-sm text-muted-foreground">
              © 2024 Lukas Thrane. All rights reserved.
            </p>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/LukasThrane"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/lukas-thrane/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:lukas@thrane.name"
              className="text-foreground hover:text-primary transition"
              aria-label="Email"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
