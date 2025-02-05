"use client"
import * as React from "react"

import {AlbumFiter} from "@/app/components/albums/AlbumShowCase";
import {useRouter} from "next/navigation";
export default function Services() {

    return (
        <div className={"w-100 md:flex justify-between   md:flex-row flex-col  my-64 rounded  shadow-slate-900/[0.2] overflow-hidden "} id={"services"}>
            <div className={"md:w-3/5 flex flex-col justify-center items-start order-first "}>
                <div className={"  w-4/5 "}>
                    <div className={"my-5"}>
                        <span
                            className="inline-flex me-2  hover:bg-black transition-all duration-300 ease-in-out hover:text-white items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">Discover</span>
                        <span
                            className="inline-flex me-2  hover:bg-red-900 transition-all duration-300 ease-in-out hover:text-white items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Trade</span>
                        <span
                            className="inline-flex me-2  hover:bg-yellow-300 transition-all duration-300 ease-in-out hover:text-white items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">Support</span>
                    </div>
                    <div className={"my-5"}>
                        <div className={"text-3xl font-bold font-mono"}>Services.</div>
                        <div className={"text-xs text-black/[0.5] hover:text-black/[0.9] transition-all duration-300 font-semibold text-justify leading-6"}>
                            Step into the world of music magic at Vinyl Vibes, where melodies and memories collide. Whether you're a die-hard vinyl enthusiast, a casual collector, or simply someone who loves the art of music, we have something special for you
                        </div>
                    </div>
                    <div className={"my-5 flex justify-center"}>
                        <div className={"w-4/5  bg-slate-200 flex justify-center items-center border shadow-sm border-slate-200 hover:border-slate-300  rounded-md overflow-hidden"}>
                            <input className={"border w-5/6 bg-gray-200 outline-none border-none text-xs p-2"} placeholder={"Enter Your Email"}/>
                            <button className={"border w-1/6  bg-gray-200 rounded text-xs hover:bg-black hover:text-white font-mono h-full sm:w-1/5 py-2 transition-all duration-200 "}>Sign</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={"w-2/5  h-[400px] "}>
                <img src={"https://i.pinimg.com/originals/78/cb/b6/78cbb63ddda425fce2ae7f0fed9ed996.gif"} className={"w-full h-full rounded shadow"}/>
            </div>

        </div>
    )
}


export function AlbumListByGenre() {
    const router = useRouter();
    const GoAlbums = () => {
        router.push(`/albums`)
    }
    return (<div className={"my-64"}>
        <div className={"  w-full "}>
            <div className={"text-3xl font-bold font-mono my-3"}>Explore Here.</div>
            <div className={"text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all duration-300"}>Click The Provided Label and Explore Your Favourite Album</div>
        </div>
        <div className={"my-3"}>
            <AlbumFiter/>
        </div>
        <div className={"text-end my-5"}>
            <button className={"px-2 py-1 bg-black/[0.3] text-sm font-semibold border transition-all ease-in-out duration-400 hover:px-5 hover:font-semibold hover:bg-black text-white rounded-md"} onClick={GoAlbums}>See More</button>
        </div>
    </div>)

}