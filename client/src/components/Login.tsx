import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useAppDispatch } from '../store';
import { signInUserThunk } from '../store/user/userSlice';

// interface for signInForm
interface LoginForm {
  email: string;
  password: string;
}

const LoginModal = () => {

  const initialState: LoginForm = {
    email: undefined,
    password: undefined
  }

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ defaultValues: initialState });

  const onSubmit = async (formData) => {
    if (!isEmpty(errors)) {
      console.log('errors? ', errors);
      return;
    }
    console.log(formData);
    dispatch(signInUserThunk(formData))
  }

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <input
            className="button button-blue"
            type="submit"
            value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default LoginModal;