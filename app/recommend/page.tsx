"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Loader, Trash2 } from "lucide-react";
import RoadmapDisplay from "@/components/RoadmapDisplay";
import Footer from "@/components/Footer";

interface SavedRoadmap {
    id: string;
    skill: string;
    level: string;
    savedAt: string;
    roadmap: string;
}
const injectAffiliateLinks = (text: string) => {
  let updatedText = text;

  // Create your dictionary of affiliate links
  const affiliateMap = {
    "Recommended Course: Udemy": "[Recommended Course: Udemy](https://click.linksynergy.com/fs-bin/click?id=YOUR_UDEMY_ID)",
    "Recommended Course: Coursera": "[Recommended Course: Coursera](https://coursera.pxf.io/c/YOUR_COURSERA_ID)",
    "Recommended Tool: Hostinger": "[Recommended Tool: Hostinger](https://hostinger.com?REFERRAL_ID)",
    "Recommended Tool: Notion": "[Recommended Tool: Notion](https://notion.grsm.io/YOUR_NOTION_ID)"
  };

  // Loop through and swap raw text for markdown links
  Object.entries(affiliateMap).forEach(([keyword, affiliateLink]) => {
    const regex = new RegExp(keyword, "g");
    updatedText = updatedText.replace(regex, affiliateLink);
  });

  return updatedText;
};

export default function RecommendPage() {
    const [skill, setSkill] = useState("");
    const [level, setLevel] = useState("beginner");
    const [budget, setBudget] = useState("medium");
    const [hours, setHours] = useState("10");
    const [roadmap, setRoadmap] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);

    // Load saved roadmaps from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("roadmaps");
        if (saved) {
            try {
                setRoadmaps(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load roadmaps", e);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!skill.trim()) {
            setError("Please enter a skill to learn");
            return;
        }

        try {
            setLoading(true);
            
            // Connected directly to your local endpoint layout properties
            const response = await fetch("/api/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill, level, budget, hours }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to generate roadmap");
                setLoading(false);
                return;
            }

            // Sets the data string dynamically right into your custom RoadmapDisplay layout engine
            setRoadmap(data.roadmap);

            // Auto-save to localStorage using your exact state parameters
            const newRoadmap: SavedRoadmap = {
                id: Date.now().toString(),
                skill,
                level,
                savedAt: new Date().toLocaleDateString(),
                roadmap: data.roadmap,
            };

            const updatedRoadmaps = [newRoadmap, ...roadmaps];
            setRoadmaps(updatedRoadmaps);
            localStorage.setItem("roadmaps", JSON.stringify(updatedRoadmaps));
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadRoadmap = (saved: SavedRoadmap) => {
        setSkill(saved.skill);
        setLevel(saved.level);
        setRoadmap(saved.roadmap);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteRoadmap = (id: string) => {
        if (!confirm("Delete this roadmap?")) return;
        const updated = roadmaps.filter((r) => r.id !== id);
        setRoadmaps(updated);
        localStorage.setItem("roadmaps", JSON.stringify(updated));
    };

    const filteredRoadmaps = roadmaps.filter((roadmap) =>
        roadmap.skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen px-6">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">
                        Generate Your Learning Roadmap
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Tell us about your goals and we'll create a personalized learning path just for you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 mb-8 transition-colors">
                    <div className="flex flex-col gap-6">
                        {/* Skill Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                What skill do you want to learn?
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., React, Python, Web Design..."
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                            />
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Your experience level
                            </label>
                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                            >
                                <option value="beginner">Beginner - Just starting out</option>
                                <option value="intermediate">Intermediate - Some experience</option>
                                <option value="advanced">Advanced - Looking to master</option>
                            </select>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Learning budget
                            </label>
                            <select
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                            >
                                <option value="limited">Limited - Under $50</option>
                                <option value="medium">Medium - $50-200</option>
                                <option value="generous">Generous - $200+</option>
                            </select>
                        </div>

                        {/* Hours per Week */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Hours per week you can dedicate
                            </label>
                            <select
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                            >
                                <option value="5">5 hours/week</option>
                                <option value="10">10 hours/week</option>
                                <option value="20">20 hours/week</option>
                                <option value="30">30+ hours/week</option>
                            </select>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg transition-colors">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold p-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader size={20} className="animate-spin" />
                                    Generating your roadmap...
                                </>
                            ) : (
                                "Generate Roadmap"
                            )}
                        </button>
                    </div>
                </form>

                {/* Roadmap Display Wrapper - Layout Preserved */}
                {roadmap && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Your Personalized Roadmap
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Tailored to your goals, budget, and learning pace.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(roadmap);
                                    alert("Roadmap copied!");
                                }}
                                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm hover:opacity-80 transition dark:text-white"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <RoadmapDisplay content={injectAffiliateLinks(roadmap)} />
                        </div>
                    </div>
                )}

                {/* Saved Roadmaps Section */}
                {roadmaps.length > 0 && (
                    <div className="mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg transition-colors mb-12">
                        <input 
                            type="text" 
                            placeholder="Search saved roadmaps..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full mb-6 border border-gray-300 dark:border-gray-700 p-4 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" 
                        />
                        <h2 className="text-2xl font-bold mb-6">Saved Roadmaps</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} saved
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {filteredRoadmaps.map((saved) => (
                                <div
                                    key={saved.id}
                                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all flex flex-col justify-between gap-4"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg text-black dark:text-white">{saved.skill}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {saved.level.charAt(0).toUpperCase() + saved.level.slice(1)} • {saved.savedAt}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteRoadmap(saved.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => loadRoadmap(saved)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition text-sm font-medium"
                                    >
                                        Load Roadmap
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}