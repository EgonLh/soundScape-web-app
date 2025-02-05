import type { Metadata } from "next";
import Home from "@/app/components/home/Home";

export default function IndexPage() {
  return <Home />;
}

export const metadata: Metadata = {
  title: "Soundscape",
};
