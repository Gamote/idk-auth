import * as yup from 'yup';

/*
 * Common fields
 * */

const ticketFields = {
  ticket: yup.string().required().uuid({ version: 'uuidv4' }),
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

/*
 * Schemas
 * */

// export const envVariablesSchema = yup.object({
//   NEXT_PUBLIC_CLIENT_URL: yup.string().required(), // TODO: check if url
//   NEXT_PUBLIC_API_BASE_URL: yup.string().required(), // TODO: check if url
//   NEXT_PUBLIC_API_GRAPH_PATH: yup.string().required(), // TODO: check if url
//   NEXT_PUBLIC_JWT_CUSTOM_CLAIMS_NAMESPACE: yup
//     .string()
//     .required("JWT custom claims namespace is not specified"),
//   NEXT_PUBLIC_LOCALSTORAGE_KEY_LOGGED_IN_AT: yup.string().required(),
//
//   /**
//    * Socials
//    */
//   NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_ENABLED: yup.boolean().default(false),
//   NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_CLIENT_ID: yup
//     .string()
//     .default("")
//     .when("NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_ENABLED", {
//       is: true,
//       then: yup
//         .string()
//         .required(
//           "The `NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_CLIENT_ID` field is required because `NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_ENABLED` is true",
//         ),
//     }),
//   NEXT_PUBLIC_SOCIAL_PROVIDER_FACEBOOK_SCOPES: yup
//     .array()
//     .of(yup.string().required())
//     .required()
//     .ensure()
//     .transform((_, originalValue: unknown) => {
//       if (typeof originalValue === "string") {
//         return originalValue.split(",").filter((url) => url.length);
//       }
//
//       if (Array.isArray(originalValue)) {
//         return originalValue as string[];
//       }
//
//       return [];
//     })
//     .meta({
//       desc: "The value must be scopes delimited with commas, like: name,email. In the end this will be made an array.",
//     }),
//
//   NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_ENABLED: yup.boolean().default(false),
//   NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_CLIENT_ID: yup
//     .string()
//     .default("")
//     .when("NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_ENABLED", {
//       is: true,
//       then: yup
//         .string()
//         .required(
//           "The `NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_CLIENT_ID` field is required because `NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_ENABLED` is true",
//         ),
//     }),
//   NEXT_PUBLIC_SOCIAL_PROVIDER_GITHUB_SCOPES: yup
//     .array()
//     .of(yup.string().required())
//     .required()
//     .ensure()
//     .transform((_, originalValue: unknown) => {
//       if (typeof originalValue === "string") {
//         return originalValue.split(",").filter((url) => url.length);
//       }
//
//       if (Array.isArray(originalValue)) {
//         return originalValue as string[];
//       }
//
//       return [];
//     })
//     .meta({
//       desc: "The value must be scopes delimited with commas, like: name,email. In the end this will be made an array.",
//     }),
// });

export const activateSchema = yup.object({
  ...ticketFields,
});

export const loginSchema = yup.object({
  ...credentialsFields,
});

export const registerSchema = yup.object({
  ...credentialsFields,
  ...nameFields,
});

export const logoutSchema = yup.object({
  all: yup.boolean(),
});
