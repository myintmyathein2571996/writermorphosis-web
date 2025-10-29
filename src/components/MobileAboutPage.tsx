import { Pen, Users, BookOpen, Award, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "figma:asset/38e13cb38fccbae993fc82c55e790581db92e95b.png";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MobileAboutPage() {
  const stats = [
    { icon: BookOpen, label: "Articles", value: "500+" },
    { icon: Users, label: "Writers", value: "10K+" },
    { icon: Pen, label: "Tips", value: "200+" },
    { icon: Award, label: "Years", value: "5+" },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & Editor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "James Porter",
      role: "Senior Writer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    {
      name: "Emily Chen",
      role: "Content Strategist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      name: "Marcus Thompson",
      role: "Poetry Editor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
  ];

  return (
    <div className="pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
        <img src={logo} alt="WriterMorphosis" className="h-16 w-auto mx-auto mb-4" />
        <h1 className="mb-3">About Us</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          We believe every writer has a unique voice waiting to be discovered.
          Our mission is to provide the tools and inspiration needed for your
          writing journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 p-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <Icon className="h-5 w-5 mx-auto mb-2 text-gray-700" />
              <div className="text-lg mb-1">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Mission */}
      <div className="p-4 space-y-3">
        <h2 className="mb-3">Our Mission</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
              <Pen className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-base mb-1">Inspire</h3>
              <p className="text-sm text-gray-600">
                Daily inspiration to help writers overcome creative blocks and
                find their muse.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
              <BookOpen className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-base mb-1">Educate</h3>
              <p className="text-sm text-gray-600">
                Comprehensive resources for writers at every level, from beginner
                tips to advanced techniques.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
              <Users className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-base mb-1">Connect</h3>
              <p className="text-sm text-gray-600">
                Join a vibrant community of writers who support and learn from
                each other.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="p-4">
        <h2 className="mb-4">Our Team</h2>
        <div className="grid grid-cols-2 gap-3">
          {team.map((member, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <ImageWithFallback
                src={member.avatar}
                alt={member.name}
                className="h-16 w-16 rounded-full mx-auto mb-3"
              />
              <h4 className="text-sm mb-1">{member.name}</h4>
              <p className="text-xs text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social & Newsletter */}
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg p-6">
          <h3 className="mb-2 text-white">Stay Connected</h3>
          <p className="text-sm text-gray-300 mb-4">
            Get writing tips delivered to your inbox.
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded bg-white text-gray-900 text-sm focus:outline-none"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center gap-4 pt-4 border-t border-gray-700">
            <button className="p-2">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="p-2">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="p-2">
              <Instagram className="h-5 w-5" />
            </button>
            <button className="p-2">
              <Linkedin className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 pb-4">
          © 2025 WriterMorphosis. All rights reserved.
        </p>
      </div>
    </div>
  );
}
