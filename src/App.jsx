import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "@/pages/Home.jsx";
import Overview from "@/pages/Overview.jsx";
import Analytics from "@/pages/Analytics.jsx";
import Live from "@/pages/Live.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function App() {
    console.log("app starting ...")
    return (
        <Router >
            <SidebarProvider defaultOpen={true}>
                    <AppSidebar />
                    <main className="flex-1 w-full bg-zinc-100 relative">
                        <SidebarTrigger className="sidebaretrigger absolute"/>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/live" element={<Live />} />
                        </Routes>
                    </main>
            </SidebarProvider>
        </Router>
    );
}

export default App;
