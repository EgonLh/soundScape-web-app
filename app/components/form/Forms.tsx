"use client";
import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "sonner";
import {Edit2, FolderArchive, SendHorizontalIcon, Trash} from "lucide-react"
import {useGetUserInfoQuery} from "@/lib/features/auth/authApi";
import {useGetAllUsersQuery,useUpdateUserMutation,useDeleteUserMutation} from "@/lib/features/users/userApiSlice";
import {SendThisShit} from "@/app/components/mailder/srAction";
import {useUpdateOrderMutation, useDeleteOrderMutation,useDeleteOrderByUserIDMutation } from "@/lib/features/orders/orderApiSlice";
//Order Form
export const FormComponent = ({data}: { data: Any }) => {

    const [updateOrder,result] = useUpdateOrderMutation();
    const [deleteOrder,test] = useDeleteOrderMutation();


    // Delete order
    const handleDeleteOrder = async () => {
        event.preventDefault()
        console.log("handle Delete Invoked",data._id);
        deleteOrder(data._id);
    };
    // console.log("data for form ", data.metadata);
    const [mode, setEdit] = useState(true);
    // console.log(mode);

    const handleEdit = () => {
        setEdit(!mode);
        let msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);

    };
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log("Form Submitted, Order ID:", data._id);
            console.log("The Values:", values.current_status);
            const updateStatus = {
                status: values.current_status,
                metadata: {
                    updatedAt: new Date().toLocaleDateString("en-US")// Store timestamp in ISO format
                }
            };
            if (!data._id) {
                console.error("Error: Order ID is missing!");
                setSubmitting(false);
                return;
            }

            const result = await updateOrder({ orderId: data._id,orderInfo:updateStatus});

            console.log("The result:", result);
            toast.success("Order updated successfully");

        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setSubmitting(false);
        }
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
            onSubmit={handleSubmit}
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
                                type="button"
                                className=" ms-3 bg-black text-white hover:text-white/[0.8] text-white p-1 rounded "
                                onClick={handleDeleteOrder}
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

//User Form
export const UserFormComponent = ({data}: { data: Any }) => {
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [deleteOrderByUser] = useDeleteOrderByUserIDMutation();
    const [mode, setEdit] = useState(true);
    const handleEdit = () => {
        setEdit(!mode);
        let msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);
    };
    const handleDeleteOrder = async () => {
        event.preventDefault()
        console.log("handle Delete Invoked",data._id);
        deleteUser(data._id);
        deleteOrderByUser(data._id);
        console.log("success")
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log("Form Submitted, Order ID:", data._id);
            console.log("The Values:", values.role);
            const updateUserInfo = {
                username: values.username,
                name: {
                    firstName: values.fname,
                    lastName: values.lname,
                },
                contact: {
                    email: values.email,
                    phoneNo: values.phone,
                },
                role: values.role,
                profileUrl: values.profile,
                billInfo: values.billing,
                metadata: {
                    updatedAt: new Date().toLocaleDateString("en-US") // Store timestamp in ISO format
                }
            };
            if (!data._id) {
                console.error("Error: Order ID is missing!");
                setSubmitting(false);
                return;
            }
            console.log("The updated Value",updateUserInfo)
            const result = await updateUser({ userId: data._id,userInfo:updateUserInfo});

            console.log("The result:", result);
            toast.success("Users updated successfully");

        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Formik
            initialValues={{
                profile: data?.profileUrl,
                fname: data?.name?.firstName,
                lname: data?.name?.lastName,
                username: data?.username,
                email: data?.contact?.email,
                phone: data?.contact?.phoneNo,
                billing: data?.billInfo,
                role: data?.role,
                createdAt: data?.metadata?.createdAt,
                updatedAt: data?.metadata?.updatedAt
            }}
            validationSchema={Yup.object({
                fname: Yup.string().required("Name is required"),
                lname: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),

            })}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="p-4  ">
                    <div className={"my-3"}>
                        <label className="block font-medium">Profile Url:</label>
                        <Field type="text" name="profile" className="border p-2 w-full rounded" disabled={mode}/>
                        <ErrorMessage name="profile" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Name:</label>
                        <div className={"flex justify-between"}>
                            <Field type="text" name="fname" className={`border p-2 w-full rounded `} disabled={mode}/>
                            <Field type="text" name="lname" className={`border p-2 w-full rounded `} disabled={mode}/>
                        </div>

                        <ErrorMessage name="fname" component="div" className="text-red-500"/>
                        <ErrorMessage name="lname" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Username:</label>
                        <Field type="text" name="username" className="border p-2 w-full rounded" disabled={mode}/>
                        <ErrorMessage name="username" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Email:</label>
                        <Field type="email" name="email" className="border p-2 w-full rounded" disabled={mode}/>
                        <ErrorMessage name="email" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Phone:</label>
                        <Field type="phone" name="phone" className="border p-2 w-full rounded" disabled={mode}/>
                        <ErrorMessage name="phone" component="div" className="text-red-500"/>
                    </div>

                    <div>
                        <label className="block font-medium">billing:</label>
                        <Field type="text" name="billing" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="billing" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">role:</label>
                        <Field as="select" name="role" className="border p-2 w-full rounded" disabled={mode}>
                            <option value="">Select a Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Field>
                        <ErrorMessage name="current_status" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">Metadata:</label>
                        <div className={"flex justify-between"}>
                            <Field type="text" name="createdAt" className={`border p-2 w-full rounded `}
                                   disabled={true}/>
                            <Field type="text" name="updatedAt" className={`border p-2 w-full rounded `}
                                   disabled={true}/>
                        </div>
                        <ErrorMessage name="createdAt" component="div" className="text-red-500"/>
                        <ErrorMessage name="createdAt" component="div" className="text-red-500"/>
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
                                type={"button"}
                                onClick={handleDeleteOrder}
                                className=" ms-3 bg-black text-white hover:text-white/[0.8] text-white p-1 rounded "
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

