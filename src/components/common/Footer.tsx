import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/navigation";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div id="about">
            <h3 className="text-lg font-semibold mb-4">About BestShop</h3>
            <p>
              Next.js e-commerce demo with Redux, filtering, and modern UI
              components.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Ivano-Frankivsk, Ukraine</p>
            <p>
              Email:{" "}
              <a href="mailto:stanislav.chyrva@gmail.com">
                stanislav.chyrva@gmail.com
              </a>
            </p>
            <p>
              Phone: <a href="tel:+380666023036">+380666023036</a>
            </p>
            <p>
              Telegram:{" "}
              <a
                href="https://t.me/StanislavChyrva"
                target="_blank"
                rel="noopener noreferrer"
              >
                @StanislavChyrva
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stanislav Chyrva
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p>© {new Date().getFullYear()} BestShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
