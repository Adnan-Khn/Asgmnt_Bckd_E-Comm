import React from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-[#faf6ef] dark:bg-[#14110e] text-[#2a241d] dark:text-[#e8ddd0] transition-colors duration-300 overflow-x-hidden">

    {/* Decorative background blobs */}
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-[#d4c4a8]/30 dark:bg-[#d4c4a8]/5 blur-3xl" />
      <div className="absolute top-1/2 -left-40 h-100 w-100 rounded-full bg-[#c4a882]/20 dark:bg-[#8a6d4b]/5 blur-3xl" />
    </div>

    {/* Hero Section */}
    <section className="relative flex min-h-[85vh] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">

        {/* Floating badge with dot */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d9cdbc] bg-white/70 px-4 py-2 text-sm font-medium text-[#8a6d4b] backdrop-blur-md dark:border-[#3a322a] dark:bg-[#221c17]/70 dark:text-[#d4c4a8]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4a882] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8a6d4b] dark:bg-[#d4c4a8]" />
          </span>
          MERN Stack E-Commerce Project
        </div>

        <h1 className="mt-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-[#2a241d] dark:text-[#f5efe6] sm:text-6xl md:text-7xl">
          Manage Your Products
          <br />
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-[#c4a882] via-[#8a6d4b] to-[#c4a882] bg-clip-text text-transparent dark:from-[#d4c4a8] dark:via-[#e0d2b8] dark:to-[#d4c4a8]">
              Simple. Secure. Efficient.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full text-[#c4a882]/40 dark:text-[#d4c4a8]/20"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M2 10C50 2 150 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#6b5e4f] dark:text-[#a89880] sm:text-lg">
          A full-stack product management application built with
          React, Node.js, Express, and MongoDB. Manage products,
          authentication, images, and CRUD operations through a
          clean and responsive interface.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            onClick={() => navigate("/home/products")}
            className="group relative overflow-hidden rounded-xl bg-[#2a241d] px-8 py-4 font-semibold text-[#f5efe6] shadow-xl shadow-[#2a241d]/10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2a241d]/20 dark:bg-[#d4c4a8] dark:text-[#14110e] dark:shadow-[#d4c4a8]/10 dark:hover:shadow-[#d4c4a8]/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Products
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => navigate("/home/add-product")}
            className="group rounded-xl border-2 border-[#d9cdbc] bg-white/50 px-8 py-4 font-semibold text-[#8a6d4b] backdrop-blur-sm transition-all duration-300 hover:border-[#c4a882] hover:bg-white hover:shadow-lg hover:shadow-[#c4a882]/10 dark:border-[#3a322a] dark:bg-[#221c17]/50 dark:text-[#d4c4a8] dark:hover:border-[#d4c4a8]/50 dark:hover:bg-[#221c17]"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </span>
          </button>

        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex justify-center">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#d9cdbc] p-1.5 dark:border-[#3a322a]">
            <div className="h-2 w-1 animate-bounce rounded-full bg-[#8a6d4b] dark:bg-[#d4c4a8]" />
          </div>
        </div>

      </div>
    </section>

    {/* Features — Bento Grid */}
    <section className="relative border-t border-[#e8ddd0] px-6 py-24 dark:border-[#2b241d]">
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#8a6d4b] dark:text-[#d4c4a8]">
              What's inside
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#2a241d] dark:text-[#f5efe6] sm:text-5xl">
              Project Features
            </h2>
          </div>
          <p className="max-w-sm text-[#6b5e4f] dark:text-[#a89880]">
            Everything required for a complete product management system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {[
            { icon: "🔐", title: "Authentication", desc: "Secure user registration, login, logout, access token authentication, refresh token handling, and protected routes.", span: "lg:col-span-1" },
            { icon: "📦", title: "Product CRUD", desc: "Create, read, update, and delete products with a simple and user-friendly interface.", span: "lg:col-span-1" },
            { icon: "🖼️", title: "Image Upload", desc: "Upload multiple product images and display them using ImageKit-powered image storage.", span: "lg:col-span-1" },
            { icon: "✅", title: "Form Validation", desc: "Client-side validation with React Hook Form and server-side validation using Express Validator.", span: "lg:col-span-1" },
            { icon: "📱", title: "Responsive UI", desc: "A responsive interface designed with Tailwind CSS for desktop, tablet, and mobile screens.", span: "lg:col-span-1" },
            { icon: "⚡", title: "REST APIs", desc: "RESTful backend APIs built using Node.js, Express.js, MongoDB, and Mongoose.", span: "lg:col-span-1" },
          ].map((f) => (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-2xl border border-[#e8ddd0] bg-white/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#c4a882]/60 hover:shadow-xl hover:shadow-[#c4a882]/10 dark:border-[#2b241d] dark:bg-[#1a1613]/60 dark:hover:border-[#d4c4a8]/40 dark:hover:shadow-black/30 ${f.span}`}
            >
              {/* Corner gradient glow */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c4a882]/0 blur-2xl transition-all duration-500 group-hover:bg-[#c4a882]/20 dark:group-hover:bg-[#d4c4a8]/10" />

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efe6] text-2xl shadow-inner transition-transform duration-300 group-hover:scale-110 dark:bg-[#2b241d]">
                {f.icon}
              </div>

              <h3 className="text-xl font-bold text-[#2a241d] dark:text-[#f5efe6]">
                {f.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#6b5e4f] dark:text-[#a89880]">
                {f.desc}
              </p>

              {/* Animated bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-[#c4a882] to-[#8a6d4b] transition-all duration-500 group-hover:w-full dark:from-[#d4c4a8] dark:to-[#b8a88a]" />
            </div>
          ))}

        </div>
      </div>
    </section>

    {/* Tech Stack */}
    <section className="relative border-t border-[#e8ddd0] px-6 py-24 dark:border-[#2b241d]">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#8a6d4b] dark:text-[#d4c4a8]">
            Powered by
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#2a241d] dark:text-[#f5efe6] sm:text-5xl">
            Technology Stack
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            "React.js", "React Router", "React Hook Form", "Tailwind CSS",
            "Node.js", "Express.js", "MongoDB", "Mongoose",
            "JWT", "bcrypt", "Multer", "ImageKit", "Axios",
          ].map((tech, i) => (
            <span
              key={tech}
              className="group relative cursor-default rounded-full border border-[#e0d6c8] bg-white/60 px-5 py-2.5 text-sm font-medium text-[#4a3f33] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c4a882] hover:bg-white hover:text-[#8a6d4b] hover:shadow-lg hover:shadow-[#c4a882]/15 dark:border-[#2b241d] dark:bg-[#1a1613]/60 dark:text-[#c4b5a0] dark:hover:border-[#d4c4a8]/50 dark:hover:bg-[#221c17] dark:hover:text-[#e8ddd0]"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </section>

    {/* Footer */}
    <footer className="relative border-t border-[#e8ddd0] px-6 py-10 dark:border-[#2b241d]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[#8a7d6b] dark:text-[#6b5e4f]">
          Built as a full-stack authentication and product CRUD project.
        </p>
        <div className="flex items-center gap-2 text-sm text-[#8a7d6b] dark:text-[#6b5e4f]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          All systems operational
        </div>
      </div>
    </footer>

  </div>
);
}

export default HomePage