//Product Form
export const ProductFormComponent = ({data}: { data: Any }) => {
    const [mode, setEdit] = useState(true);
    const handleEdit = () => {
        setEdit(!mode);
        let msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);
    };
    console.log("Song form data:", data);
    data?.songs.map(a => {
        console.log("Songs :", a);
    });
    return (
        <Formik
            initialValues={{
                albumUrl: data?.albumUrl,
                title: data?.title,
                artist: data?.artist,
                genre: data?.genreId,
                releasedDate: data?.releasedDate,
                description: data?.description,
                song: data?.songs,
                price: data?.price.$numberDecimal,
                createdAt: data?.metadata?.createdAt,
                updatedAt: data?.metadata?.updatedAt
            }}
            validationSchema={Yup.object({
                fname: Yup.string().required("Name is required"),
                lname: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),

            })}
            onSubmit={(values, {setSubmitting}) => {
                console.log("Form Submitted", values);
                setSubmitting(false);
            }}
        >
            {({isSubmitting}) => (
                <Form className="p-4">
                    <div className={"my-3"}>
                        <label className="block font-medium">albumUrl Url:</label>
                        <Field type="text" name="albumUrl" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="albumUrl" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">title:</label>
                        <Field type="text" name="title" className={`border p-2 w-full rounded `} disabled={true}/>
                        <ErrorMessage name="title" component="div" className="text-red-500"/>
                    </div>
                    <div className={"my-3"}>
                        <label className="block font-medium">artist:</label>
                        <Field type="text" name="artist" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="artist" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">song:</label>
                        <Field as="select" name="song" className="border p-2 w-full rounded" disabled={mode}>
                            <option value={''} selected>Songs in The Ablbums</option>
                            {data?.songs.map(a => (
                                <option value={a}>{a}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="current_status" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">Genre:late to updated</label>
                        <Field type="text" name="genre" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="genre" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">releasedDate</label>
                        <Field type="text" name="releasedDate" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="releasedDate" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">description</label>
                        <Field type="textArea" name="description" className="border p-2 w-full rounded"
                               disabled={true}/>
                        <ErrorMessage name="description" component="div" className="text-red-500"/>
                    </div>
                    <div>
                        <label className="block font-medium">price</label>
                        <Field type="number" name="price" className="border p-2 w-full rounded" disabled={true}/>
                        <ErrorMessage name="price" component="div" className="text-red-500"/>
                    </div>

                    <div className={"my-3"}>
                        <label className="block font-medium">Metadata:</label>
                        <div className={"flex justify-between"}>
                            <Field type="text" name="createdAt" className={`border p-2 w-full rounded `}
                                   disabled={true}/>
                            <Field type="text" name="updatedAt" className={`border p-2 w-full rounded `}
                                   disabled={true}/>
                        </div>
                        <ErrorMessage name="createdAt" component="div" className="text-red-500"/>
                        <ErrorMessage name="createdAt" component="div" className="text-red-500"/>
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

//Email Form
export const RequestFormComponent = ({user_id}:{any}) => {
    console.log("Id",user_id)
    const {data,isLoading} = user_id == 'request'?useGetAllUsersQuery():useGetUserInfoQuery(user_id);
    let email;
   if(user_id == "request"){
       email= data;
   }else{
       email = data?.contact.email;
   }

    if(isLoading){
        return  (<div>
            is Loading
        </div>)
    }

    console.log("data",data)
    return (<Formik
        initialValues={{
            user_email: email,
            topic: "",
            message: "",
        }}
        validationSchema={Yup.object({
            topic: Yup.string().required("Topic is required"),
            message: Yup.string().required("message is required"),


        })}
        onSubmit={(values, {setSubmitting}) => {

            //Need to clean some error
            console.log("Values :",values);
            SendThisShit(values).catch(e=>{
                console.log(e)
            }).then(console.log("From Shit."))
            console.log("Form Submitted", values);
            setSubmitting(false);
            setValues({user_email:""});
        }}
    >
        {({isSubmitting}) => (
            <Form className="p-4">
                <div className={"my-3"}>
                    <label className="block font-medium">Email:</label>
                    {Array.isArray(data)?(
                           <span>
                                <Field as="select" name="user_email" className="border p-2 w-full rounded">
                                <option value="empty" >Select an email</option>
                                    {data.map(user => (
                                        <option value={user?.contact?.email}>
                                            {user?.contact?.email}
                                        </option>
                                    ))}
                            </Field>
                        <ErrorMessage name="user_email" component="div" className="text-red-500"/>
                           </span>
                    ):(
                        <Field type="text" name='user_email' className="border p-2 w-full rounded" />
                        )
                    }

                </div>

                <div>
                    <label className="block font-medium">Topic:</label>
                    <Field type="text" name="topic" className="border p-2 w-full rounded"  />
                    <ErrorMessage name="topic" component="div" className="text-red-500"/>
                </div>
                <div>
                    <label className="block font-medium">Message:</label>
                    <Field type="text" name="message" className="border p-2 w-full rounded" />
                        <ErrorMessage name="message" component="div" className="text-red-500"/>
                </div>

                <div className={"my-5 flex justify-between items-center "}>
                    <button
                        type="submit"
                        className=" bg-black text-white p-1 rounded flex justify-center items-center"
                        disabled={isSubmitting}
                    >
                        <SendHorizontalIcon/>
                    </button>
                </div>
            </Form>
            )}
            </Formik>)
            };


export const GenreFormComponent = ({ data }) => {
    const [mode, setEdit] = useState(true);

    const handleEdit = () => {
        setEdit(!mode);
        let msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);
    };

    console.log("Genre form data:", data);

    return (
        <Formik
            initialValues={{
                description: data?.description,
                genre: data?.genre,
                createdAt: data?.metadata?.createdAt,
                updatedAt: data?.metadata?.updatedAt,
            }}
            validationSchema={Yup.object({
                description: Yup.string().required("Description is required"),
                genre: Yup.string().required("Genre is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                console.log("Form Submitted", values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="p-4">
                    {/* Description */}
                    <div className={"my-3"}>
                        <label className="block font-medium">Description:</label>
                        <Field
                            as="textarea"
                            name="description"
                            className="border p-2 w-full rounded"
                            disabled={mode}
                            rows={4}  // Adjust the height of the textarea
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>

                    {/* Genre */}
                    <div className={"my-3"}>
                        <label className="block font-medium">Genre:</label>
                        <Field
                            type="text"
                            name="genre"
                            className="border p-2 w-full rounded"
                            disabled={mode}
                        />
                        <ErrorMessage name="genre" component="div" className="text-red-500" />
                    </div>

                    {/* Created At */}
                    <div className={"my-3"}>
                        <label className="block font-medium">Created At:</label>
                        <Field
                            type="text"
                            name="createdAt"
                            className="border p-2 w-full rounded"
                            disabled={true}
                        />
                        <ErrorMessage name="createdAt" component="div" className="text-red-500" />
                    </div>

                    {/* Updated At */}
                    <div className={"my-3"}>
                        <label className="block font-medium">Updated At:</label>
                        <Field
                            type="text"
                            name="updatedAt"
                            className="border p-2 w-full rounded"
                            disabled={true}
                        />
                        <ErrorMessage name="updatedAt" component="div" className="text-red-500" />
                    </div>

                    {/* Action Buttons */}
                    <div className={"my-5 flex justify-between items-center "}>
                        <button
                            type="submit"
                            className="bg-black text-white p-1 rounded flex justify-center items-center"
                            disabled={isSubmitting}
                        >
                            <SendHorizontalIcon />
                        </button>

                        <div className={"flex justify-center items-center"}>
                            <button
                                type={"button"}
                                className="bg-black text-white hover:text-white/[0.8] text-white p-1 rounded"
                                onClick={handleEdit}
                            >
                                {mode ? <Edit2 /> : <FolderArchive />}
                            </button>
                            <button
                                className="ms-3 bg-black text-white hover:text-white/[0.8] text-white p-1 rounded"
                                onClick={handleEdit}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};