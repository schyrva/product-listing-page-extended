'use client';

import Link from 'next/link';
import { FOOTER_LINKS } from '@/constants/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MessageCircle, Phone, SendHorizonal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const iconLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      href: 'mailto:stanislav.chyrva@gmail.com',
      label: 'Email',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      href: 'tel:+380666023036',
      label: 'Phone',
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      href: 'https://t.me/StanislavChyrva',
      label: 'Telegram',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/',
      label: 'LinkedIn',
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/schyrva/product-listing-page-extended',
      label: 'GitHub',
    },
  ];

  return (
    <footer className="bg-background border-t border-border transition-colors pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link href="/" className="text-3xl italic font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                BestShop
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Next.js e-commerce demo with Redux, filtering, and modern UI components.
            </p>

            <div className="flex gap-4 pt-2">
              {iconLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary hover:bg-primary hover:text-white transition-colors p-2 rounded-full"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 -ml-4 mr-0 group-hover:mr-2 transition-all overflow-hidden">
                      —
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact" className="space-y-6">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Contact
            </h3>
            <p className="text-muted-foreground">Ivano-Frankivsk, Ukraine</p>
            <p className="text-muted-foreground">
              Email:{' '}
              <a
                href="mailto:stanislav.chyrva@gmail.com"
                className="text-foreground hover:text-primary transition-colors"
              >
                stanislav.chyrva@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground">
              Phone:{' '}
              <a
                href="tel:+380666023036"
                className="text-foreground hover:text-primary transition-colors"
              >
                +380666023036
              </a>
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Newsletter
            </h3>
            <p className="text-muted-foreground">Subscribe to receive updates, news, and offers.</p>
            <div className="flex gap-2 mt-4">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-l-full rounded-r-none"
              />
              <Button
                className="rounded-r-full rounded-l-none"
                aria-label="Subscribe to newsletter"
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-border opacity-30" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} BestShop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
