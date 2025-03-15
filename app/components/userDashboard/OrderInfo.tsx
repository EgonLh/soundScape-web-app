import {useGetOrdersByUsrIdQuery} from "@/lib/features/orders/orderApiSlice";
export default function RecentOrders({userId}) {
    console.log("For user ID", typeof (userId))
    const {data,isLoading,isError} = useGetOrdersByUsrIdQuery(userId);
    if(isLoading || isError){
        return  <div>Loading</div>
    }
    console.log("For the order data",data)
    return <div className={" border rounded p-1"}>
        <div className={"font-semibold hover:mx-1 my-1 transition-all duration-300"}>Recent Orders</div>
        <div className={"w-full my-2 rounded overflow-hidden"}>
            {/* Header Row */}
            <div className={"grid grid-cols-4 gap-2 p-2 text-xs text-slate-600"}>
                <div className={"font-semibold hover:text-black transition-all duration-300"}>Order</div>
                <div className={"text-center font-semibold hover:text-black transition-all duration-300"}>Payment</div>
                <div className={"text-center font-semibold hover:text-black transition-all duration-300"}>Process</div>
                <div className={"text-end font-semibold hover:text-black transition-all duration-300"}>Action</div>
            </div>

            {/* Data Rows */}
            {data?.map(order => (
                <div key={order._id} className={"grid grid-cols-4 gap-2 p-2  hover:my-2 hover:border transition-all duration-300"}>
                    {/* Order Column */}
                    <div className={"hover: hover:text-black hover:font-normal transition-all duration-300 px-2 py-1 text-xs font-mono text-slate-500 truncate"}>{order?._id}</div>

                    {/* Payment Method Column */}
                    <div className={"hover: hover:text-black hover:font-normal transition-all duration-300 px-2 py-1 text-xs font-mono text-slate-500 text-center"}>
                        {order?.payment?.method?.toUpperCase() || "N/A"}
                    </div>

                    {/* Process Column */}
                    <div className={"hover: hover:text-black hover:font-normal transition-all duration-300 px-2 py-1 text-xs font-mono text-slate-500 text-center"}>
                        {order?.status}
                    </div>

                    {/* Action Column */}
                    <div className={"hover: hover:text-black hover:font-normal transition-all duration-300 px-2 py-1 text-xs font-mono text-slate-500 text-end"}>
                        <button
                            className={"text-blue-600 hover:text-blue-800 transition-all"}
                            onClick={() => console.log(`See details for ${order._id}`)}
                        >
                            See Detail
                        </button>
                    </div>
                </div>
            ))}
        </div>

    </div>;
}