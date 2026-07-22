import React from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Target,
  Zap,
  Globe,
  Users,
  ArrowRight,
  Code2,
} from "lucide-react";

const values = [
  {
    Icon: Target,
    title: "Purpose-built for Travelers",
    desc: "Designed from the ground up for travelers who want smart, personalized plans — not generic tourist routes.",
  },
  {
    Icon: Zap,
    title: "Instant AI Planning",
    desc: "No waiting, no back-and-forth. Enter your preferences and get a full itinerary in moments.",
  },
  {
    Icon: Globe,
    title: "Local-first Approach",
    desc: "Budget in PKR, local context, and Pakistani destinations — built for travelers who know this part of the world.",
  },
  {
    Icon: Users,
    title: "Built for Everyone",
    desc: "Whether you're a solo backpacker, a family, or a couple — TripCraft adapts to your travel style.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Plane className="w-8 h-8 text-orange-400" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5">
            About <span className="text-orange-400">TripCraft AI</span>
          </h1>

          <p className="text-lg text-teal-100 leading-relaxed max-w-2xl mx-auto">
            TripCraft AI is a modern travel itinerary planner that uses
            artificial intelligence to help you discover, plan, and experience
            your next adventure — your way.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-50 mb-5">
            Our Story
          </h2>

          <div className="prose prose-warm max-w-none space-y-4 text-warm-600 dark:text-warm-400 leading-relaxed">
            <p>
              Planning a trip can feel overwhelming — hundreds of websites,
              conflicting reviews, and hours of research just to figure out what
              to do on Day 2. We built TripCraft AI to change that.
            </p>

            <p>
              By combining the power of large language models with a thoughtful,
              user-focused interface, TripCraft AI turns your travel preferences
              into a structured, day-by-day plan you can actually use. Just tell
              it where you want to go, how long you have, your budget, and what
              excites you — and it handles the rest.
            </p>

            <p>
              We focus especially on the Pakistani travel context: budgets in
              PKR, local destinations like Lahore, Hunza, Swat, and the Northern
              Areas, and a deep respect for the diversity of experiences this
              region offers.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm-50 dark:bg-warm-900/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-50 text-center mb-10">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="card p-6 flex gap-4">
                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-teal-700 dark:text-teal-400" />
                </div>

                <div>
                  <h3 className="font-bold text-warm-900 dark:text-warm-50 mb-1.5">
                    {title}
                  </h3>

                  <p className="text-sm text-warm-500 dark:text-warm-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-warm-100 dark:bg-warm-700 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>

            <h2 className="text-xl font-bold text-warm-900 dark:text-warm-50">
              Technical Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "React + Vite",
              "Tailwind CSS",
              "React Router",
              "Axios",
              "Lucide Icons",
              "Node.js API",
              "AI Backend",
              "Supabase",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-warm-50 dark:bg-warm-700 rounded-xl px-4 py-3 text-center text-sm font-medium text-warm-700 dark:text-warm-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-50 mb-4">
          Ready to explore?
        </h2>

        <p className="text-warm-500 dark:text-warm-400 mb-6">
          Start building your perfect travel itinerary today.
        </p>

        <Link
          to="/generate"
          className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
        >
          <Plane className="w-5 h-5" />
          Plan My Trip
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default About;