import React from 'react';
import Login from '../components/Login';
import Card from '../components/base/Card';
import BasicLayout from '../layouts/BasicLayout';

const LoginRoute = (props) => (
  <BasicLayout>
    <div className='pt-16'>
      <Card className="m-auto max-w-lg content-center">
        <Login login={ props.login }/>
      </Card>
    </div>
  </BasicLayout>
)

export default LoginRoute