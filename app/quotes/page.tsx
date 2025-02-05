import { Quotes } from "../components/quotes/Quotes";

export default function QuotesPage() {
  return (
    <>
      <h1 className={"bg-black"}>Quotes page</h1>
      <p>This page is intended to showcase RTK Query.</p>
      <Quotes />
    </>
  );
}
