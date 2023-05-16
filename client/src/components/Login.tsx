import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../store';
import { signInUserThunk } from '../store/user/userSlice';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cta from '../components/base/Cta';
export interface LoginForm {
  email: string;
  password: string;
}

const LoginModal = () => {

  const initialState: LoginForm = {
    email: undefined,
    password: undefined
  }
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ defaultValues: initialState });

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
    <div className="login">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <h1>Log In</h1>
            <label
              className="form-label"
              htmlFor="email">User Email:</label>
            <input
              name="email"
              className="form-input"
              type="email"
              {...register('email', {
                required: true
              })}
            />
            <label
              className="form-label"
              htmlFor="password">Password:
            </label>
            <input
              name="password"
              className="form-input"
              type="password"
              {...register('password', {
                required: true
              })}
            />
            <Cta
              color={'lightTertiary'}
              type="submit"
              value="Submit"
            >
              <span>submit</span>
            </Cta>
          </div>
        </form>
        <p>Don't have an account? <Link className="" to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default LoginModal;