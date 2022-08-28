import React from 'react';
import { FC } from 'react';
import RegisterForm, {
  RegisterFormProps,
} from '../components/organisms/RegisterForm';

const Register: FC = () => {
  const onSubmit: RegisterFormProps['onSubmit'] = async (values) => {
    console.info('Register values', values);
  };

  return (
    <div>
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
