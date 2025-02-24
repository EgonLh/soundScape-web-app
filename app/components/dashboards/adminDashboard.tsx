import CalenderChart,{CardITem} from "@/app/components/adminDashboard/Charts";
import {Component} from "@/app/components/adminDashboard/test";
import {Activity,ShoppingCart,ShoppingBag,Group,FileText} from "lucide-react";
export function AdminDashboard(props: { data: any }) {
    return <div className={"  grid lg:grid-cols-3  grid-cols-1 gap-5 my-4 "}>
        <div className={" col-span-2 "}>
            <div className={' flex justify-between'}>
                <CardITem title={"Overviews For Activities"} icon={<Activity/>}/>
                <CardITem title={"Available Items"} icon={<ShoppingCart/>}/>
                <CardITem title={"Ordered Items"} icon={<ShoppingBag/>}/>
                <CardITem title={"Total Users"} icon={<Group/>}/>
            </div>
            <div className={"bg-black m-2 h-5/6 flex flex-col justify-center"}>
                <div className={"text-white h-4/0 border"}>Current Orders</div>
            </div>
        </div>
        <div className={"bg-"}>
            <div className={"flex flex-col items-center justify-around border rounded shadow-sm"}>
                <div className={"  text-center flex justify-start mx-3 w-full items-center p-3"}>
                    <div className={"p-1 bg-slate-50/[0.8] rounded-md hover:bg-slate-600 hover:text-zinc-300 transition-all duration-200 hover:me-3"}>
                        <FileText/>
                    </div>
                    <div className={"font-semibold text-slate-800"}>User's Information</div>

                </div>
                <div className={"flex  border m-2 rounded-md shadow-md flex-col justify-center items-center overflow-hidden w-full"}>
                    <img src={props.data?.profileUrl} className={"rounded-md max-w-40"}/>
                    <div className={"mx-2 p-3 "}>
                        <div className={"text-md font-mono font-semibold"}>Information</div>
                        <div className={"text-sm text-slate-500"}>
                            {props.data?.name?.firstName}
                            {props.data?.name?.lastName}
                        </div>
                        <div>@{props.data?.username}</div>
                        <div className={"text-lg font-mono font-semibold"}>Contact Information</div>
                        <div>{props.data?.contact?.email}
                            {props.data?.contact?.phoneNo}</div>
                        <div>@{props.data?.username}</div>
                        <div className={"text-lg font-mono font-semibold"}>Your Billing Info</div>
                        <div>{(props.data?.billInfo) ?
                            <div className={"flex justify-between"}>
                                <button
                                    className={"border bg-slate-300 text-gray-700 w-1/2 py-1 transition-all duration-300 font-minibold font-mono  rounded text-sm"}>(data?.billInfo)
                                </button>
                                <button
                                    className={"border bg-black text-white hover:bg-white px-2 py-1 transition-all duration-300 font-minibold font-mono hover:text-black rounded text-sm"}>Remove
                                    Card
                                </button>
                            </div>

                            : <div className={"flex justify-between"}>
                                <button
                                    className={"border bg-slate-300 text-gray-700 w-1/2 py-1 transition-all duration-300 font-minibold font-mono  rounded text-sm"}>Empty
                                </button>
                                <button
                                    className={"border bg-black text-white hover:bg-white px-2 py-1 transition-all duration-300 font-minibold font-mono hover:text-black rounded text-sm"}>Add
                                    Card
                                </button>
                            </div>}</div>

                    </div>
                </div>
            </div>
            <Component/>
        </div>
    </div>;
}
