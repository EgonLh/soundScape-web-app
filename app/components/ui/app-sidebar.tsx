import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {UserCircleIcon,ShoppingBagIcon,Bars3Icon, ShoppingCartIcon, ClipboardDocumentListIcon,ArrowsPointingOutIcon} from '@heroicons/react/24/outline'

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
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";
import {selectAuth,selectUsrID} from "@/lib/features/auth/authSlice"
import {useGetUserInfoQuery} from "@/lib/features/auth/authApi";

export const getUserInfo = () => {
    const userId = useAppSelector(selectUsrID);
    const {data} = useGetUserInfoQuery(userId);
    return data;
}

// Menu items.
let Admin = [
    {
        title: "Order",
        url: "/orders",
        icon: ShoppingBagIcon,
    },
    {
        title: "Inbox",
        url: `/user/`,
        icon: UserCircleIcon,
    },
    {
        title: "Search",
        url: "#",
        icon: Bars3Icon,
    },
]
const UserItem = [
    {
        title: "Order",
        url: "/orders",
        icon: ShoppingBagIcon,
    },
    {
        title: "Inbox",
        url: `/user/`,
        icon: UserCircleIcon,
    }
]
export function AppSidebar() {
    let userInfo = getUserInfo();
    let items ;
    console.log("User Role :",userInfo?.role)
    if(userInfo?.role !== "admin"){
       items = UserItem;
    }else {
        items = Admin;
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={"flex mx-aut"}>
                                            <item.icon />{item.title}
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
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
        </Sidebar>
    )
}
