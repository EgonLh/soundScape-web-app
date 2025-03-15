import RecentOrders from "@/app/components/userDashboard/OrderInfo";
import FAQAccordion from "@/app/components/userDashboard/CardInfo";
import SubscribeForm from "@/app/components/userDashboard/marketingSession";

export function UserDashboard(props: { data: any }) {
    return (<div className={"  grid lg:grid-cols-2 grid-cols-1 gap-5 my-4 mx-2"}>
        <RecentOrders userId={props?.data?._id}/>
        <div className={" rounded  w-full order-first"}>
                <UserInformation data={props.data} />
        </div>
        <SubscribeForm/>
        <FAQAccordion/>
    </div>);
}


import { Mail, Phone, CreditCard, Plus, Trash2 } from "lucide-react"

const UserInformation = ({ data }) => {
    return (
        <div className="flex justify-center  w-full">
            <div className="w-full overflow-hidden rounded bg-white border  hover:shadow-sm transition-all duration-300">
                {/* Header with profile image */}
                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-red-600">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
                        <div className="h-32 w-32 overflow-hidden rounded border-4 border-white bg-white shadow-md">
                            <img
                                src={data?.profileUrl || "/placeholder.svg?height=96&width=96"}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* User details */}
                <div className="mt-14 px-6 pb-6">
                    {/* Name and username */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-800">
                            {data?.name?.firstName} {data?.name?.lastName}
                        </h2>
                        <p className="text-sm text-gray-500">@{data?.username}</p>
                    </div>

                    {/* Information sections */}
                    <div className="mt-6 space-y-4">
                        {/* Contact information */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-2 font-medium text-gray-700">Contact Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>{data?.contact?.email || "No email provided"}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>{data?.contact?.phoneNo || "No phone provided"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Billing information */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-3 font-medium text-gray-700">Billing Information</h3>
                            {data?.billInfo ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center rounded-md bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                                        <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                                        <span className="font-medium">{data.billInfo}</span>
                                    </div>
                                    <button className="flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                                        <Trash2 className="mr-1 h-4 w-4" />
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center rounded-md bg-white px-3 py-2 text-sm text-gray-400 shadow-sm">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>No payment method</span>
                                    </div>
                                    <button className="flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                                        <Plus className="mr-1 h-4 w-4" />
                                        Add Card
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

