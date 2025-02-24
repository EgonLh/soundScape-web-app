"use client";
import {SidebarTrigger} from "@/app/components/ui/sidebar";
import {UserDashboard} from "@/app/components/dashboards/userDashboard";
import {getUserInfo} from "@/app/components/ui/app-sidebar";
import {AdminDashboard} from "@/app/components/dashboards/adminDashboard";



export default function UserDashBoardContainer() {
    const data = getUserInfo();
    console.log(data)
    return (<div className={"bg-slate-50 overflow-hidden w-full my-3 px-2 rounded-lg shadow-lg "}>
        <div className={" py-3  my-4 flex justify-between items-center px-3 rounded "}>
            <div className={"text-lg font-semibold hover:bg-gray-300/[0.5] hover:px-3 transition-all duration-200 ease-in-out rounded"}>
                {data?.role == "admin"?<span className={"font-mono"}>Dashboard</span>:<span>
                    Hello, {data?.username.toUpperCase()}
                </span>}
            </div>
            <div className={"flex items-center "}>
                <div className={"mx-3 text-xs bg-slate-100 p-2 rounded-md font-mono text-slate-500 border shadow-sm hover:shadow-none hover:text-black"}>
                {/*    Neet to Implement Updated Date*/}
                1/1/2025
                </div>
                <div className={"bg-slate-100 border rounded-md hover:bg-slate-300 transition duration-200 ease-in-out"}>
                    <SidebarTrigger/>
                </div>
            </div>
        </div>
            {data?.role == "admin" ?<AdminDashboard data={data}/>:<UserDashboard data={data}/>}
        <div>

        </div>

    </div>)
}