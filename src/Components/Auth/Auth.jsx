import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button } from "reactstrap";
import { setLocalStorage, userLoggedIn } from "../../features/auth/authSlice";
import { signIn, signUp } from "../../services/auth";

const Auth = () => {
  const [mode, setMode] = useState("Sign Up");
  const [authFailedMsg, setAuthFailedMsg] = useState("");
  const dispatch = useDispatch();

  const switchModeHandler = () => {
    setMode((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
  };

  let err = null;
  if (authFailedMsg !== "") {
    err = <Alert color="danger">{authFailedMsg}</Alert>;
  }
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "Must be atleast 4 characters!";
    }

    if (mode === "Sign Up") {
      if (!values.passwordConfirm) {
        errors.passwordConfirm = "Required";
      } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Password field does no match!";
      }
    }
    //console.log("Errors:", errors)
    return errors;
  };
  const handleAuth = async (values) => {
    if (mode === "Sign Up") {
      try {
        await signUp(values.email, values.password);
      } catch (err) {
        console.log(err.response.data.error.message);
      }
    } else {
      try {
        const res = await signIn(values.email, values.password);
        const { email, localId, expiresIn } = res.data;
        dispatch(userLoggedIn({ email: email, localId: localId }));
        dispatch(
          setLocalStorage({
            email: email,
            localId: localId,
            expiresIn: expiresIn,
          })
        );
      } catch (err) {
        console.log(err);
        setAuthFailedMsg(err.response.data.error.message);
      }
    }
  };
  return (
    <div>
      {err}
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={handleAuth}
        validate={validate}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          touched,
          handleBlur,
          errors,
        }) => (
          <div className="border p-3 rounded">
            <Button
              className="btn btn-lg w-100 brand-bg text-white border-0"
              onClick={switchModeHandler}
            >
              Switch to {mode === "Sign Up" ? "Login" : "Sign Up"}
            </Button>
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                name="email"
                placeholder="Enter Your Email"
                className="form-control mb-2"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="text-danger">
                {errors.email && touched.email && errors.email}
              </span>
              <input
                name="password"
                placeholder="Password"
                className="form-control mt-2"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="text-danger">
                {errors.password && touched.password && errors.password}
              </span>
              {mode === "Sign Up" ? (
                <div>
                  <input
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    className="form-control mt-2"
                    value={values.passwordConfirm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span className="text-danger">
                    {errors.passwordConfirm &&
                      touched.passwordConfirm &&
                      errors.passwordConfirm}
                  </span>
                </div>
              ) : null}
              <Button
                type="submit"
                className="btn btn-success mt-2"
                disabled={!values.password || !values.email}
              >
                {mode === "Sign Up" ? "Sign Up" : "Login"}
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Auth;
