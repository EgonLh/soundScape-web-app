"use client"
import {useGetAllOrdersQuery} from "@/lib/features/orders/orderApiSlice";
import {Card, CardContent, CardHeader, CardTitle} from "@/app/components/ui/card";
import {Badge} from "@/app/components/ui/badge";
import {Any} from "@react-spring/types";
export default function OrderDetail({data:any}) {
    const {data,isLoading} = useGetAllOrdersQuery();
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("Order :Data ",data)
    return (<div className={"w-full"}>
        <Order orders={data}/>
    </div>)
}

export const Order = ({orders}:{orders:Any})=>{
    console.log(orders)
    return ( <div className="p-4  w-full rounded-md border">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>
        {orders?.map((order) => (
            <div className={"border w-full my-3 py-4 grid grid-cols-5 flex items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300"} key={order._id}>
               <div className={"flex items-center justify-start 2/8  mx-1 flex justify-start hover:px-2  transition-all duration-300"}>
                   <img src={order?.userId?.profileUrl} className={"max-w-12 rounded-full border me-3"}/>
                   <div className={" align-middle w-fit rounded  text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{order?.userId?.contact?.email}</div>
                   </div>
                <div className={"w-2/8  mx-1 flex justify-center transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{order?.ordered_date}</div>
                </div>
                <div className={"w-2/8  mx-1 flex justify-center   transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border"}>{order?.status}</div>
                </div>
                <div className={"w-2/8  mx-1 flex justify-center  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{order?.fees?.$numberDecimal}</div>
                </div>
                <div className={"w-2/8 text-zinc-500 text-end"}>
                Actions
                </div>
            </div>
        ))}
    </div>)
}