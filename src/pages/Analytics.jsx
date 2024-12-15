import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const energyData = [
    { name: 'Jan', CO2Emissions: 200, EnergyCost: 150, Profit: 300 },
    { name: 'Feb', CO2Emissions: 180, EnergyCost: 120, Profit: 340 },
    { name: 'Mar', CO2Emissions: 220, EnergyCost: 130, Profit: 320 },
    { name: 'Apr', CO2Emissions: 210, EnergyCost: 160, Profit: 360 },
    { name: 'May', CO2Emissions: 200, EnergyCost: 170, Profit: 340 },
    { name: 'Jun', CO2Emissions: 190, EnergyCost: 180, Profit: 350 },
    { name: 'Jul', CO2Emissions: 230, EnergyCost: 190, Profit: 325 },
];

export default function Analytics() {
    return (
        <div className="space-y-8">
            <section className="bg-zinc-800 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Analytics Dashboard</h1>
                </div>
            </section>
            <div className="flex flex-wrap">
                {/* Left-side cards container */}
                <div className="p-4 flex flex-col justify-around w-4/5 md:w-2/5 space-y-4">
                    {/* Energy Intensity Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Energy Intensity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">0.45 kWh/unit</div>
                            <p className="text-sm text-zinc-400 mt-2">5% decrease from last month</p>
                        </CardContent>
                    </Card>
                    {/* Cost Savings Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cost Savings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-400">$12,450</div>
                            <p className="text-sm text-zinc-400 mt-2">10% increase in savings this quarter</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right-side larger chart container */}
                <div className="w-full md:w-3/5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quarterly Profit Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={energyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Profit" stroke="#facc15" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Energy Consumption Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={energyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="CO2Emissions" stroke="#facc15" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="EnergyCost" stroke="#4ade80" />
                                <Line type="monotone" dataKey="Profit" stroke="#60a5fa" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CO2 Emissions Tracking Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>CO2 Emissions Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={energyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="CO2Emissions" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Energy Cost Analysis Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Energy Cost Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={energyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="EnergyCost" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

