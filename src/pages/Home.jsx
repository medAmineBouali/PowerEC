import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, BarChart2, Zap, Settings } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: Gauge,
            title: "Real-time Monitoring",
            description: "Track energy consumption as it happens.",
        },
        {
            icon: BarChart2,
            title: "Advanced Analytics",
            description: "Gain insights with detailed data analysis.",
        },
        {
            icon: Zap,
            title: "Energy Optimization",
            description: "Identify and eliminate energy wastage.",
        },
        {
            icon: Settings,
            title: "Machine Tracking",
            description: "Monitor individual machines and groups.",
        },
    ];

    const stats = [
        {
            metric: "25%",
            description: "Average energy savings",
        },
        {
            metric: "99.9%",
            description: "Uptime for continuous monitoring",
        },
        {
            metric: "1000+",
            description: "Industrial clients worldwide",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Introduction Section */}
            <section className="bg-zinc-800 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-4">
                        Welcome to POWER EC
                    </h1>
                    <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                        POWER EC is your comprehensive industrial energy consumption monitoring solution. From real-time tracking to advanced analytics, we empower industries to make data-driven decisions and optimize their energy usage.
                    </p>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-blue-600 text-zinc-100 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">
                        Industrial Energy Monitoring Reimagined
                    </h2>
                    <p className="text-xl mb-8">
                        Track, analyze, and optimize your energy consumption with POWER EC.
                    </p>
                    <Link
                        to="/dashboard"
                        className="bg-yellow-400 text-zinc-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 p-6 rounded-lg text-center hover:shadow-lg transition"
                            >
                                <feature.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
                        Why Choose POWER EC?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 p-6 rounded-lg text-center hover:shadow-lg transition"
                            >
                                <p className="text-4xl font-bold text-yellow-400 mb-4">
                                    {stat.metric}
                                </p>
                                <p className="text-zinc-300">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-800 py-8 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-zinc-400">
                        © 2024 POWER EC. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
