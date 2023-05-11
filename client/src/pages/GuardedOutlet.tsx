import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store'
import { isEmpty, isUndefined } from 'lodash'

interface GuardedOutletProps {
	canAccess?: boolean;
	redirect?: string;
}

// TODO: i dont like using app state within this component, find way to move this to the instantiation of createBrowserRouter
const GuardedOutlet = ({
	canAccess,
	redirect = '/login',
}: GuardedOutletProps): JSX.Element => {

	const isAuth = useAppSelector<boolean>(state => {
		const user = state.user.user;
		const loggedIn = state.user.isLoggedIn;
		return !isEmpty(user) && loggedIn
	})

	const access: boolean = isUndefined(canAccess) ? isAuth : canAccess;

	return access ? <Outlet /> : <Navigate to={redirect} replace />
}

export default GuardedOutlet;