import {albumAPISlice, Meta_data} from "@/lib/features/albums/albumAPISlice";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const BackEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export interface Order {
    _id: ObjectId;
    userId: ObjectId;
    albumId: ObjectId[];
    ordered_date: string; // Consider using Date type if handling as a real Date object
    amount: number;
    fees: Decimal;
    payment: Payment;
    metadata: Meta_data;
    __v: number;
}

interface ObjectId {
    $oid: string;
}

interface Decimal {
    $numberDecimal: string;
}

interface Payment {
    method: string;
    pin: string; // Hashed PIN for security
    _id: ObjectId;
}


export const OrderApiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl: BackEND_URL}),
    reducerPath: "OrderAPI",
    tagTypes:["ORDERS"],
    endpoints: (build) => ({
        getAllOrders: build.query<Order[]>({
            query: () => `/orders`,
            providesTags: () => ["ORDERS"],
        }),
        getOrdersByUsrId: build.query<Order[]>({
            query: (id) => `/orders/user/${id}`,
            providesTags: () => ["ORDERS"],
        }),
    })
})


export const {useGetAllOrdersQuery,useGetOrdersByUsrIdQuery} = OrderApiSlice;
