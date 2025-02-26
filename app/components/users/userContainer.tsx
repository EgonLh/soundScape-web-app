import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import UserDetail from "@/app/components/users/userDetail";
import {UserCheck2Icon} from "lucide-react";


export default function UserContainer(){
    return <div className={"flex w-full my-4  flex-col border "}>
        <div>
            <DashboardNav title={"User Dashboard"} icon={<UserCheck2Icon/>}/>
        </div>
        <UserDetail/>
    </div>
}