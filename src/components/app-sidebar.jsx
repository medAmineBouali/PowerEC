import { Home, Activity, BarChart2, Settings, Power } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Overview",
        url: "/overview",
        icon: Home,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Live",
        url: "/live",
        icon: Activity,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="w-64 bg-zinc-800 p-4">
            <SidebarContent className=" bg-zinc-800">
                <SidebarGroup>
                    <div className="flex items-center mb-8">
                        <Power className="h-8 w-8 text-yellow-400 mr-2" />
                        <h1 className="text-2xl font-bold text-yellow-400">POWER EC</h1>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center p-2 hover:bg-zinc-700 rounded text-white"
                                        >
                                            <item.icon className="mr-2 h-5 w-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
