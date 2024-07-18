import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Input } from "../../components";
import AuthLayout from "../../layouts/authLayout";
import AuthServices from "../../services/authService";
import { LoginSchema } from "../../utils/validationSchemas";
const Login: React.FC = () => {
  /*******************REACT-HOOKS******************************************/

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  /******************CONSTANTS********************************* */

  const initialValues: LoginUserCredentials = {
    email: "",
    password: "",
  };

  /************************CUSTOM-METHODS*********************************/
  const handleFormSubmit = (values: LoginUserCredentials) => {
    setIsLoading(true);
    AuthServices.loginUser(values)
      .then(() => {
        location.replace("/");
      })
      .catch((err) => {
        setErrorText(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <AuthLayout>
      <div className="w-1/2 flex">
        <div className="space-y-4 m-auto border-2 w-64 border-blue-950 rounded-xl p-5">
          <h3 className="w-full text-center font-semibold ">LOGIN</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={LoginSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  name="email"
                  label="Email*"
                  value={values.email}
                  errorText={(touched.email && errors.email) || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setErrorText("");
                  }}
                  onBlur={handleBlur}
                />

                <Input
                  label="Password*"
                  name="password"
                  type="password"
                  value={values.password}
                  errorText={(touched.password && errors.password) || errorText}
                  onChange={(e) => {
                    handleChange(e);
                    setErrorText("");
                  }}
                  onBlur={handleBlur}
                />
                <Button label="Submit" type="submit" isLoading={isLoading} />
                <span className="text-xs text-black font-medium w-full text-center">
                  Don't Have an Account?{" "}
                  <a href="/signup" className="text-blue-600">
                    Sign up
                  </a>
                </span>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
