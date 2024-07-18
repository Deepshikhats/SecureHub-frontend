import { Formik } from "formik";
import Lottie from "lottie-react";
import React, { Fragment, useState } from "react";
import SuccessAnim from "../../assets/lottieFiles/Animation - 1720977661068.json";
import { Button, Input } from "../../components";
import AuthLayout from "../../layouts/authLayout";
import AuthServices from "../../services/authService";
import { SignupSchema } from "../../utils/validationSchemas";
const Signup: React.FC = () => {
  /*******************REACT-HOOKS******************************************/
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userStatus, setIsUserCreated] = useState<IUserStatus>({
    status: false,
    resp: false,
  });
  /******************CONSTANTS********************************* */
  const initialValues: SignupUserCredentials = {
    name: "",
    email: "",
    password: "",
  };

  /************************CUSTOM-METHODS*********************************/
  const handleFormSubmit = (values: SignupUserCredentials) => {
    setIsLoading(true);
    AuthServices.registerUser(values)
      .then((resp) =>
        setIsUserCreated(() => ({
          resp: true,
          status: true,
          message: resp.message,
        }))
      )
      .catch((error) =>
        setIsUserCreated(() => ({
          resp: true,
          status: false,
          message: error.response.data.message,
        }))
      )
      .finally(() => setIsLoading(false));
  };
  return (
    <AuthLayout>
      <div className="w-1/2 flex">
        <div className="space-y-4 m-auto border-2 w-64 border-blue-950 rounded-xl p-5">
          {!userStatus.resp ? (
            <Fragment>
              <h3 className="w-full text-center font-semibold ">SIGN UP</h3>
              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={SignupSchema}
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
                      name="name"
                      label="Name*"
                      value={values.name}
                      errorText={(touched.name && errors.name) || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Input
                      name="email"
                      label="Email*"
                      value={values.email}
                      errorText={(touched.email && errors.email) || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      label="Password*"
                      name="password"
                      type="password"
                      value={values.password}
                      errorText={(touched.password && errors.password) || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Button
                      label="Sign Up"
                      type="submit"
                      isLoading={isLoading}
                    />
                    <span className="text-xs text-black font-medium w-full text-center">
                      Already have an Account?{" "}
                      <a href="/login" className="text-blue-600">
                        Login
                      </a>
                    </span>
                  </form>
                )}
              </Formik>
            </Fragment>
          ) : (
            <Fragment>
              {userStatus.status && <Lottie animationData={SuccessAnim} />}
              <h3 className="text-xs font-semibold text-center ">
                <span
                  className={`${
                    userStatus.status ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {userStatus.message}
                </span>
                <br />
                <a href="/login" className="text-blue-700">
                  Login to Continue
                </a>
              </h3>
            </Fragment>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
