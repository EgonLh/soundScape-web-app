import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/24/solid";
import {useAppDispatch} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import {addToCart, removeFromCart} from "@/lib/features/carts/CartSlice";

export function AlbumCard(props: { a: any, pathCheck: String }) {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const btnGoDetailHandler = () => {
        console.log("Work")
        router.push(`/albums/${props.a._id}`)
    }
    const addToCarthandler = () =>{
        console.log("Add To Cart");
        dispatch(addToCart(props.a._id));
    }

    let flag = props.pathCheck ? "" : "hidden";
    return <div className={"border shadow-md hover:shadow  rounded-lg overflow-hidden max-h-[300px]"}>
        <img src={props.a.albumUrl} className={"w-full h-4/5 p-1 rounded-lg"}/>
        <div className={"px-4 py-1   h-1/5  flex flex-col justify-between items-between"}>
            <div className={"flex justify-between  w-full font-semibold  text-sm  "}>
                <div
                    className={"transition-all duration-300 hover:text-black text-slate-400 rounded truncate text-xs"}>💿 {props.a.title}</div>
                <div
                    className={"transition-all duration-300 hover:text-black text-slate-400 rounded text-xs"}>$ {props.a.price.$numberDecimal}</div>
            </div>

            <div className={"flex justify-end "}>
                <div>
                    <button
                        className={"transition-all duration-300 hover:p-1  hover:bg-black hover:text-white rounded"} onClick={btnGoDetailHandler}>
                        <MagnifyingGlassIcon className={"size-4 font-bold"}/>
                    </button>
                </div>
                <div className={flag}>
                    <button
                        className={"transition-all ms-4 duration-300 hover:p-1  hover:bg-black hover:text-white rounded"} type={"button"} onClick={addToCarthandler}>
                        <ShoppingCartIcon className={"size-4 font-bold"}/>
                    </button>
                </div>
            </div>


        </div>
    </div>;
}