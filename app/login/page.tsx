"use client"

//Later Refactored

import {useLoginMutation} from "@/lib/features/auth/authApi"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectAuth,authSlice,login} from "@/lib/features/auth/authSlice";
import {redirect, useSearchParams} from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function CustomPage() {
    const [loginApi,LoginApiResult] = useLoginMutation();
    const dispatch = useAppDispatch();

    //with formik
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(3, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values) => {
        console.log('Form Data:', values);  // Equivalent to your showData function
        loginApi(values).then(data=>{
            var decode: JwtPayload | string | null;
            console.log("Data :",data.data.TOKEN)
            console.log("Here is the Token :",data.data.TOKEN);
            // decode = jwt.decode(data.data.TOKEN);
            // console.log("The Decoded Data:",decode)

            dispatch(login(data.data))
            redirect('/albums')
        })
    };

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Formik Form */}
            <h1 className="text-xl font-bold mt-8 mb-4">Formik Form</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <Field
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                className="mt-1 p-2 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="mt-1 p-2 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );}