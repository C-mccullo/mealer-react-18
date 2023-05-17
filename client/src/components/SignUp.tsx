// import React, { useState } from "react";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/index.types';
import useAuthCheck from '../hooks/useAuthCheck';
import { useAppDispatch } from '../store';
import { postNewUserThunk } from '../store/user/userSlice';
import { isEmpty } from 'lodash';
import { Link } from "react-router-dom";
import Input from '../components/base/Input';
import Cta from '../components/base/Cta';
import { EMAIL_REGEX } from '../utils'

const SignUp = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialState });

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAuthCheck();

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
              <Input
                type={'text'}
                label={'First Name'}
                name={'firstName'}
                register={register}
                validationSchema={{ required: true }}
                errors={errors}
              />
              <Input
                type={'text'}
                label={'Last Name'}
                name={'lastName'}
                register={register}
                validationSchema={{
                  required: true,
                  pattern: /^[A-Za-z]+$/i
                }}
                errors={errors}
              />
              <Input
                type={'email'}
                label={'Email'}
                name={'email'}
                register={register}
                validationSchema={{
                  required: true,
                  pattern: emailValidation
                }}
                errors={errors}
              />
              <Input
                type={'password'}
                label={'Password'}
                name={'password'}
                register={register}
                validationSchema={{
                  required: true
                }}
                errors={errors}
              />
              <Cta
                color={'lightTertiary'}
                type="submit"
                value="Submit"
              >
                <span>submit</span>
              </Cta>
            </div>
            <p>Already a user? <Link to="/login">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}


export default SignUp