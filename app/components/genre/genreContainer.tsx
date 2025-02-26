import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import {ListCheck} from "lucide-react";
import GenreDetail from "@/app/components/genre/genreDetail";

export default function GenreContainer(){
    return <div className={"flex w-full my-4  flex-col border "}>
        <div>
            <DashboardNav title={"Genre Dashboard"} icon={<ListCheck/>}/>
        </div>
        <GenreDetail/>
    </div>
}