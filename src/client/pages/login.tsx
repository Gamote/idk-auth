import React from 'react';
import { FC } from 'react';
import LoginForm from '../components/organisms/LoginForm';
import { LoginPageProps } from '../../shared/LoginPageProps';
import { FastifyGetServerSideProps } from '../../../libs/next-renderer/src';

const LoginPage: FC = ({ error }: LoginPageProps) => (
  <div>
    {error && <p>Error: {error}</p>}

    <LoginForm
      initialValues={{ username: 'contact@gamote.ro', password: '123456' }}
    />
  </div>
);

export const getServerSideProps: FastifyGetServerSideProps<
  LoginPageProps
> = async ({ query }) => query;

export default LoginPage;
