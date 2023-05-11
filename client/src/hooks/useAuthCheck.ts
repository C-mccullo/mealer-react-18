import { useAppSelector } from '../store';
import { isEmpty } from 'lodash'
import { User } from '../types/index.types';

const useAuthCheck = () => {
  return useAppSelector<boolean>(state => {
		const user: User = state.user.user;
		const loggedIn: boolean = state.user.isLoggedIn;
		return !isEmpty(user) && loggedIn
	})
}

export default useAuthCheck