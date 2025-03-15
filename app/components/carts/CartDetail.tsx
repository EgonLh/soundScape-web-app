"use client";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addToCart, removeFromCart, selectItem} from "@/lib/features/carts/CartSlice";
import {useGetAlbumByIDQuery} from "@/lib/features/albums/albumAPISlice";
import {useRouter} from "next/navigation";
import {ArrowLongLeftIcon,ShoppingBagIcon} from '@heroicons/react/24/outline';


function ItemInCart(props: { album: any ,amount:number}) {
    const {data, isLoading, isError} = useGetAlbumByIDQuery(props.album.data);
    const dispatch = useAppDispatch();
    const addToCartHandler = () => {
        console.log("Add To Cart");
        dispatch(addToCart(data?._id));
    };
    const RemoveFromCart = () => {
        console.log("Remove From Cart");
        dispatch(removeFromCart(data?._id));
    };
    console.log(data);
    if (isLoading) {
        return <div>Loading</div>
    }
    return (<div className={"grid grid-cols-5 p-1 rounded border hover:border-0 transition-all hover:my-3 duration-300 text-xs font-mono bg-white my-2 min-h-20"}>
            <div
                className={"rounded px-3 text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 flex items-center justify-start p-1"}>
                {/* Album image shown only on lg screens and resized */}
                <div className={"hidden lg:flex"}>
                    <img src={data?.albumUrl} className={'w-16 h-16 rounded'} /> {/* Small image size */}
                </div>
                <div className={"text-center mx-2 text-start"}>
                    <div>{data?.title}</div>
                    {/* Artist name shown only on lg screens */}
                    <div className={"hidden lg:block"}>{data?.artist}</div>
                </div>
            </div>
            <div
                className={"rounded px-3 text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 text-center my-auto"}>
                {data.price.$numberDecimal}
            </div>
            <div
                className={"rounded px-3 col-span-2 text-center flex justify-center text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 my-auto"}>
                <div className={"mx-4"}>
                    <button onClick={addToCartHandler} type={"button"}>+</button>
                </div>
                <div>
                    {props.amount}
                </div>
                <div className={"mx-4"}>
                    <button onClick={RemoveFromCart} type={"button"}>-</button>
                </div>
            </div>
            <div
                className={"rounded px-3 text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 my-auto text-center"}>
                {props.amount * data.price.$numberDecimal}
            </div>
        </div>

    );
}


export default function CartDetail() {
    let items = useAppSelector(selectItem);
    const router = useRouter();

    console.log("Data : From Selector", items);
    const backToAlbum = () => {
        router.push(`/albums/`);
    };
    return (<div>
        <div className={" grid grid-cols-5  p-1 rounded  text-xs font-mono "}>

            <div
                className={" rounded px-3  text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 flex items-center justify-center p-1"}>
                Order
            </div>
            <div
                className={" rounded px-3 text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 text-center my-auto"}>
                Price
            </div>
            <div
                className={" rounded px-3 col-span-2 text-center  text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 my-auto text-center"}>
                Quantity
            </div>
            <div
                className={" rounded px-3  text-gray-400 hover:text-slate-800 transition-all duration-300 hover:px-4 my-auto text-center "}>Total
            </div>

        </div>
        {items.map(album => <ItemInCart album={album} key={album.data} amount={album.count}/>)}
        <div className={"w-full flex justify-end"}>
            <button onClick={backToAlbum}
                    className={"border my-3 mx-3 p-1 rounded shadow-amber-50 shadow-sm text-xs hover:bg-black transition-all duration-300 hover:text-white"}>
                <ArrowLongLeftIcon className={"size-4"}/>
            </button>
            <button onClick={backToAlbum}
                    className={"border my-3 p-1 rounded shadow-amber-50 shadow-sm text-xs hover:bg-black transition-all duration-300 hover:text-white"}>
                <ShoppingBagIcon className={"size-4"}/>
            </button>
        </div>
    </div>)
}