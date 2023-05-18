import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../store';
import { signInUserThunk } from '../store/user/userSlice';
import BaseLink from './base/Link';
import { useNavigate } from 'react-router-dom';
import Cta from '../components/base/Cta';
import Input from '../components/base/Input';
import Form from '../components/base/Form';

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
      <Form
        onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Input
            type={'email'}
            label={'User Email'}
            name={'email'}
            register={register}
            autoComplete='off'
            validationSchema={{ required: true }}
            errors={errors}
          />
        </Form.Group>
        <Form.Group>
          <Input
            type={'password'}
            label={'Password'}
            name={'password'}
            register={register}
            autoComplete='off'
            validationSchema={{ required: true }}
            errors={errors}
          />
        </Form.Group>
        <Form.Group>
          <Cta
            color={'lightTertiary'}
            type="submit"
            value="Submit"
          >
            <span>submit</span>
          </Cta>
        </Form.Group>
        <Form.Group>
          <p>Don't have an account? <BaseLink to="/signup">Sign up</BaseLink></p>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm;