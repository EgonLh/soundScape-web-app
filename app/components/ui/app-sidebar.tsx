import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {UserCircleIcon,Bars3Icon, ShoppingCartIcon, ClipboardDocumentListIcon,ArrowsPointingOutIcon} from '@heroicons/react/24/outline'

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu, SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/components/ui/sidebar"


// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: ClipboardDocumentListIcon,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Bars3Icon,
    },
    {
        title: "Search",
        url: "#",
        icon: UserCircleIcon,
    },
    {
        title: "Settings",
        url: "#",
        icon: ShoppingCartIcon,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                        </a>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter>
                    <SidebarMenu>
                    <SidebarMenuItem key={122323}>
                        <SidebarMenuButton asChild>
                            <a href={"/"}>
                                <ArrowsPointingOutIcon/>
                            </a>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
