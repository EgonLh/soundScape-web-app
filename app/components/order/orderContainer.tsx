import OrderDetail from "@/app/components/order/OrderDetail";
import DashboardNav from "@/app/components/userDashboard/dashboardNav";

export default function OrderContainer(){
    return <div className={"flex w-full my-4  flex-col border "}>
        <div>
            <DashboardNav/>
        </div>
        <OrderDetail/>

    </div>
}