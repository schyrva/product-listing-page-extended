import Link from "next/link"
import { FOOTER_LINKS } from "@/constants/navigation"

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div id="about">
            <h3 className="text-lg font-semibold mb-4">About ShopNest</h3>
            <p className="text-gray-600">
              Next.js e-commerce demo with Redux, filtering, and modern UI components.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">Ivano-Frankivsk, Ukraine</p>
            <p className="text-gray-600">Email: <a href="mailto:stanislav.chyrva@gmail.com">stanislav.chyrva@gmail.com</a></p>
            <p className="text-gray-600">Phone: <a href="tel:+380666023036">+380666023036</a></p>
            <p className="text-gray-600">Telegram: <a href="https://t.me/StanislavChyrva" target="_blank" rel="noopener noreferrer">@StanislavChyrva</a></p>
            <p className="text-gray-600">LinkedIn: <a href="https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/" target="_blank" rel="noopener noreferrer">Stanislav Chyrva</a></p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} ShopNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}