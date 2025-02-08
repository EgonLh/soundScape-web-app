"use client"
import UserDashBoardContainer from "@/app/components/userDashboard/userContainer";
import BlurText from "@/app/components/TextAnimations/BlurText/BlurText";
import React from "react";

export default function UserDashboard(){
    return(<div className={"container w-5/6   border"}>
        <UserDashBoardContainer/>
    </div>)
}