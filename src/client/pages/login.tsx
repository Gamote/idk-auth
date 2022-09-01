import React from 'react';
import { FC } from 'react';
import LoginForm from '../components/organisms/LoginForm';
import { FastifyGetServerSideProps } from '../../server/modules/render/render.types';
import { LoginPageProps } from '../../shared/LoginPageProps';

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
