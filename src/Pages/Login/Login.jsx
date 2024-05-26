/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";

import { useEffect, useRef, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useForm } from "react-hook-form";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const captchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { signIn, setLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptcha = () => {
    if (validateCaptcha(captchaRef.current.value)) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (formData) => {
    const { email, password } = formData;
    console.log(formData);
    signIn(email, password)
      .then(() => {
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Firebase: Error (auth/invalid-credential).") {
          toast.error("Invalid Email Or Password");
        } else {
          toast.error("An Unknown Error Occurred");
        }
      });
  };

  //   const handleGoogleLogin = () => {
  //     signInWithGoogle()
  //       .then(() => {
  //         // toast.success("Sign In Successful");
  //         navigate(location?.state ? location.state : "/");
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //         // toast.error("An Unknown Error Occurred!");
  //       });
  //   };

  return (
    <div className="mb-5 lg:mb-10 bg-base-300 rounded-xl bg-[url('https://i.ibb.co/XFwZHc4/brandi-redd-a-JTi-W00qqt-I-unsplash-2.jpg')] bg-cover bg-center bg-blend-overlay">
      <Helmet>
        <title>Sign In | ECO Volunteers</title>
      </Helmet>

      <Toaster></Toaster>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-jost font-bold text-center pt-5 lg:pt-10">
        LOGIN
      </h1>
      <div className="hero flex justify-center flex-wrap px-2 py-5 lg:py-10">
        <div className="card shrink-0 w-full max-w-md md:border">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Enter Your Email to login",
                  },
                })}
                type="email"
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-red-500 font-semibold font-jost">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lg">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Enter Password To Login",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input w-full input-bordered"
              />
              <span
                onClick={handleShowPassword}
                className="text-2xl absolute right-4 top-[61%]"
              >
                {showPassword ? (
                  <IoIosEye></IoIosEye>
                ) : (
                  <IoIosEyeOff></IoIosEyeOff>
                )}
              </span>
            </div>
            <div>
              {errors.password && (
                <p className="text-red-500 font-semibold font-jost">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <LoadCanvasTemplate></LoadCanvasTemplate>

              <input
                ref={captchaRef}
                onBlur={handleCaptcha}
                type="text"
                placeholder="Type the captcha above"
                className="input w-full input-bordered"
              />
            </div>
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-[16px]"
              >
                Forgot password?
              </a>
            </label>
            <div className="form-control mt-6">
              <button
                // disabled={btnDisabled}
                className="btn bg-blue-600 hover:bg-blue-600 text-lg text-white hover:bg-btn-1"
              >
                Login
              </button>
            </div>
          </form>
          {/* <div className="flex flex-col gap-4 justify-center  items-center mb-5">
            {" "}
            <GoogleButton onClick={handleGoogleLogin} />
          </div> */}
          <p className="text-center mb-4 text-lg">
            Don't have any account?{" "}
            <Link to="/register" className="link text-secondary-1 pb-2">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
