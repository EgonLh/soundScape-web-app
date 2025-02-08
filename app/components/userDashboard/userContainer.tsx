import {SidebarProvider, SidebarTrigger} from "@/app/components/ui/sidebar";
import {selectAuth,authSlice,login} from "@/lib/features/auth/authSlice";
import {useGetUserInfoQuery} from "@/lib/features/auth/authApi";
import {useAppSelector} from "@/lib/hooks";
import jwt from "jsonwebtoken";

export default function UserDashBoardContainer(){
    const auth = useAppSelector(selectAuth);
    console.log("Got auth :",auth)
    const usr_data = (jwt.decode(auth))?.id;
    console.log("The Decoded Data:",usr_data);

    const {data} = useGetUserInfoQuery(usr_data);
    console.log("USer Info Obtained :",data)

    return(<div className={"bg-slate-300 w-full my-3 px-5"}>
        <div className={"bg-slate-200 border my-3 flex justify-between items-center "}>
            <div>Profile</div>
            <div><SidebarTrigger/></div>
        </div>
        <div className={" border grid grid-cols-2 gap-5"}>
            <div className={"bg-slate-200 border"}>
                Main Dash
            </div>
            <div className={"bg-slate-200 border"}>
                Activities
            </div>
        </div>


    </div>)
}