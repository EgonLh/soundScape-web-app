"use client";
import {UserDashboard} from "@/app/components/dashboards/userDashboard";
import {getUserInfo} from "@/app/components/ui/app-sidebar";
import {AdminDashboard} from "@/app/components/dashboards/adminDashboard";
import DashboardNav from "@/app/components/userDashboard/dashboardNav";




export default function UserDashBoardContainer() {
    const data = getUserInfo();
    // console.log("The users data.",data?.metadata)
    // let date = (data?.metadata?.updatedAt.split(","))[1];
    // console.log("Date :",date)
    return (<div className={"bg-white overflow-hidden w-full my-12 px-2 rounded-lg shadow-md transition-all duration-300 hover:border hover:shadow-none"}>
        <DashboardNav data={data} title={"Dashboard"}/>
        {data?.role == "admin" ? <AdminDashboard data={data}/> : <UserDashboard data={data}/>}
        <div>

        </div>

    </div>)
}