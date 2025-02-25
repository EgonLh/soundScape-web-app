import React from "react";
import {ChevronLeft} from "lucide-react";


export function CardITem(props) {
    let title = props?.title;
    let icon = props?.icon;
    console.log("Props:", props.title);
    return (<div className={"border w-4/5 bg-slate-100 border m-1 rounded hover:shadow-md transition-all duration-300 p-3"}>
        <div className={"flex justify-between items-center"}>
            <div className={"w-fit bg-slate-300/[0.1] rounded-md hover:p-1 hover:bg-black transition-all duration-200 hover:text-white my-3"}>{icon}</div>
            <div className={"w-fit my-3 p-1 hover:bg-slate-700/[0.7] rounded transition-all duration-300 hover:text-white"}><ChevronLeft className={"size-3"} /></div>
        </div>
        <div className={"mt-2 text-xs text-slate-400 hover:text-black hover:text-sm transition-all duration-300"}> {title}</div>
        <div className={"font-mono font-bold"}>99+</div>
    </div>)
}