import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import UserDetail from "@/app/components/users/userDetail";


export default function UserContainer(){
    return <div className={"flex w-full my-4  flex-col border "}>
        <div>
            <DashboardNav/>
        </div>
        <UserDetail/>
    </div>
}