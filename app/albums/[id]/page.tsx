import AlbumDetail from "@/app/components/albums/AlbumDetail";
export default function Page({params}:{params:{id:String}}) {
    return(<AlbumDetail albumId={params.id}/>);
}