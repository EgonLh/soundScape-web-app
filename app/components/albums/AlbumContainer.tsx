import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import AlbumListView from "@/app/components/albums/AlbumListView";

export default function AlbumContainer(){
    return <div className={"flex w-full my-4  flex-col border "}>
        <div>
            <DashboardNav title={"Order Data"}/>
        </div>
        <AlbumListView/>
    </div>
}