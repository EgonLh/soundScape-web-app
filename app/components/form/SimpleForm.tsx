import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import 'yup'

const SimpleForm = () => {
    const initialValues = { inputValue: '' };

    const validationSchema = Yup.object({
        inputValue: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        alert(`Submitted value: ${values.inputValue}`);
        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-2xl bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Formik Input Form</h1>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
        <Form className="space-y-4">
        <div>
            <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700">
        Enter a Value
    </label>
    <Field
    id="inputValue"
    name="inputValue"
    type="text"
    className="mt-1 p-2 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
    <ErrorMessage
        name="inputValue"
    component="div"
    className="text-red-500 text-sm mt-1"
        />
        </div>

        <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
        {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        </Form>
)}
    </Formik>
    </div>
);
};

export default SimpleForm;
