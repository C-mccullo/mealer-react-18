import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
	canAccess?: boolean;
	redirect?: string;
}

const GuardedRoute = ({
	canAccess = false,
	redirect = '/',
}: GuardedRouteProps): JSX.Element => (
	canAccess ? <Outlet /> : <Navigate to={redirect} replace />
)

export default GuardedRoute;