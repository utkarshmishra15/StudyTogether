import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.svg";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Fade } from "react-awesome-reveal";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = ({ name, photo, email, password }) => {
    const user = { name, photo, email, password };

    // firebase email password login
    createUser(email, password)
      .then((res) => {
        axios.post(
          "https://online-study-server-iota.vercel.app/jwt",
          { email: res?.user?.email },
          { withCredentials: true }
        );
        // .then((res) => {
        //   console.log(res.data);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        // set name and profileURL
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, photoURL: photo, displayName: name, email });
            toast.success("Successfully Register your Account");

            navigate("/");
          })
          .catch(() => {
            toast.error("something is wrong");
          });
      })
      .catch(() => {
        toast.error("something is wrong");
      });
  };

  return (
    <Fade duration={1500}>
      <div className="flex  justify-center items-center min-h-[calc(100vh-306px)] mt-10">
        <div className="flex w-full border border-gray-100 max-w-sm mx-auto overflow-hidden bg-base-100 rounded-lg shadow-2xl  lg:max-w-4xl ">
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={Logo} alt="" />
            </div>

            <p className="mt-3 text-xl text-center  ">
              Create an account to begin
            </p>

            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium  "
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Name"
                  id="name"
                  autoComplete="name"
                  className="block w-full px-4 py-2  bg-base-100 border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">Name is required.</p>
                )}
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium  "
                  htmlFor="photo"
                >
                  Photo URL
                </label>
                <input
                  {...register("photo", { required: true })}
                  placeholder="Photo URL"
                  id="photo"
                  autoComplete="photo"
                  className="block w-full px-4 py-2  bg-base-100 border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                />
                {errors.photo && (
                  <p className="text-sm text-red-600">Photo is required.</p>
                )}
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium  "
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  id="LoggingEmailAddress"
                  autoComplete="email"
                  className="block w-full px-4 py-2  bg-base-100 border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">Email is required.</p>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium  "
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                </div>
                <input
                  {...register("password", { required: true })}
                  placeholder="Password"
                  id="loggingPassword"
                  autoComplete="current-password"
                  className="block w-full px-4 py-2  bg-base-100 border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />{" "}
                {errors.password && (
                  <p className="text-sm text-red-600">Password is required.</p>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[linear-gradient(45deg,#FF6F61,#9656A1B3)] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4"></span>

              <Link
                to="/login"
                className="text-xs text-gray-500 uppercase  hover:underline"
              >
                or log in
              </Link>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </div>
          <div
            className="hidden bg-cover bg-center lg:block lg:w-1/2"
            style={{
              backgroundImage: `url('/img/sign2.jpg')`,
            }}
          ></div>
        </div>
      </div>
    </Fade>
  );
};

export default Registration;
