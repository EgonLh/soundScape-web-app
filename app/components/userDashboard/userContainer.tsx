import {SidebarProvider, SidebarTrigger} from "@/app/components/ui/sidebar";

export default function UserDashBoardContainer(){
    return(<div className={" "}>
     <div className={"bg-black align-left w-96 flex justify-end"}>
        <SidebarTrigger/>
     </div>
    </div>)
}