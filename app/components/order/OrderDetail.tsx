"use client"
import {useGetAllOrdersQuery} from "@/lib/features/orders/orderApiSlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText} from "lucide-react";
import {Any} from "@react-spring/types";
import {FormComponent} from "@/app/components/form/Forms";
export default function OrderDetail({data:any}) {
    const {data,isLoading} = useGetAllOrdersQuery(undefined,{refetchOnFocus:true});
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("Order :Data ",data.length)
    return (<div className={"w-full"}>
        <Order orders={data}/>
    </div>)
}

export const Order = ({orders}:{orders:Any})=>{
    console.log(orders)
    return ( <div className="p-4  w-full rounded-md ">
        <div className=" w-full py-2 px-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  text-xs font-semibold text-gray-400 uppercase rounded-t ">
            <div className="mx-1 text-left hover:text-black transition-all duration-300">User</div>
            <div className="mx-1 text-center hidden lg:block hover:text-black transition-all duration-300">Order Date</div>
            <div className="mx-1 text-end hidden md:block hover:text-black transition-all duration-300">Status</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Fees</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Details</div>
        </div>
        {orders?.map((order) => (
            <OrderCard key={order._id} order={order}/>
        ))}
    </div>)
}

const OrderCard = ({ order }) => {
    return (
        <div className="border w-full my-3 py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300">
            {/* User Profile & Email (Hidden in sm) */}
            <div className="flex items-center justify-start mx-1 hover:px-2 transition-all duration-300 ">
                <img
                    src={order?.userId?.profileUrl}
                    className="w-12 h-12 rounded-full border me-3 hidden md:block"
                    alt="User Profile"
                />
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {order?.userId?.contact?.email}
                </div>
            </div>

            {/* Order Date (Hidden in md, visible in lg) */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden lg:flex">
                <div className="align-middle w-fit max-w-[120px] transition-all duration-300 truncate overflow-hidden whitespace-nowrap rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border hover:overflow-x-auto hover:max-w-none">
                    {order?.ordered_date}
                </div>
            </div>


            {/* Order Status */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden md:flex">
                <div className="align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border">
                    {order?.status}
                </div>
            </div>

            {/* Order Fees */}
            <div className="mx-1 flex justify-end transition-all duration-300">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {order?.fees?.$numberDecimal}
                </div>
            </div>

            {/* Order Details */}
            <div className="text-zinc-500 flex justify-end text-end mx-3">
                <Dialog>
                    <DialogTrigger>
                        <div className="hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300">
                            <NotepadText />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription asChild>
                                <div>
                                    <FormComponent data={order} />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
