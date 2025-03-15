import OrderDetail from "@/app/components/order/OrderDetail";
import DashboardNav from "@/app/components/userDashboard/dashboardNav";
import {ShoppingBag} from "lucide-react";

export default function OrderContainer(){
    return <div className={"flex w-full my-12  flex-col border bg-white rounded-md "}>
        <div>
            <DashboardNav title={"Order Dashboard"} icon={<ShoppingBag/>}/>
        </div>
        <OrderDetail/>

    </div>
}