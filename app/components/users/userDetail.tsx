"use client"
import {useGetAllUsersQuery} from "@/lib/features/users/userApiSlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText} from "lucide-react";
import {Any} from "@react-spring/types";
import FormComponent from "@/app/components/form/Forms";
export default function UserDetail({data:any}) {
    console.log(useGetAllUsersQuery)
    const {data,isLoading} = useGetAllUsersQuery();
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("User :Data ",data)
    return (<div className={"w-full"}>
        <User users={data}/>
    </div>)
}

export const User = ({users}:{users:Any})=>{
    console.log(users)
    return ( <div className="p-4  w-full rounded-md border">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        {users?.map((user) => (
            <div className={"border w-full my-3 py-4 grid grid-cols-5 flex items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300"} key={user._id}>
                <div className={"flex items-center justify-start 2/8  mx-1 flex justify-start hover:px-2  transition-all duration-300"}>
                    <img src={user.profileUrl} className={"max-w-12 rounded-md border me-3"}/>
                    <div className={" align-middle w-fit rounded  text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{user?.contact?.email}</div>
                </div>
                <div className={"  mx-1 flex justify-end transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{user?.username}</div>
                </div>
                <div className={"  mx-1 flex justify-end   transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border"}>{user?.contact.phoneNo}</div>
                </div>
                <div className={"  mx-1 flex justify-end  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{user?.billInfo}</div>
                </div>

                <div className={" text-zinc-500 flex justify-end text-end mx-3"}>

                    <Dialog>
                        <DialogTrigger><div className={"hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300"}><NotepadText/></div> </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    {/*<p> <FormComponent data={order} /></p>*/}
                                    <p>Just Kidding</p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        ))}
    </div>)
}

