import { Brain, BookOpen, Hammer } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {

  const icons = {
    "AI Learning Paths": <Brain size={32} />,
    "Curated Resources": <BookOpen size={32} />,
    "Project-Based Learning": <Hammer size={32} />,
  };

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
        {icons[title as keyof typeof icons]}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
        {description}
      </p>

    </div>
  );
}