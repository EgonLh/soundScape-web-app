"use client"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import {selectAuth} from "@/lib/features/auth/authSlice";

export default function isAuth<T>(Component:React.ComponentType<T>){
    return (props:T) => {
        const router = useRouter();
        const auth = useSelector(selectAuth);
        let login = auth;
        const pathname = usePathname();

        console.log(pathname);
        console.log("Auth is here :",auth)

        useEffect(()=>{
            if (!login) {
                router.push('/login?redirectUrl='+pathname);
            }
        },[]);
        return (
            <>
                <Component {...props!} />
            </>
        );
    }
}