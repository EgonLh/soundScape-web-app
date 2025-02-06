import {SidebarProvider,} from "@/app/components/ui/sidebar";
import {AppSidebar} from "@/app/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

            <div className={"w-fit bg-black userDash"}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className={"bg-zinc-300"}>
                        {children}

                    </main>
                </SidebarProvider>
            </div>
    )
}