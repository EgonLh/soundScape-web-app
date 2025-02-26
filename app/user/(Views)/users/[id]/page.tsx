import {RequestFormComponent} from "@/app/components/form/Forms";

export default function Page({params}:{params:{id:String}}) {
    return(<RequestFormComponent user_id={params.id}/>);
}