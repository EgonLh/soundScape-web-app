import React from "react";
import Hero from "@/app/components/home/Hero";
import Services,{AlbumListByGenre} from "@/app/components/home/Services";

export default function Home() {
    return <div className={"w-5/6"}>
        <Hero/>
        <AlbumListByGenre/>
        <Services/>

    </div>
}