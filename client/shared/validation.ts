import * as yup from 'yup';

/*
 * Common fields
 * */

const stateFields = {
  state: yup.string().required(),
};

const nameFields = {
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'The minimum length is 2 characters')
    .max(50, 'The maximum length is 64 characters'),
  lastName: yup
    .string()
    .required('First name is required')
    .min(2, 'The minimum length is 2 characters')
    .max(50, 'The maximum length is 64 characters'),
};

const credentialsFields = {
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  // TODO: add a more complex password validation that is shared with the backend
  password: yup
    .string()
    .required('Password is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
};

export const identifierSchema = yup.object({
  ...stateFields,
  username: credentialsFields.username,
});

export const passwordSchema = yup.object({
  ...stateFields,
  ...credentialsFields,
});

export const registerSchema = yup.object({
  ...credentialsFields,
  ...nameFields,
});
