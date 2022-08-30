import React from 'react';
import useCustomFormik from '../../shared/useCustomFormik';
import { FormikConfig } from 'formik';

export type FormikClassicFormProps<Values> = {
  config?: Omit<FormikConfig<Values>, 'onSubmit'>;
  method?: 'POST' | 'GET';
  action?: string;
  children?: (
    formik: ReturnType<typeof useCustomFormik<Values>>,
  ) => React.ReactNode;
};

/**
 * This component is using our {@link useCustomFormik} hook together with the {@link form} so we
 * can send POST actions and still use the useful features of Formik.
 *
 * Read more: https://github.com/jaredpalmer/formik/issues/556#issuecomment-472047486
 *
 * @param config
 * @param method
 * @param action
 * @param children
 */
const FormikClassicForm = <Values,>({
  config,
  method,
  action,
  children,
}: FormikClassicFormProps<Values>) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const formik = useCustomFormik<Values>({
    ...config,
    onSubmit: () => formRef.current.submit(),
  });

  return (
    <form ref={formRef} method={method} action={action}>
      {children(formik)}
    </form>
  );
};

export default FormikClassicForm;
