import { Pen, Users, BookOpen, Award } from "lucide-react";
import logo from "figma:asset/38e13cb38fccbae993fc82c55e790581db92e95b.png";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutPage() {
  const stats = [
    { icon: BookOpen, label: "Articles Published", value: "500+" },
    { icon: Users, label: "Writers Community", value: "10K+" },
    { icon: Pen, label: "Writing Tips", value: "200+" },
    { icon: Award, label: "Years of Experience", value: "5+" },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & Editor-in-Chief",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Award-winning author and passionate advocate for emerging writers.",
    },
    {
      name: "James Porter",
      role: "Senior Writer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      bio: "Fiction specialist with a love for storytelling and character development.",
    },
    {
      name: "Emily Chen",
      role: "Content Strategist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      bio: "Helping writers find their voice and reach their audience.",
    },
    {
      name: "Marcus Thompson",
      role: "Poetry Editor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      bio: "Published poet dedicated to the art of verse and metaphor.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img src={logo} alt="WriterMorphosis" className="h-20 w-auto mx-auto mb-6" />
        <h1 className="mb-4">About WriterMorphosis</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We believe that every writer has a unique voice waiting to be discovered.
          Our mission is to provide the tools, inspiration, and community support
          needed to transform your writing journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <Icon className="h-8 w-8 mx-auto mb-3 text-gray-700" />
                <div className="text-3xl mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission */}
      <div className="mb-16">
        <h2 className="text-center mb-8">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <Pen className="h-10 w-10 mb-4 text-gray-700" />
              <h3 className="mb-3">Inspire</h3>
              <p className="text-gray-600">
                We provide daily inspiration and motivation to help writers
                overcome creative blocks and find their muse.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <BookOpen className="h-10 w-10 mb-4 text-gray-700" />
              <h3 className="mb-3">Educate</h3>
              <p className="text-gray-600">
                From beginner tips to advanced techniques, we offer comprehensive
                resources for writers at every level.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Users className="h-10 w-10 mb-4 text-gray-700" />
              <h3 className="mb-3">Connect</h3>
              <p className="text-gray-600">
                Join a vibrant community of writers who support, encourage, and
                learn from each other.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-center mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <ImageWithFallback
                  src={member.avatar}
                  alt={member.name}
                  className="h-24 w-24 rounded-full mx-auto mb-4"
                />
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gray-50">
        <CardContent className="p-12 text-center">
          <h2 className="mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a seasoned author or just starting your writing
            journey, there's a place for you at WriterMorphosis. Subscribe to our
            newsletter and never miss an update.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
