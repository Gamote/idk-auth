import { LockClosedIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import * as yup from 'yup';
import { loginSchema } from '../../shared/validation';
import TextField, { TextFieldAutoComplete } from '../molecules/TextField';
import useCustomFormik from '../../shared/useCustomFormik';

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const formik = useCustomFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
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

      <div className="flex justify-between items-center">
        {/*Remember me*/}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember-me"
            className="block ml-2 text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        {/*Forgot password*/}
        {/*TODO: should be moved outside and provided through a param. E.g. "additionalContent" */}
        {/*<div className="text-sm">*/}
        {/*  <a*/}
        {/*    href="https://localhost:3000"*/}
        {/*    className="font-medium text-indigo-600 hover:text-indigo-500"*/}
        {/*  >*/}
        {/*    Forgot your password?*/}
        {/*  </a>*/}
        {/*</div>*/}
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
        Sign in
      </button>
    </div>
  );
};

export default LoginForm;
