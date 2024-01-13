import useHTTP from "../../hooks/useHTTP";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [regiterationType, setRegiterationType] = useState("sign-in");
  const [sendHTTP] = useHTTP();
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const schema = yup.object().shape(
    regiterationType === "sign-up"
      ? {
          email: yup.string().email().required(),
          username: yup.string().min(3).max(20).required(),
          password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must be at most 20 characters")
            .required("Password is required"),
        }
      : {
          "username-email": yup
            .string()
            .required("Email or username is required"),
          password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must be at most 20 characters")
            .required("Password is required"),
        }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log("🚀 errors", errors);
  }, [errors]);

  const handleRegisteration = async (data) => {
    let res = null;

    if (regiterationType === "sign-up") {
      res = await sendHTTP("/user/register", "POST", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } else {
      const isEmail = data["username-email"].includes("@");
      res = await sendHTTP("/user/login", "POST", {
        username: !isEmail ? data["username-email"] : null,
        email: isEmail ? data["username-email"] : null,
        password: data.password,
      });
    }

    console.log("🚀 handleRegisteration ~ res", res);
    if (res?.data) {
      if (regiterationType === "sign-in") {
        setAuth(res.data.user, res.data.token);
        toast.success("Logged in successfully");
        navigate("/videos");
      } else {
        setRegiterationType("sign-in");
        toast.success("Account created successfully, please login");
      }
    } else {
      console.log("ran");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center md:justify-center h-screen px-6 py-8 mx-auto md:h-screen lg:py-0">
      <span className="flex items-center mb-6 text-4xl font-bold text-gray-900 ">
        <img className="w-14 h-14 mr-2" src="/logo.svg" alt="logo" />
        <h1 className=""> Infinity Stream</h1>
      </span>
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign {regiterationType === "sign-in" ? "in" : "up"} to your account
          </h1>
          <form
            onSubmit={handleSubmit(handleRegisteration)}
            className="space-y-4 md:space-y-6 "
            action="#"
          >
            {regiterationType === "sign-up" ? (
              <>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
              </>
            ) : (
              <div>
                <label
                  htmlFor="username-email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email username
                </label>
                <input
                  {...register("username-email")}
                  type="username-email"
                  name="username-email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign {regiterationType === "sign-in" ? "in" : "up"}
            </button>
            {regiterationType === "sign-in" ? (
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => setRegiterationType("sign-up")}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <span
                  onClick={() => setRegiterationType("sign-in")}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign in
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
