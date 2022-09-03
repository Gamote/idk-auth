import { LockClosedIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import * as yup from 'yup';
import useCustomFormik from '../../../shared/useCustomFormik';
import { registerSchema } from '../../../shared/validation';
import TextField, { TextFieldAutoComplete } from '../../molecules/TextField';

export type RegisterFormValues = yup.InferType<typeof registerSchema>;

export type RegisterFormProps = {
  onSubmit: (values: RegisterFormValues) => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const formik = useCustomFormik<RegisterFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="mt-8 space-y-6">
      {/*Inputs*/}
      <div className="space-y-2 rounded-md">
        <TextField
          {...formik.field('firstName')}
          type={'text'}
          label={'First name'}
          placeholder={'First name'}
          autoComplete={TextFieldAutoComplete.GivenName}
        />

        <TextField
          {...formik.field('lastName')}
          type={'text'}
          label={'Last name'}
          placeholder={'Last name'}
          autoComplete={TextFieldAutoComplete.FamilyName}
        />

        <TextField
          {...formik.field('username')}
          type={'email'}
          label={'Email'}
          placeholder={'Email'}
          autoComplete={TextFieldAutoComplete.Email}
        />

        <TextField
          {...formik.field('password')}
          type={'password'}
          label={'Password'}
          placeholder={'Password'}
          autoComplete={TextFieldAutoComplete.NewPassword}
        />
      </div>

      {/*Submit button*/}
      <button
        className="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={formik.submitForm}
      >
        <span className="flex absolute inset-y-0 left-0 items-center pl-3">
          <LockClosedIcon
            className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Sign up
      </button>
    </div>
  );
};

export default RegisterForm;
