import React from 'react';
import { FC } from 'react';
import LoginForm, { LoginFormProps } from '../components/organisms/LoginForm';
import { NextPageContext } from "next";

const Login: FC = (props) => {
  console.log('Login::props:', props);

  const onSubmit: LoginFormProps['onSubmit'] = async (values) => {
    console.info('Login::values', values);
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  // console.info('Login::getServerSideProps', ctx);

  return {
    props: ctx.query,
  };
}

export default Login;
