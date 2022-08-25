import { FormikConfig, useFormik } from 'formik';
import { ChangeEvent, FocusEvent } from 'react';

/**
 * Custom version of `useFormik`
 *
 * For example, this will help avoiding definition of
 * the same conditions for each fields in a form
 *
 * @param config
 */
const useCustomFormik = <Values>(config: FormikConfig<Values>) => {
  const formik = useFormik(config);

  /**
   * Get a handler that is ready to revalidate value in case error is already there
   */
  const getChangeHandler =
    (revalidateIfError = true) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (revalidateIfError && formik.errors[event.target.id as keyof Values]) {
        void formik.validateField(event.target.id);
      }

      formik.handleChange(event);
    };

  /**
   * Handler that will validate the current field after it goes out of focus
   */
  const getBlurHandler = () => (event: FocusEvent<HTMLInputElement>) =>
    void formik.validateField(event.target.id);

  /**
   * This helper will generate field configuration a safe manner
   */
  const field = (id: keyof Values) => ({
    id,
    value: formik.values[id],
    onChange: getChangeHandler(),
    onBlur: getBlurHandler(),
    error: formik.errors[id],
  });

  return { ...formik, getChangeHandler, getBlurHandler, field };
};

export default useCustomFormik;
