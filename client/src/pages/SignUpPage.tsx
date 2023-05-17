import SignUp from "../components/SignUp";
import Card from '../components/base/Card';
import BasicLayout from '../layouts/BasicLayout';

const SignUpPage = () => (
  <BasicLayout>
    <div className='pt-16'>
      <Card className="m-auto max-w-md content-center">
        <div className='block w-full rounded-t-sm lg:h-32 h-28 overflow-hidden'>
          <img
            className='static'
            src="./src/assets/MealerShapeCollage2.jpg" alt="" />
        </div>
        <div className='p-4 md:p-6 lg:p-8'>
          <SignUp />
        </div>
      </Card>
    </div>
  </BasicLayout>
)

export default SignUpPage;