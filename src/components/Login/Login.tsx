import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { Input } from "../Input/Input";
import logo from "../../assets/images/logo.png";
import classes from "./Login.module.css";

export interface InitialValues {
  login: string;
  password: string;
}

const initialValues = {
  login: "",
  password: "",
};

const ValidationSchema = yup.object().shape({
  login: yup
    .string()
    .email("Niepoprawny adres email")
    .typeError("Wprowadź liczbę!"),
  password: yup.string().typeError("Wprowadź liczbę!"),
});

const printValues = (values: InitialValues) => {
  const { login, password } = values;
  return `
  login: ${login}
  password: ${password}
  `;
};

export const Login = () => {
  return (
    <main className={classes.Login}>
      <img src={logo} alt="MegaK Logo" className={classes.logo} />
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert(printValues(values));
        }}
      >
        {({ errors, isValid }) => (
          <Form className={classes.form}>
            <Input
              type="text"
              name="login"
              forFormik
              size="large"
              placeholder="E-mail"
            />
            <Input
              type="password"
              name="password"
              forFormik
              size="large"
              placeholder="Password"
            />
            <p className={classes.error}>{errors.login}</p>
            <div className={classes.buttons}>
              <p className={classes.link}>Zapomniałeś hasła?</p>
              <PrimaryButton
                type="submit"
                disabled={!isValid}
                color="primary"
                size="large"
              >
                Zaloguj się
              </PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};
