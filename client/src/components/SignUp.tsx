// import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { User } from '../types/index.types';
import { useAppDispatch } from '../store';
import { postNewUserThunk } from '../store/user/userSlice';
import { isEmpty } from 'lodash';

const SignUp = () => {
  const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm<User>({ defaultValues: initialState });

  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const emailValidation = {
    value: EMAIL_REGEX,
    message: 'please enter a valid email address',
  };

  const onSubmit = async (formData: User) => {
    // if form has errors do not send data
    console.log(errors);
    if (!isEmpty(errors)) {
      console.log(formData)
      return;
    }
    // POST_NEW_USER -> POST -> SUCCESS -> LOGIN USER
    dispatch(postNewUserThunk(formData));
  }

  return (
    <div>
      <div className="login">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <h1>Sign Up</h1>
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              className="form-input"
              type="text"
              {...register('firstName', { required: true })}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              className="form-input"
              type="text"
              {...register('lastName', {
                required: true,
                pattern: /^[A-Za-z]+$/i
              })}
            />
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              className="form-input"
              type="email"
              {...register('email', {
                required: true,
                pattern: emailValidation
              })}
            />
            <label
              htmlFor="password">Password:</label>
            <input
              name="password"
              className="form-input"
              type="text"
              {...register('password', { required: true })}
            />
            <input
              className="button button-green"
              type="submit"
              value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}


export default SignUp