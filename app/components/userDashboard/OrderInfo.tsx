import {useGetOrdersByUsrIdQuery} from "@/lib/features/orders/orderApiSlice";
export default function RecentOrders({userId}) {
    console.log("For user ID", typeof (userId))
    const {data,isLoading,isError} = useGetOrdersByUsrIdQuery(userId);
    if(isLoading || isError){
        return  <div>Loading</div>
    }
    console.log("For the order data",data)
    return <div className={"bg-slate-200 border"}>
        Your Recent Orders
        <br/>
        <div className={"w-full border shadow "}>
            <div className={"grid grid-cols-4 gap-1 w-full"}>
                <div className={"border w-full font-mono text-xs text-slate-400"}>Order</div>
                <div className={"border w-full text-center font-mono text-xs text-slate-400"}>Payment</div>
                <div className={"border w-full text-center font-mono text-xs text-slate-400"}>Process</div>
                <div className={"border w-full text-end  font-mono text-xs text-slate-400"}>Action</div>
            </div>
            {data?.map(order=>(<div key={order._id} className={"grid grid-cols-4 gap-1 w-full"}>
                <div className={"border w-full font-mono text-xs text-slate-400"}>{order?._id}</div>
                <div className={"border w-full text-center font-mono text-xs text-slate-400"}>{order?.payment.method}</div>
                <div className={"border w-full text-center font-mono text-xs text-slate-400"}>Process:need to add</div>
                <div className={"border w-full text-end  font-mono text-xs text-slate-400"}>See Detail</div>
            </div>))}
        </div>
    </div>;
}