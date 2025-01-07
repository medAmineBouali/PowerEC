import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Overview = () => {
    const [overviewMetrics, setOverviewMetrics] = useState(null);
    const [lastMonthData, setLastMonthData] = useState(null);
    const [plantData, setPlantData] = useState(null);
    const [metricToShow, setMetricToShow] = useState('energy'); // 'energy' or 'cost'

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        // Fetch overview metrics
        fetch('http://localhost:5000/api/overview/overview-metrics')
            .then((response) => response.json())
            .then((data) => setOverviewMetrics(data))
            .catch((error) => console.error('Error fetching overview metrics:', error));

        // Fetch last month's daily metrics
        fetch('http://localhost:5000/api/overview/last-month-metrics')
            .then((response) => response.json())
            .then((data) => setLastMonthData(data))
            .catch((error) => console.error('Error fetching last month daily metrics:', error));

        // Fetch plant data
        fetch('http://localhost:5000/api/overview/plant-consumption-last-month')
            .then((response) => response.json())
            .then((data) => {
                // Aggregate total energy by plant
                const aggregatedData = data.reduce((acc, item) => {
                    const existingPlant = acc.find((entry) => entry.plant === item.plant);
                    if (existingPlant) {
                        existingPlant.totalEnergy += parseFloat(item.totalEnergy) || 0;
                    } else {
                        acc.push({ plant: item.plant, totalEnergy: parseFloat(item.totalEnergy) || 0 });
                    }
                    return acc;
                }, []);
                setPlantData(aggregatedData);
            })
            .catch((error) => console.error('Error fetching plant consumption data:', error));
    }, []);

    if (!overviewMetrics || !lastMonthData || !plantData) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    // Calculate total monthly energy and cost from the daily data
    const totalMonthlyEnergy = lastMonthData
        .reduce((acc, day) => acc + parseFloat(day.totalEnergy), 0)
        .toFixed(2);

    const totalMonthlyCost = lastMonthData
        .reduce((acc, day) => acc + parseFloat(day.cost), 0)
        .toFixed(2);

    return (
        <div className="min-h-screen flex flex-col">

            <section className=" py-10">
                <div className="container mx-auto   text-left">
                    <h1 className="text-2xl font-bold  mb-4">Overview</h1>
                </div>
            </section>

            {/* Top-level Metrics Cards */}
            <section className=" text-zinc-100 row py-10 text-center">
                <div className="flex justify-between pl-4 pr-4 grid grid-cols-5 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Energy (All Time)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">{overviewMetrics.totalEnergy} kWh</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Machines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">{overviewMetrics.totalMachines}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Avg Power Factor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">{overviewMetrics.avgPowerFactor}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Last Month Total Energy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">{totalMonthlyEnergy} kWh</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Last Month Total Cost</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-yellow-400">{totalMonthlyCost} €</div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <section className="flex justify-between">
                <Card className="m-4 flex-1">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Daily Consumption (Last Month)</CardTitle>
                        <div className="flex space-x-4">
                            <button
                                className={`px-4 py-2 rounded ${metricToShow === 'energy' ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-800'}`}
                                onClick={() => setMetricToShow('energy')}
                            >
                                Energy
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${metricToShow === 'cost' ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-800'}`}
                                onClick={() => setMetricToShow('cost')}
                            >
                                Cost
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lastMonthData} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis
                                        dataKey="date"
                                        domain={['dataMin', 'dataMax']}
                                    />

                                    <YAxis domain={['auto', 'auto']}/>
                                    <Tooltip/>
                                    <Legend/>
                                    {metricToShow === 'energy' && (
                                        <Line type="monotone" dataKey="totalEnergy" stroke="#8884d8"
                                              name="Energy (kWh)"/>
                                    )}
                                    {metricToShow === 'cost' && (
                                        <Line type="monotone" dataKey="cost" stroke="#82ca9d" name="Cost (€)"/>
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="m-4 flex-1">
                    <CardHeader>
                        <CardTitle>Plant Consumption (Last Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={plantData}
                                        dataKey="totalEnergy"
                                        nameKey="plant"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label={(entry) => `${entry.plant}: ${entry.totalEnergy.toFixed(2)} kWh`}
                                    >
                                        {plantData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default Overview;
