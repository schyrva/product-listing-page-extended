import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">About ShopNest</h3>
            <p className="text-gray-600">
            Product Listing Page test project. Next.js app with Redux: Browse, filter, and sort products. React and shadcn/ui components.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <p className="text-gray-600">Ivano-Frankivsk, Ukraine</p>
            <p className="text-gray-600">Email: <a href="mailto:stanislav.chyrva@gmail.com">stanislav.chyrva@gmail.com</a></p>
            <p className="text-gray-600">Phone: <a href="tel:+380666023036">+380666023036</a></p>
            <p className="text-gray-600">LinkedIn: <a href="https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/" target="_blank" rel="noopener noreferrer">Stanislav Chyrva</a></p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Test Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
