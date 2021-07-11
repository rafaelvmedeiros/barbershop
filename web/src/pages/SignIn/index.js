import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import { Form } from './styles';

import logo from '../../assets/logo.svg';

function SignIn() {
  const authenticateUser = async () => {};

  return (
    <>
      <img src={logo} alt="logo" />

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'E-mail is required!';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Password is required!';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p>{errors.email && touched.email && errors.email}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p> {errors.password && touched.password && errors.password}</p>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>

            <Link to="/register">Register For Free</Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignIn;
