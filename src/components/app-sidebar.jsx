import {
    Home,
    Gauge,
    Activity,
    BarChart2,
    Settings,
    Power,
    ChevronUp
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {

    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {ThemeToggle} from "@/components/theme-toggle"
import {Link} from "react-router-dom";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Overview",
        url: "/overview",
        icon: Gauge,
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
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="none" className="p-4 h-screen bg-sidebar text-sidebar-foreground">
            <SidebarContent className="bg-sidebar">
                <SidebarGroup>
                    <div className="flex items-center mb-8">
                        <Power className="h-8 w-8 text-yellow-400 mr-2" />
                        {/* Hide text when collapsed */}
                        <h1 className="text-2xl font-bold text-yellow-400 group-data-[collapsible=icon]:hidden">
                            POWER EC
                        </h1>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton asChild className=" hover:bg-accent text-sidebar-accent-foreground ">
                                        <Link
                                            to={item.url}
                                            className="flex items-center p-2 rounded "
                                        >
                                            <item.icon className="h-5 w-5 mr-2" /> {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className=" mt-auto p-4 border-t border-sidebar-foreground">
            <SidebarMenu>
                <SidebarMenuItem className="flex items-center">
                    <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="flex items-center justify-between w-full bg-sidebar  hover:bg-sidebar rounded p-2"> Username
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className=" border bg-sidebar rounded-md w-full"
                        >
                            <DropdownMenuItem className=" p-2">
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="  p-2">
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className=" p-2">
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
            <ThemeToggle />
        </Sidebar>
    )
}
