"use client"
import BlurText from "@/app/components/TextAnimations/BlurText/BlurText";
import React from "react";

export default function Hero() {
    return (<div className={""}>
        <div className={"my-40  w-full container "}>
            <div className={"flex flex-col justify-center items-center "}>
                <div className={"transition-all ease-in-out duration-500 my-4 w-fit p-2 text-xs rounded shadow-sm border hover:shadow-none hover:p-3 font-semibold text-zinc-500 hover:text-zinc-100 hover:rounded-lg bg-zinc-100 text-center hover:bg-black "}>
                    Authentic Records and Music.
                </div>

                <div className={"hover:drop-shadow-xl   transition-all duration-500 delay-300"}>
                    <BlurText
                        text="Explore Authentic records."
                        delay={400}
                        animateBy="words"
                        direction="top"
                        className="md:text-6xl text-3xl font-bold mb-8 hover:text-fuchsia-900 transition-colors duration-300 ease-in-out "
                    />
                </div>

                <div className={" my-300 text-sm transition-all duration-300 flex hover:drop-shadow-lg justify-center font-semibold text-slate-500 hover:text-slate-900 "}>
                    Explore Your Favourite Albums and Order with a affordable price!
                </div>
                <div className={"text-center"}>
                    <button className={"bg-black/[0.7] transition-all text-xs font-mono hover:font-bold hover:p-3 hover:shadow-lg shadow-md duration-300 ease-in-out shadow-zinc-200 text-white m-3 mx-1 p-2 rounded  hover:bg-black"} title={"Click To Explore"}>
                        Learn More
                    </button>
                    <button className={"bg-black/[0.7] transition-all text-xs  font-mono hover:font-bold hover:p-3 hover:shadow-lg shadow-md duration-300 ease-in-out shadow-zinc-200 text-white m-3 mx-1 p-2 rounded   hover:bg-black"} title={"Click To Sign in"}>
                        Get In Touch
                    </button>
                </div>


            </div>
        </div>
    </div>)
}
