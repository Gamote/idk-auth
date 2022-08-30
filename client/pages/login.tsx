import React from 'react';
import { FC } from 'react';
import LoginForm from '../components/organisms/LoginForm';
import { FastifyGetServerSideProps } from '../../src/modules/render/render.types';

export type LoginPageProps = {
  error?: string;
};

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
