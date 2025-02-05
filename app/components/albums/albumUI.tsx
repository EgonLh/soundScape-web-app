// "use client"
// import {Album} from "@/lib/features/albums/albumAPISlice";
// import {useRouter} from "next/navigation";
// import {useAppDispatch} from "@/lib/hooks";
// import {addToCart,removeFromCart} from "@/lib/features/carts/CartSlice";
// import ShowCart from "@/app/components/carts/CartAll";
// export default function Album({album}:{album:Album} )
// {
//         const dispatch = useAppDispatch();
//         const router = useRouter();
//         const btnGoDetailHandler = () => {router.push(`/albums/${album._id}`)};
//         const addToCarthandler = () =>{
//                 console.log("Add To Cart");
//                 dispatch(addToCart(album._id));
//         }
//         const RemoveFromCart = () => {
//                 console.log("Remove From Cart")
//                 dispatch(removeFromCart(album._id));
//         }
//         return <div style={{border:"1px solid black",padding:"10px"}} key={album._id}>{album.title}
//         <button onClick={btnGoDetailHandler} type={"button"}>Check Detail</button>
//
//                 <button onClick={addToCarthandler} type={"button"}>Add To Cart</button>
//                 <button onClick={RemoveFromCart} type={"button"}>Remove From Cart</button>
//
//         </div>;
// }