import {Calendar, ChevronUp, Home, Inbox,ListIcon, FileUser, Settings, User2,SendHorizonal,Mail,FileText,Send,FileTextIcon} from "lucide-react"
import {UserCircleIcon,ShoppingBagIcon} from '@heroicons/react/24/outline'

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import React, {useId} from "react";

export const getUserInfo = () => {
    const userId = useAppSelector(selectUsrID);
    const {data} = useGetUserInfoQuery(userId);
    return data;
}


const Admin = [
    {
        group: "General",
        id:1233,
        links: [
            {
                title: "Dashboard",
                url: "/user",
                icon: Home,
            },
            {
                title: "Orders",
                url: "/user/orders",
                icon: ShoppingBagIcon,
            },
            {
                title: "Users",
                url: "/user/users",
                icon: User2,
            },
            {
                title: "Albums",
                url: "/user/albums",
                icon: FileTextIcon,
            },
            {
                title: "Genre",
                url: "/user/genres",
                icon: ListIcon,
            },
            {
                title: "Mail",
                url: "/user/users/request",
                icon: Mail,
            },

        ],
    },
    {
        group: "Pages",
        id:"095833",
        links: [
            {
                title: "Profile",
                url: "#",
                icon: FileUser,
            },
            {
                title: "Setting",
                url: "#",
                icon: Settings,
            },

        ],
    },
]
const UserItem = [
    {
        group: "General",
        id:1233,
        links: [
            {
                title: "Dashboard",
                url: "/user",
                icon: Home,
            },
            {
                title: "Orders",
                url: "/user/orders",
                icon: ShoppingBagIcon,
            },
            {
                title: "History",
                url: "/user/users",
                icon: User2,
            },
            {
                title: "Mail",
                url: "/user/users/request",
                icon: Mail,
            },

        ],
    },
    {
        group: "Pages",
        id:"095833",
        links: [
            {
                title: "Profile",
                url: "#",
                icon: FileUser,
            },
            {
                title: "Setting",
                url: "#",
                icon: Settings,
            },

        ],
    },
]

export function AppSidebar() {
    let id = useId();

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
            <SidebarContent className={"bg-white"}>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((group) => (
                                <div key={group.group} className={"my-2"}>
                                    <SidebarGroupLabel key={group.id}>{group.group}</SidebarGroupLabel>
                                    {group.links?.map((link) => (
                                        <SidebarMenuItem key={link.title} >
                                            <SidebarMenuButton asChild className={"my-2 text-slate-500 hover:text-slate-900"}>
                                                <Link href={link.url}>
                                                    <link.icon/>
                                                    <span>{link.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={"/"}>Sign Out</a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
