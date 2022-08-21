import React, { useMemo } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';


const initialValues = {
  name: '',
  country: '',
  email: '',
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Must be at least 5 characters long')
    .required('Required'),
  country: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

/**
 *
 * @description Formik Form: submit "button" is enabled only when passing
 * validation schema
 */
export const SignupForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        handleSubmit(values);
        resetForm();
        setErrors(validationSchema.getDefault());
        setSubmitting(false);
      }}
    >
      {(formik) => {
        return useMemo(() => {
          return (
            <Form className="form" role="form">
              <h2 className="form__heading">Sign Up</h2>
              <label htmlFor="name" className="form__label">
                <ErrorMessage name="name" className="form__error" component="div" />
                <Field name="name">
                  {({ field, meta }) => {
                    return (
                      <input
                        type="text"
                        className={`form__input ${meta.error
                          && meta.touched && 'error--color'}`}
                        placeholder="Name"
                        {...field}
                      />
                    );
                  }}
                </Field>
              </label>

              <label htmlFor="email" className="form__label">
                <ErrorMessage name="email" className="form__error" component="div" />
                <Field name="email">
                  {({ field, meta }) => {
                    return (
                      <input
                        type="email"
                        className={`form__input ${meta.error
                          && meta.touched && 'error--color'}`}
                        placeholder="Email"
                        {...field}
                      />
                    );
                  }}
                </Field>
              </label>

              <label htmlFor="country" className="form__label">
                <ErrorMessage name="country" className="form__error" component="div" />
                <Field name="country">
                  {({ field, meta }) => {
                    return (
                      <input
                        type="text"
                        className={`form__input ${meta.error
                          && meta.touched && 'error--color'}`}
                        placeholder="Country"
                        {...field}
                      />
                    );
                  }}
                </Field>
              </label>

              <button
                className={`btn ${!(formik.isValid && formik.dirty) ? '' : 'btn--primary'}`}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </button>
            </Form>
          );
        }, [formik.values, formik.isValid]);
      }}
    </Formik>
  );
};
