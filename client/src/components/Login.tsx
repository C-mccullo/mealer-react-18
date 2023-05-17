import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../store';
import { signInUserThunk } from '../store/user/userSlice';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cta from '../components/base/Cta';
import Input from '../components/base/Input';

export interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {

  const initialState: LoginForm = {
    email: undefined,
    password: undefined
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialState });

  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  // TODO: set redirecting logic outside of component
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

  const onSubmit = (formData) => {
    if (!isEmpty(errors)) {
      return;
    }
    dispatch(signInUserThunk(formData))
  }

  return (
    <div className="block w-full">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <h2 className='text-2xl'>Log In</h2>
            <Input
              type={'email'}
              label={'User Email'}
              name={'email'}
              register={register}
              validationSchema={{ required: true }}
              errors={errors}
            />
          </div>
          <div>
            <Input
              type={'password'}
              label={'Password'}
              name={'password'}
              register={register}
              validationSchema={{ required: true }}
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
          <div>
            <p>Don't have an account? <Link className="" to="/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;