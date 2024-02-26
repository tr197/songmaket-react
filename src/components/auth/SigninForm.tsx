import { useState } from "react";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";
import { SinginResponse, setAuthentication } from "@/store/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SigninForm() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onSingin = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await AxiosApi.instance.post<SinginResponse>(
        ApiUrls.auth.singin,
        {
          username: username,
          password: password,
        }
      );
      dispatch(setAuthentication(resp.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error, Try again");
    }
  };
  return (
    <>
      <div className="px-6 py-12 bg-white border shadow sm:rounded-md sm:px-12">
        <form className="space-y-6" onSubmit={onSingin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="px-3 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                onInput={() => setErrorMessage(null)}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                onInput={() => setErrorMessage(null)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="px-1 text-red-700">{errorMessage}</div>

          <div className="pt-5">
            <button
              type="submit"
              className="flex w-full justify-center rounded-sm bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div>
          <div className="relative mt-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="px-6 text-gray-900 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-7 ">
            <button className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#DC4F41] hover:bg-[#EC5F51] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="15.25"
                viewBox="0 0 488 512"
                className="fill-gray-50"
              >
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              <span className="text-sm font-semibold leading-6">Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
