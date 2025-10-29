import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "figma:asset/38e13cb38fccbae993fc82c55e790581db92e95b.png";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="WriterMorphosis" className="h-10 w-auto mb-4" />
            <p className="text-gray-600 mb-4 max-w-md">
              Transforming ideas into words, and words into impact. Your journey
              to becoming a better writer starts here.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Write for Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get writing tips delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button className="px-4 py-2 bg-gray-900 text-white rounded-r hover:bg-gray-800 transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2025 WriterMorphosis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
