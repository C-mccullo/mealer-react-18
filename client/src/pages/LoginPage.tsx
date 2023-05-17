import LoginForm from '../components/Login';
import Card from '../components/base/Card';
import BasicLayout from '../layouts/BasicLayout';

const LoginRoute = () => (
  <BasicLayout>
    <div className='pt-16'>
      <Card className="m-auto max-w-md content-center">
        <div className='block w-full rounded-t-sm lg:h-32 h-28 overflow-hidden'>
          <img
            className='static'
            src="./src/assets/MealerShapeCollage1.jpg" alt="" />
        </div>
        <div className='p-4 md:p-6 lg:p-8'>
          <LoginForm />
        </div>
      </Card>
    </div>
  </BasicLayout>
)

export default LoginRoute