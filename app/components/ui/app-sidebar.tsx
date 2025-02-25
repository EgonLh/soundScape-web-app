import {Calendar, ChevronUp, Home, Inbox, FileUser, Settings, User2,SendHorizonal,Mail,FileText,Send,FileTextIcon} from "lucide-react"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import {useId} from "react";

export const getUserInfo = () => {
    const userId = useAppSelector(selectUsrID);
    const {data} = useGetUserInfoQuery(userId);
    return data;
}


const Admin = [
    {
        group: "General",
        links: [
            {
                title: "Dashboard",
                url: "/user",
                icon: Home,
            },
            {
                title: "Orders",
                url: "/orders",
                icon: ShoppingBagIcon,
            },
            {
                title: "Users",
                url: "#",
                icon: User2,
            },
            {
                title: "Record",
                url: "#",
                icon: FileTextIcon,
            },
            {
                title: "Request",
                url: "#",
                icon: SendHorizonal,
            },

        ],
    },
    {
        group: "Pages",
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
                        <SidebarMenu key={id}>
                            {/*{items.map((group) => (*/}
                            {/*    <div key={} className={"my-2"}>*/}
                            {/*        <SidebarGroupLabel key={group.links}>{group.group}</SidebarGroupLabel>*/}
                            {/*        {group.links?.map((link) => (*/}
                            {/*            <SidebarMenuItem key={link.title} >*/}
                            {/*                <SidebarMenuButton asChild className={"my-2 text-slate-500 hover:text-slate-900"}>*/}
                            {/*                    <Link href={link.url}>*/}
                            {/*                        <link.icon/>*/}
                            {/*                        <span>{link.title}</span>*/}
                            {/*                    </Link>*/}
                            {/*                </SidebarMenuButton>*/}
                            {/*            </SidebarMenuItem>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu key={Math.random()}>
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
