import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "sonner";
import {Edit2, FolderArchive, SendHorizontalIcon, Trash} from "lucide-react"

const FormComponent = ({data}: { data: Any }) => {
    console.log("data for form ", data.metadata);
    const [mode, setEdit] = useState(true);
    console.log(mode);

    const handleEdit = () => {
        setEdit(!mode);
        let msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);

    };


    return (
        <Formik
            initialValues={{
                name: data?.userId?.username,
                email: data?.userId?.contact?.email,
                payment: data?.payment.method,
                amount: data?.amount,
                fees: data?.fees?.$numberDecimal,
                current_status: data?.status,
                ordered_date: data?.metadata?.createdAt
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),

            })}
            onSubmit={(values, {setSubmitting}) => {
                console.log("Form Submitted", values);
                setSubmitting(false);
            }}
        >
            {({isSubmitting}) => (
                <Form className="p-4  ">
                    <div className={"my-3"}>
                        <label className="block font-medium">Name:</label>
                        <Field type="text" name="name" className={`border p-2 w-full rounded `} disabled={true}/>
                        <ErrorMessage name="name" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Ordered Album</label>
                        <div className={" border rounded p-1 cursor-no-drop"}>
                            {data?.albumId?.map(album => (
                                <button key={album._id}
                                        className={"border bg-zinc-300/[0.5] me-1 p-1 rounded font-mono cursor-no-drop"}>{album.title}</button>

                            ))}
                        </div>
                    </div>

                    <div className={"my-3"}>
                        <label className="block font-medium">Email:</label>
                        <Field type="email" name="email" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="email" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Amount:</label>
                        <Field type="number" name="amount" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="amount" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Payment Method:</label>
                        <Field type="text" name="payment" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="payment" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Fees:</label>
                        <Field type="number" name="fees" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="fees" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Ordered Date:</label>
                        <Field type="text" name="ordered_date" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="ordered_date" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Status:</label>
                        <Field as="select" name="current_status" className="border p-2 w-full rounded" disabled={mode}>
                            <option value="">Select a category</option>
                            <option value="Pending">Pending</option>
                            <option value="OnProcess">OnProcess</option>
                            <option value="Done">Done</option>
                        </Field>
                        <ErrorMessage name="current_status" component="div" className="text-red-500"/>
                    </div>


                    <div className={"my-5 flex justify-between items-center "}>
                        <button
                            type="submit"
                            className=" bg-black text-white p-1 rounded flex justify-center items-center"
                            disabled={isSubmitting}
                        >
                            <SendHorizontalIcon/>
                        </button>
                        <div className={"flex justify-center items-center"}>
                            <button
                                type={"button"}
                                className=" bg-black text-white  hover:text-white/[0.8] text-white p-1 rounded "
                                onClick={handleEdit}
                            >
                                {mode ? <Edit2/> : <FolderArchive/>}
                            </button>
                            <button

                                className=" ms-3 bg-black text-white hover:text-white/[0.8] text-white p-1 rounded "
                                onClick={handleEdit}
                            >
                                <Trash/>
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;
