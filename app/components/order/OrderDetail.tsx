"use client"
import {useGetAllOrdersQuery,useGetOrdersByUsrIdQuery} from "@/lib/features/orders/orderApiSlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {useGetUserByRoleQuery,} from "@/lib/features/users/userApiSlice";
import {NotepadText, Search, Trash, User} from "lucide-react";
import {Any} from "@react-spring/types";
import {FormComponent} from "@/app/components/form/Forms";
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

function UserFilter(props: { onValueChange: (value: (((prevState: string) => string) | string)) => void}) {
    const {data} = useGetUserByRoleQuery('user');
    return <div className=" w-full flex  rounded   ">
        <Select onValueChange={props.onValueChange} >
            <SelectTrigger className="w-full font-mono outline-none text-xs">
                <SelectValue placeholder={"Select Users"}/>
                <div className={"mx-3"}></div>
            </SelectTrigger>
            <SelectContent>
                {data?.map((user) =>
                    <SelectItem value={user?._id} key={user?._id} >{user?.username}</SelectItem>
                )}
                <SelectItem value={"reset"} ><Trash/></SelectItem>

            </SelectContent>
        </Select>
    </div>;
}
const StatusFilter = (props:{onChange: (value: string) => void}) =>{
    return (<div className=" w-full flex  rounded   ">
        <Select onValueChange={props.onChange} >
            <SelectTrigger className="w-full font-mono outline-none text-xs">
                <SelectValue placeholder={"Select Status"}/>
                <div className={"mx-3"}></div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"OnProcess"} >OnProcess</SelectItem>
                <SelectItem value={"Done"} >Done</SelectItem>
                <SelectItem value={"Pending"} >Pending</SelectItem>
                <SelectItem value={"reset"} ><Trash className={"size-4"}/></SelectItem>
            </SelectContent>
        </Select>
    </div>)
}
export default function OrderDetail({data:any}) {
    const [filter,setFilter] = useState('');
    const  [status,setStatus] = useState('');
    const {data,isLoading} = (filter=="")||(filter=="reset")?useGetAllOrdersQuery(undefined,{refetchOnFocus:true}):useGetOrdersByUsrIdQuery(filter,{refetchOnFocus:true});

    console.log("The data:",data)
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("The Value :",status);

    const filter_order = (status=="" )|| (status == "reset")?data:data.filter(order => order.status === status)
    return (<div className={"w-full"}>
        <div className={"p-4 "}>
            <div className={"flex p-1 w-full  justify-end"}>
                <div className="flex  ">
                    <UserFilter onValueChange={setFilter} />
                    <StatusFilter onChange={value => setStatus(value)}/>
                </div>
            </div>

        </div>
        <Order orders={filter_order}/>
    </div>)
}

export const Order = ({orders}:{orders:Any})=>{
    console.log("The orders: ",orders)
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
