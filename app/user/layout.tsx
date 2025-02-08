import {SidebarProvider,} from "@/app/components/ui/sidebar";
import {AppSidebar} from "@/app/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

            <div className={"container border "}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className={"bg-zinc-300 w-full flex justify-center  border mx-auto"}>
                        {children}

                    </main>
                </SidebarProvider>
            </div>
    )
}