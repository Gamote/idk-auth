import React from 'react';
import { FC } from 'react';
import LoginForm, { LoginFormProps } from '../components/organisms/LoginForm';

const Login: FC = () => {
  const onSubmit: LoginFormProps['onSubmit'] = async (values) => {
    console.info('Login values', values);
  };

  return (
    <div style={{ width: 200, background: 'red' }}>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
