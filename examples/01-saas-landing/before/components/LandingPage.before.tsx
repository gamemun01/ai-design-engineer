// BEFORE: Generic AI-generated version
// Issues: no design system, hard-coded colors, a11y issues, no tokens

import { useState } from "react";

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Nav - colors hard-coded, no design system */}
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div className="text-2xl font-bold text-blue-500">Flowmetric</div>
        <div className="space-x-4">
          <a href="#" className="text-gray-700">Features</a>
          <a href="#" className="text-gray-700">Pricing</a>
          <a href="#" className="text-gray-700">About</a>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero - CTA invisible, image without dimensions */}
      <div className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-5xl font-bold text-white">
          The Best Analytics Tool
        </h1>
        <p className="text-xl text-white mt-4">
          Track everything in one place
        </p>
        <button className="mt-8 bg-white text-blue-500 px-6 py-3 rounded">
          Get Started
        </button>
        <img src="/dashboard.png" className="mt-10 mx-auto" />
      </div>

      {/* Features - hard-coded gray-700, no spacing system */}
      <div className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Features
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-xl font-bold text-gray-900">Fast</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-xl font-bold text-gray-900">Reliable</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-xl font-bold text-gray-900">Secure</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </div>

      {/* FAQ - div onClick = inaccessible */}
      <div className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center">FAQ</h2>
        <div className="mt-10 max-w-2xl mx-auto">
          <div onClick={() => setOpen(!open)} className="p-4 bg-white mb-2">
            <div className="flex justify-between cursor-pointer">
              <span>Is my data secure?</span>
              <span>{open ? "−" : "+"}</span>
            </div>
            {open && <p className="mt-2">Yes, we use encryption.</p>}
          </div>
        </div>
      </div>

      {/* Footer - emoji icon, console.log left in */}
      <footer className="p-8 bg-gray-900 text-white text-center">
        <p>© 2026 Flowmetric 🚀</p>
        <button onClick={() => console.log("clicked")}>
          Contact
        </button>
      </footer>
    </div>
  );
}
