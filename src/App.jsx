import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "@/pages/Home.jsx";
import Overview from "@/pages/Overview.jsx";
import Analytics from "@/pages/Analytics.jsx";
import Live from "@/pages/Live.jsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function App() {
    console.log("app starting ...")
    return (
        <div className="flex h-screen w-screen">
            <Router>
                <SidebarProvider defaultOpen={true}>
                    <AppSidebar />

                    <main className="flex-1 w-full bg-primary overflow-auto relative">
                        <Routes>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/overview" element={<Overview/>}/>
                            <Route path="/analytics" element={<Analytics/>}/>
                            <Route path="/live" element={<Live/>}/>
                        </Routes>
                    </main>
                </SidebarProvider>
            </Router>
        </div>
    );
}

export default App;
