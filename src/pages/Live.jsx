import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function generateRandomData(length) {
    return Array.from({ length }, (_, i) => ({
        time: i,
        value: Math.floor(Math.random() * 100) + 50
    }))
}

export default function LiveDashboard() {
    const [data, setData] = useState(generateRandomData(20))
    const [currentConsumption, setCurrentConsumption] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [
                    ...prevData.slice(1),
                    {
                        time: prevData[prevData.length - 1].time + 1,
                        value: Math.floor(Math.random() * 100) + 50
                    }
                ]
                setCurrentConsumption(newData[newData.length - 1].value)
                return newData
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-8">
            <section className="bg-zinc-800 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Live Energy Dashboard</h1>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Consumption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-6xl font-bold text-yellow-400">{currentConsumption} kW</div>
                        <Progress value={currentConsumption} className="mt-4" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Machine Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-lg font-semibold">Machine A</div>
                                <div className="text-2xl font-bold text-green-400">Online</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold">Machine B</div>
                                <div className="text-2xl font-bold text-yellow-400">Idle</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold">Machine C</div>
                                <div className="text-2xl font-bold text-green-400">Online</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold">Machine D</div>
                                <div className="text-2xl font-bold text-red-400">Offline</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Real-time Energy Consumption</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#facc15" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
