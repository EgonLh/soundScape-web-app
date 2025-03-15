import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import AlbumListView from "@/app/components/albums/AlbumListView";
import {ReceiptTextIcon} from "lucide-react";

export default function AlbumContainer(){
    return <div className={"flex w-full my-12  flex-col bg-white "}>
        <div>
            <DashboardNav title={"Album Dashboard"} icon={<ReceiptTextIcon/>}/>
        </div>
        <AlbumListView/>
    </div>
}