'use client';
import CartContainer from "@/app/components/carts/CartContainer";
import isAuth from "@/app/components/Auth/isAuth";
function CartList() {
    return (<div className={"container flex justify-center"}>
        <CartContainer/>
    </div>)
}

export default isAuth(CartList);