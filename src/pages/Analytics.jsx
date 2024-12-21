import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {AnalyticsFilterMenubar} from "@/components/filter-bar";

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
            <section className="flex  p-10">
                <div className="container mx-auto text-left">
                    <h1 className="text-2xl font-bold  mb-4">
                        Analytics Dashboard</h1>
                </div>
                <AnalyticsFilterMenubar/>
            </section>
            <div className="grid grid-rows-2 grid-cols-6 gap-4">
                <Card className="row-span-1 col-span-1">
                    <CardHeader>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
                {/* Cost Savings Card */}
                <Card className="col-span-1">
                    <CardHeader>

                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>

                {/* Right-side larger chart container */}
                <div className="w-full row-span-2 col-span-4">
                    <Card >
                        <CardHeader>
                            <CardTitle>Quarterly Profit Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96 ">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={energyData}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="Profit" stroke="#facc15"/>
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
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="CO2Emissions" stroke="#facc15" activeDot={{r: 8}}/>
                                <Line type="monotone" dataKey="EnergyCost" stroke="#4ade80"/>
                                <Line type="monotone" dataKey="Profit" stroke="#60a5fa"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
                {/* CO2 Emissions Tracking Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>CO2 Emissions Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={energyData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="CO2Emissions" stroke="#82ca9d"/>
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
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="EnergyCost" fill="#8884d8"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

