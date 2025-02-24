"use client"
import {SidebarProvider} from "@/app/components/ui/sidebar";
import {AppSidebar} from "@/app/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

            <div className={"w-full"}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className={"container border flex justify-center bg-slate-300"}>
                        <div className={"flex justify-center bg-black xl:w-5/6 lg:w-full w-full  "}>
                            {children}
                        </div>

                    </main>
                </SidebarProvider>
            </div>
    )
}