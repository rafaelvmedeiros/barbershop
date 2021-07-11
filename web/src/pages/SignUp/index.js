import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import { Form } from './styles';

import logo from '../../assets/logo.svg';

function SignUp() {
  const createAccount = () => {};

  return (
    <>
      <img src={logo} alt="logo" />

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={values => {
          const errors = {};

          if (!values.name) {
            errors.name = 'Name is required!';
          }

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

          if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required!';
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
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <p>{errors.name && touched.name && errors.name}</p>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p> {errors.email && touched.email && errors.email}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p> {errors.password && touched.password && errors.password}</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            <p>
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </p>
            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
            <Link to="/">Have an Account? Sign In</Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
