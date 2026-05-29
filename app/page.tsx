import Link from "next/link";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";

const features = [
  {
    title: "AI Learning Paths",
    description:
      "Generate personalized roadmaps tailored to your goals, experience level, and schedule.",
  },
  {
    title: "Curated Resources",
    description:
      "Discover the best tools, courses, books, and videos for faster learning.",
  },
  {
    title: "Project-Based Learning",
    description:
      "Build real-world projects that strengthen your portfolio and practical skills.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
          <div className="w-[500px] h-[500px] bg-blue-500 rounded-full mx-auto mt-[-100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-32 text-center">

          <p className="inline-block border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm mb-8">
            AI-Powered Learning Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">
            Build Smarter Learning Roadmaps with AI
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            SkillNest helps developers and learners generate personalized
            learning paths based on goals, budget, experience level,
            and available study time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

            <Link
              href="/recommend"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Generate Roadmap
            </Link>

            <Link
              href="/recommend"
              className="border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Explore Features
            </Link>

          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">

        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Developers Use SkillNest
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Designed to help learners stay focused, structured, and consistent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

        </div>

      </section>
      {/* HOW IT WORKS */}
      <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            How SkillNest Works
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Generate personalized learning roadmaps in seconds.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-5xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold">
                Choose a Skill
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Enter any skill you want to learn like React, Python, UI Design, or Data Analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-5xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold">
                Set Your Preferences
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Choose your experience level, budget, and available study time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <div className="text-5xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold">
                Get Your Roadmap
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Receive a structured roadmap with projects, resources, and learning milestones.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}