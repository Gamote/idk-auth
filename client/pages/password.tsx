import React from 'react';
import { FC } from 'react';
import PasswordForm from '../components/organisms/auth/PasswordForm';
import { PasswordPageProps } from '../../src/shared/PasswordPageProps';
import { FastifyGetServerSideProps } from 'nest-next-renderer';

const PasswordPage: FC = ({ state, username, error }: PasswordPageProps) => (
  <div>
    {error && <p>Error: {error}</p>}

    <PasswordForm initialValues={{ state, username }} />
  </div>
);

export const getServerSideProps: FastifyGetServerSideProps<
  PasswordPageProps
> = async ({ query }) => query;

export default PasswordPage;
