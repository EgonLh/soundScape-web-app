"use client"
import {SidebarProvider} from "@/app/components/ui/sidebar";
import {AppSidebar} from "@/app/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

            <div className={"w-full max-h-fit  overflow-hidden"}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className={"container flex justify-center h-fit"}>
                        <div className={"flex justify-center xl:w-5/6 lg:w-full w-full h-fit  "}>
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </div>
    )
}