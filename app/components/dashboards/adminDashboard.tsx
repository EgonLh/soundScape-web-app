"use client"
import {CardITem} from "@/app/components/adminDashboard/Charts";
import {Component} from "@/app/components/adminDashboard/test";
import {Activity, FileText, Group, Mail, Phone, ShoppingBag, ShoppingCart ,ReceiptText,ScanSearch} from "lucide-react";
import {useGetAllOrdersQuery} from "@/lib/features/orders/orderApiSlice"
import {useRouter} from "next/navigation";
function UserInfo(props: { data: any }) {
    return <div className={" flex flex-col justify-between h-full"}>
        <div className={"flex flex-col items-center justify-around border rounded shadow-sm  my-1 bg-white"}>
            <div className={"  text-center flex justify-between mx-3 w-full items-center p-3 border-b-2"}>
                <div className={"flex justify-start items-center"}>
                    <div
                        className={"p-1 bg-slate-50/[0.8] rounded-md hover:bg-slate-600 hover:text-zinc-300 transitions-all duration-200 hover:me-3"}>
                        <FileText/>
                    </div>
                    <div className={"font-semibold text-slate-800"}>
                        <div className={"flex text-md "}>
                            <div className={"text-md  font-semibold"}>Hello,</div>
                            <div className={"flex mx-1"}>
                                <div className={"me-1"}>
                                    {props.data?.name?.firstName}
                                </div>
                                <div className={""}> {props.data?.name?.lastName}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-slate-300 hover:text-slate-900 transitions-all duration-300"}>
                    <ScanSearch/>
                </div>
            </div>
            <div className={"flex px-2  flex-col justify-center items-center overflow-hidden w-full"}>
                <div className={" p-4 w-full "}>
                    {/*Info */}
                    <div>
                        <div className={"flex justify-between items-center my-1"}><Mail
                            className={"me-3 hover:bg-black hover:text-white rounded bg-slate-50 transitions-color duration-300 ease-in-out hover:mx-1 size-7 border p-1"}/>
                            <div
                                className={"text-slate-500 hover:text-black transitions-color duration-300"}>{props.data?.contact?.email}</div>
                        </div>
                        <div className={"flex justify-between items-center my-1"}><Phone
                            className={"me-3 hover:bg-black hover:text-white rounded bg-slate-50 transitions-color duration-300 ease-in-out hover:mx-1 size-7 border p-1"}/>
                            <div
                                className={" text-slate-500 hover:text-black transitions-color duration-300"}>{props.data?.contact?.phoneNo}</div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
        <Component/>
        <div className={"bg-white"}>
            <div className={"flex justify-between  p-4  items-center border rounded hover:shadow-md transitions-all duration-300"}>
                <div className={"flex"}>
                    <img src={props.data?.profileUrl} className={"rounded-md max-w-12 min-h-11"}/>
                    <div className={"text-sm text-slate-500 ms-3 flex flex-col transition-all  hover:font-semibold duration-300 hover:px-3"}>
                        <div className={"hover:text-black "}> {props.data?.contact?.email}</div>
                        <div className={"hover:text-black "}>@{props.data?.username}</div>
                    </div>
                </div>
                <div><ReceiptText className={"text-slate-300 hover:text-black p-1 hover:p-0 transitions-all duration-300"}/></div>
            </div>
        </div>
    </div>;
}

function CurrentOrders() {
    const {data} = useGetAllOrdersQuery();
const router = useRouter();
    const detailHandler = () => {
        console.log("work..")
        router.push('/user/orders')
    };
    const limit = 10;
    const limitedData = data?.slice(0, limit);
    return <div className={" h-full flex flex-col justify-between "}>
        <div className={"text-md my-2 flex items-center "}>
            <ShoppingBag className={"bg-slate-50/[0.8] mx-2 transitions-all duration-200 hover:me-5"}/><span className={"font-semibold"} >Current Orders</span></div>
        <div className={""}>
            <div className={"flex w-full my-1  rounded p-1  justify-between items-center text-slate-300"}>
                <div className={"w-2/6  mx-1 flex justify-start  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1 hover:text-black text-xs hover:font-semibold transition-all duration-300"}>Email</div>
                </div>
                <div className={"w-2/6  mx-1 flex justify-center  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1  hover:text-black text-xs hover:font-semibold transition-all duration-300"}>Date</div>
                </div>
                <div className={"w-2/6  mx-1 flex justify-center  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1  hover:text-black text-xs hover:font-semibold transition-all duration-300"}>Amount</div>
                </div>
                <div className={"w-2/6  mx-1 flex justify-end  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1  hover:text-black text-xs hover:font-semibold transition-all duration-300"}>Fees</div>
                </div>
            </div>
            {limitedData?.map(order => (<div key={order?._id} className={"flex w-full my-1 border rounded py-2 justify-between items-center"}>
                <div className={"w-2/6  mx-1 flex justify-start hover:px-2  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{order?.userId?.contact?.email}</div>
                </div>
                <div className={"w-2/6 mx-1 flex justify-center hover:py-2  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{order?.metadata.createdAt}</div>
                </div>
                <div className={"w-2/6 mx-1 flex justify-center  hover:py-2  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1 font-mono my-1 bg-orange-300 hover:bg-slate-100/[0.9] hover:border"}>{order?.amount}</div>
                </div>
                <div className={"w-2/6  mx-1 flex justify-end  hover:px-2  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>${order?.fees?.$numberDecimal}</div>
                </div>
            </div>))}
        </div>
        <div className={"text-end mx-1"}>
            <button onClick={detailHandler} className={"border p-1 hover:bg-black hover:text-white rounded bg-slate-50 transition-all duration-300 ease-in-out"}><FileText/></button>
        </div>
    </div>;
}

export function AdminDashboard(props: { data: any }) {
    return <div className={"  grid lg:grid-cols-3  grid-cols-1 gap-5 my-4 h-4/5 "}>
        <div className={" col-span-2 flex flex-col justify-between "}>
            <div className={' flex justify-between '}>
                <CardITem title={"Overviews For Activities"} icon={<Activity/>}/>
                <CardITem title={"Available Items"} icon={<ShoppingCart/>}/>
                <CardITem title={"Ordered Items"} icon={<ShoppingBag/>}/>
                <CardITem title={"Total Users"} icon={<Group/>}/>
            </div>
            <div className={"p-1 bg-white rounded flex flex-col h-5/6 mt-2 border justify-center"}>
                <CurrentOrders/>
            </div>
        </div>
        <UserInfo data={props.data}/>
    </div>;
}
