# 🛒 NextCart – E-Commerce Demo Built with Next.js 15 & Redux

A modern and responsive e-commerce showcase featuring a rich shopping experience.  
Built with **Next.js 15**, **Redux Toolkit**, **Tailwind CSS**, and **ShadCN UI**, this demo demonstrates clean architecture, smooth animations, and best practices in state and UI management.

---

## 🎯 Live Demo

🔗 [View Demo](https://nextcart-app.vercel.app/)

---

## 🚀 Features

- 📦 **Product List** – Fetches data from Fake Store API
- 🔍 **Search & Filtering** – Category & price range filters
- 🛒 **Favorites & Cart** – Add/remove items from favorites & cart
- 🌙 **Dark Mode** – Supports theme switching
- 📱 **Responsive Design** – Optimized for all devices
- ✨ **Animations** – Smooth Framer Motion animations for enhanced UX
- 🛡️ **Error Handling** – Comprehensive error states with fallbacks
- 🧩 **Custom UI Components** – Dropdown menu, Testimonials carousel, and more
- 📊 **Stats and Promotions** – Interactive UI elements to highlight products
- 🔄 **Performance Optimizations** – useCallback, useMemo for efficient rerenders

---

## 💻 Recent Enhancements

- 🚀 **Performance Improvements** – Fixed infinite render loops and optimized animations
- 📱 **Mobile Experience** – Enhanced mobile menu with proper navigation closing
- 🧭 **404 Page** – Added stylish error page with animations
- 🔧 **Code Quality** – Resolved ESLint warnings and improved code maintainability
- 🔄 **State Management** – Optimized Redux implementation with proper hooks usage
- 🎨 **UI Refinements** – Improved header design and button interactions

---

## 🛠 Technical Details

### Custom Hooks

- `useIntersectionObserver` – Detect when elements enter the viewport
- `useReducedMotion` – Respect user motion preferences
- `useProducts` – Encapsulated product data fetching and state

### Animation Strategy

The project uses Framer Motion for animations with a focus on:

- Entrance animations using opacity and transform
- Hover effects for interactive elements
- Loading state transitions
- Scroll-triggered animations

### State Management

- Redux for global state (cart, favorites, products)
- Local state for UI components
- Performance optimizations using useCallback and useMemo

---

## 🛠 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/schyrva/nextcart.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📞 Contact

📧 **Email:** stanislav.chyrva@gmail.com

🔗 **LinkedIn:** [Stanislav Chyrva](https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/)
