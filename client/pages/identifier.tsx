import React from 'react';
import { FC } from 'react';
import { IdentifierPageProps } from '../../src/shared/IdentifierPageProps';
import { FastifyGetServerSideProps } from 'nest-next-renderer';
import IdentifierForm from '../components/organisms/auth/IdentifierForm';

const IdentifierPage: FC = ({ state, error }: IdentifierPageProps) => (
  <div>
    {error && <p>Error: {error}</p>}

    <IdentifierForm initialValues={{ state, username: 'contact@gamote.ro' }} />
  </div>
);

export const getServerSideProps: FastifyGetServerSideProps<
  IdentifierPageProps
> = async ({ query }) => query;

export default IdentifierPage;
