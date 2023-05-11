// import React, { useState } from "react";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/index.types';
import { useAppDispatch, useAppSelector } from '../store';
import { postNewUserThunk } from '../store/user/userSlice';
import { isEmpty } from 'lodash';
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from '../utils'

const SignUp = () => {
  const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm<User>({ defaultValues: initialState });

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // TODO: Maybe move auth check logic to seperate hook? To much extraction?
  const isAuth = useAppSelector<boolean>(state => {
		const user = state.user.user;
		const loggedIn = state.user.isLoggedIn;
		return !isEmpty(user) && loggedIn
	})

  useEffect(() => {
    if (isAuth) {
      navigate('/home')
    }
  }, [navigate, isAuth])

  const emailValidation = {
    value: EMAIL_REGEX,
    message: 'please enter a valid email address',
  };

  const onSubmit = (formData: User) => {
    console.log(errors);
    if (!isEmpty(errors)) {
      console.log(formData)
      return;
    }
    dispatch(postNewUserThunk(formData))
  }

  return (
    <div>
      <div className="login">
        <div className="form-container">
          <form
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
            <p>Already a user? <Link to="/login">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}


export default SignUp