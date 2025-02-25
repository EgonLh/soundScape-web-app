import {SidebarTrigger} from "@/app/components/ui/sidebar";

export default function DashboardNav(props: { data: any ,title:String}) {
    return <div className={" py-3  my-4 flex justify-between items-center px-3 rounded "}>
        <div
            className={"text-lg font-semibold hover:bg-gray-300/[0.5] hover:px-3 transition-all duration-200 ease-in-out rounded"}>
            {props.data?.role == "admin" ? <span className={"font-mono"}>{props.title}</span> : <span>
                    Hello, {props.data?.username.toUpperCase()}
                </span>}
        </div>
        <div className={"flex items-center "}>
            <div
                className={"mx-3 text-xs bg-slate-100 p-2 rounded-md font-mono text-slate-500 border shadow-sm hover:shadow-none hover:text-black"}>
                {/*{date}*/} Later
            </div>
            <div className={"bg-slate-100 border rounded-md hover:bg-slate-300 transition duration-200 ease-in-out"}>
                <SidebarTrigger/>
            </div>
        </div>
    </div>;
}