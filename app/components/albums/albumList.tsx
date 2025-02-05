"use client"
import {useGetAlbumsQuery,useGetAlbumByFilterQuery} from "@/lib/features/albums/albumAPISlice";
import {useRouter} from "next/navigation";
import { usePathname } from 'next/navigation'
import {AlbumCard} from "@/app/components/albums/AlbumCard";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import {TrashIcon,ArrowDownIcon} from '@heroicons/react/24/outline'
function EmptyCase() {
    return <div className={"w-full text-center py-20 my-20 h-fit"}>
        <div className={"text-3xl text-slate-300"}>There is No Album with This Name</div>

    </div>;
}

export default function AlbumList() {
    const [submittedValue, setSubmittedValue] = useState(null);
    console.log("Reset Or Not:",submittedValue)
    const handleFormSubmit = (value) => {
        setSubmittedValue(value);
    };

    const SetNull = () => {
        console.log("set null");
        setSubmittedValue(null);
    }

    console.log(submittedValue)

    if(submittedValue==null) {
        console.log("Loading all")
        var {data, isLoading, isError, isSuccess, refetch} = useGetAlbumsQuery();
    }else {
        console.log("Loading one")

        var {data,isLoading,isError,isSuccess,refetch} = useGetAlbumByFilterQuery(submittedValue);
    }
    const router = useRouter();
    const path = usePathname();
    console.log("Data:",data)
    if(isLoading){
        return  <div>
            Is Loading.....
        </div>
    }else if(isError){
        return <div>
            Is Error ......
        </div>
    }

    const goCard =()=>{
        router.push('/cart');
    }
    const setOrder=()=>{
        console.log(setOrder)
    }

    return (<div className={"container"}>
        <div className={"w-full overflow-hidden flex justify-between items-center  rounded transition-all duration-300 rounded "}>
            <SimpleForm onSubmitValue={handleFormSubmit}/>
            <div>
                <button
                    type="button"
                    className="transition-all duration-300 font-semibold hover:text-white p-2 rounded-md hover:bg-black  text-xs transition"
                >
                    <TrashIcon className={"size-4 text-slate-300 hover:text-white"} onClick={SetNull}/>
                </button>
                <button
                    type="button"
                    className="transition-all duration-300 font-semibold hover:text-white p-2 rounded-md hover:bg-black  text-xs transition"
                >
                    <ArrowDownIcon className={"size-4 text-slate-300 hover:text-white"} onClick={setOrder}/>
                </button>
            </div>
        </div>

        {data.length!==0?<div className={"grid lg:grid-cols-4 grid-cols-2 gap-10 my-4 min-h-96"}>{data.map(album => <AlbumCard
            key={album._id} a={album} pathCheck={path}/>)}</div>:<EmptyCase/>}
    </div>)
}



const SimpleForm = ({onSubmitValue}) => {
    const initialValues = { inputValue: '' };
    const validationSchema = Yup.object({
        inputValue: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        onSubmitValue(values.inputValue);
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="min-w-96">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full space-x-2">
                        <div className={"flex bg-white rounded-md overflow-hidden"}>
                            <div className="relative w-full">
                                <Field
                                    id="inputValue"
                                    name="inputValue"
                                    type="text"
                                    placeholder="Enter Artist Or Album"
                                    className="w-full  p-2  outline-none text-xs shadow-sm "
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="transition-all duration-300 font-semibold hover:text-white px-3 rounded-md hover:bg-black  text-xs transition"
                            >
                                {isSubmitting ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                       <div className={"text-center"}>
                           <ErrorMessage
                               name="inputValue"
                               component="div"
                               className="text-red-500 text-xs mt-1 "
                           />
                       </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


