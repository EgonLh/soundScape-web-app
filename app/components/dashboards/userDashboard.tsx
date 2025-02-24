import RecentOrders from "@/app/components/userDashboard/OrderInfo";
import CardInfo from "@/app/components/userDashboard/CardInfo";
import MarketingSession from "@/app/components/userDashboard/marketingSession";

export function UserDashboard(props: { data: any }) {
    return (<div className={" border grid grid-cols-2 gap-5 my-4"}>
        <RecentOrders userId={props?.data?._id}/>
        <div className={"bg-border "}>
            <div className={"flex flex-col items-center justify-around"}>
                User Informations
                <div className={"bg-black flex  border m-2 rounded-md shadow-md justify-center items-center overflow-hidden "}>
                    <img src={props.data?.profileUrl} className={"w-2/5 rounded-full m-3 p-3"}/>
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
        </div>

        <MarketingSession/>
        <CardInfo props={props?.data}/>
    </div>);
}


