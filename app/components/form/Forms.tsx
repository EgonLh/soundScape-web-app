"use client";
import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "sonner";
import {Edit2, FolderArchive, SendHorizontalIcon, Trash} from "lucide-react"
import {useGetUserInfoQuery} from "@/lib/features/auth/authApi";
import {useGetAllUsersQuery,useUpdateUserMutation,useDeleteUserMutation} from "@/lib/features/users/userApiSlice";
import {useDeleteAlbumMutation,useUpdateAlbumMutation,useCreateAlbumMutation} from "@/lib/features/albums/albumAPISlice";
import {SendThisShit} from "@/app/components/mailder/srAction";
import {useUpdateOrderMutation, useDeleteOrderMutation,useDeleteOrderByUserIDMutation } from "@/lib/features/orders/orderApiSlice";
import {useGetAllGenresQuery} from "@/lib/features/genres/genreAPISlice";
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
    const [mode, setEdit] = useState(true);

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
                    createdAt:values.createdAt,
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
export const AlbumFormComponent = ({ data }: { data?: any }) => {
    const [mode, setEdit] = useState(true);
    const  [updateAlbum] = useUpdateAlbumMutation();
    const [deleteAlbum] = useDeleteAlbumMutation();
    const handleEdit = () => {
        setEdit(!mode);
        const msg = mode ? "Enabled" : "Disabled";
        toast(`Edit mode has been successfully ${msg}`);
    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (val: boolean) => void }) => {
        try {
            let submitted_values = {
                "title" :values?.title,
                "albumUrl":values?.albumUrl,
                "artist":values?.artist,
                "description":values?.description,
                "price":values?.price,
                "status":values?.status,
                "metadata": {
                    "createdAt":values.createdAt,
                    "updatedAt": new Date().toLocaleDateString("en-US") // Store timestamp in ISO format
                }
            }

            console.log("the final values :",submitted_values)
            const updated_Data = updateAlbum({id:data?._id,updatedAlbum:submitted_values});
            console.log("updatedDate",updated_Data)
            toast.success("Album updated successfully");
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                albumUrl: data?.albumUrl || "",
                title: data?.title || "",
                artist: data?.artist || "",
                genre: data?.genreId || "",
                releasedDate: data?.releaseDate || "",
                description: data?.description || "",
                price: data?.price?.$numberDecimal || 0,
                createdAt: data?.metadata?.createdAt || "",
                updatedAt: data?.metadata?.updatedAt || "",
                song: ""
            }}
            validationSchema={Yup.object({
                albumUrl: Yup.string().required("Album URL is required"),
                title: Yup.string().required("Title is required"),
                artist: Yup.string().required("Artist is required"),
                price: Yup.number().required("Price is required"),
                description: Yup.string().required("Description is required")
            })}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="p-4">
                    <div className="my-3">
                        <label className="block font-medium">Album URL:</label>
                        <Field type="text" name="albumUrl" className="border p-2 w-full rounded" disabled={mode} />
                        <ErrorMessage name="albumUrl" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Title:</label>
                        <Field type="text" name="title" className="border p-2 w-full rounded" disabled={mode} />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Artist:</label>
                        <Field type="text" name="artist" className="border p-2 w-full rounded" disabled={mode} />
                        <ErrorMessage name="artist" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Song:</label>
                        <Field as="select" name="song" key={Math.random()} className="border p-2 w-full rounded" disabled={mode}>
                            {data?.songs?.map((song: any) => (
                                <option value={song} key={song}>{song}</option>
                            ))}
                        </Field>
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Released Date:</label>
                        <Field type="text" name="releasedDate" className="border p-2 w-full rounded" disabled={mode} />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Description:</label>
                        <Field as="textarea" name="description" className="border p-2 w-full rounded" disabled />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Status:</label>
                        <Field as="select" name="status" className="border p-2 w-full rounded" disabled={mode} >
                            <option value={'InStock'} key={"InStock"}>In Stock</option>
                            <option value={'OutStock'} key={"OutStock"}>Out of Stock</option>
                        </Field>
                    </div>
                    <div className="my-3">
                        <label className="block font-medium">Price:</label>
                        <Field type="number" name="price" className="border p-2 w-full rounded" disabled={mode} />
                        <ErrorMessage name="price" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Metadata:</label>
                        <div className="flex justify-between gap-2">
                            <Field type="text" name="createdAt" className="border p-2 w-full rounded" disabled />
                            <Field type="text" name="updatedAt" className="border p-2 w-full rounded" disabled />
                        </div>
                    </div>


                    <div className="my-5 flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-black text-white p-1 rounded flex justify-center items-center"
                            disabled={isSubmitting}
                        >
                            <SendHorizontalIcon />
                        </button>
                        <div className="flex justify-center items-center">
                            <button
                                type="button"
                                className="bg-black text-white hover:text-white/[0.8] p-1 rounded"
                                onClick={handleEdit}
                            >
                                {mode ? <Edit2 /> : <FolderArchive />}
                            </button>
                            <button
                                type="button"
                                className="ms-3 bg-black text-white hover:text-white/[0.8] p-1 rounded"
                                onClick={() => toast.warn("Delete function not implemented")}
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
export const AlbumCreateFormComponent = () => {
    const {data} = useGetAllGenresQuery();
    const [createAlbum] = useCreateAlbumMutation();
    console.log("The genreS :",data)
    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (val: boolean) => void }) => {
        try {
            console.log("the final values :",values)
            const newAlbum = {
                "title":values?.title,
                "albumUrl":values.albumUrl,
                "status":values.status,
                "artist":values.artist,
                "genreId":[...values.genre],
                "releaseDate":values.releasedDate,
                "description":values.description,
                "songs":(values.song).split(","),
                "price": values.price
            }

            console.log("the final albums" , newAlbum);
            createAlbum(newAlbum);
            toast.success("Album Added successfully");
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                albumUrl:  "",
                title: "",
                artist: "",
                genre:"",
                releasedDate: "",
                description: "",
                price: 0,
                song: ""
            }}
            validationSchema={Yup.object({
                albumUrl: Yup.string().required("Album URL is required"),
                title: Yup.string().required("Title is required"),
                artist: Yup.string().required("Artist is required"),
                releasedDate: Yup.string().required("Released Date is required"), // Added releasedDate validation
                description: Yup.string().required("Description is required"),
                genre: Yup.array().min(1, "Select at least one genre"),
                price: Yup.number().required("Price is required").positive("Price must be a positive number"), // Added positive price validation
                song: Yup.string().required("Song is required") // Added song validation
            })}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className="p-4">
                    <div className="my-3">
                        <label className="block font-medium">Album URL:</label>
                        <Field type="text" name="albumUrl" className="border p-2 w-full rounded"  />
                        <ErrorMessage name="albumUrl" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Title:</label>
                        <Field type="text" name="title" className="border p-2 w-full rounded" />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Artist:</label>
                        <Field type="text" name="artist" className="border p-2 w-full rounded" />
                        <ErrorMessage name="artist" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Song:</label>
                        <Field type="text" name="song" className="border p-2 w-full rounded" >
                        </Field>
                    </div>
                    <div className="my-3">
                        <label className="block font-medium">Genres:</label>
                        {data?.map((genre: any) => (
                            <div key={genre._id} className="flex items-center my-1">
                                <input type={"checkbox"} name="genre" value={genre?._id}/>
                                <label htmlFor={`genre-${genre.id}`}>{genre?.genre}</label>
                            </div>
                        ))}
                        <ErrorMessage name="genre" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Released Date:</label>
                        <Field type="date" name="releasedDate" className="border p-2 w-full rounded"/>
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Description:</label>
                        <Field as="textarea" name="description" className="border p-2 w-full rounded"  />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>

                    <div className="my-3">
                        <label className="block font-medium">Status:</label>
                        <Field as="select" name="status" className="border p-2 w-full rounded" >
                            <option value={'InStock'} key={"InStock"}>In Stock</option>
                            <option value={'OutStock'} key={"OutStock"}>Out of Stock</option>
                        </Field>
                    </div>
                    <div className="my-3">
                        <label className="block font-medium">Price:</label>
                        <Field type="number" name="price" className="border p-2 w-full rounded" />
                        <ErrorMessage name="price" component="div" className="text-red-500" />
                    </div>
                    <div className="my-5 flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-black text-white p-1 rounded flex justify-center items-center"
                            disabled={isSubmitting}
                        >
                            <SendHorizontalIcon />
                        </button>

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