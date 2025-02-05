// import {useAppSelector} from "@/lib/hooks";
// import {selectItem} from "@/lib/features/carts/CartSlice";
//
// export default function ShowCart() {
//     const itemsCount = useAppSelector(selectItem);
//     console.log("Item:IN Card " ,itemsCount)
//     return (<div>
//         {itemsCount?.map(item=><div key={item.data + item.count}>{item.data}</div>)}
//
//     </div>)
// }