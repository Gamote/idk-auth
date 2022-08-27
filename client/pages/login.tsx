import React from 'react';
import { FC } from 'react';
import LoginForm, { LoginFormProps } from '../components/organisms/LoginForm';

const Login: FC = (props) => {
  console.log('Login props:', props);

  const onSubmit: LoginFormProps['onSubmit'] = async (values) => {
    console.info('Login values', values);
  };

  return (
    <div style={{ width: 200, background: 'red' }}>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export function getServerSideProps(ctx) {
  console.info('getServerSideProps', ctx);
  return {
    props: {},
  };
}

export default Login;
