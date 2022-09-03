import { LockClosedIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import * as yup from 'yup';
import { identifierSchema } from '../../../shared/validation';
import TextField, { TextFieldAutoComplete } from '../../molecules/TextField';
import FormikClassicForm, {
  FormikClassicFormProps,
} from '../FormikClassicForm';

export type IdentifierFormValues = yup.InferType<typeof identifierSchema>;

export type IdentifierFormProps = {
  initialValues: IdentifierFormValues;
};

const IdentifierForm: FC<IdentifierFormProps> = ({ initialValues }) => {
  /**
   * Function that returns the form children.
   * @param formik
   */
  const formChildren: FormikClassicFormProps<IdentifierFormValues>['children'] =
    (formik) => (
      <>
        {/*Inputs*/}
        <div className="space-y-2 rounded-md">
          <TextField {...formik.field('state')} type={'hidden'} />

          <TextField
            {...formik.field('username')}
            type={'email'}
            label={'Email'}
            placeholder={'Email'}
            autoComplete={TextFieldAutoComplete.Email}
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
          Continue
        </button>
      </>
    );

  return (
    <div className="mt-8 space-y-6">
      <FormikClassicForm<IdentifierFormValues>
        method={'POST'}
        config={{
          initialValues: {
            state: initialValues.state,
            username: initialValues.username || '',
          },
          validationSchema: identifierSchema,
          validateOnChange: false,
          validateOnBlur: true,
        }}
      >
        {formChildren}
      </FormikClassicForm>
    </div>
  );
};

export default IdentifierForm;
