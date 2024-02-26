import { useState } from "react";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";
import { Profile } from "@/store/auth/slice";

export default function SignupForm() {
  const [registedProfile, setRegistedProfile] = useState<Profile | null>(null);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onInputSomething = () => {
    setErrorMessage(null);
    setRegistedProfile(null);
  };

  const onRegiste = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await AxiosApi.instance.post(ApiUrls.auth.register, {
        username: username,
        password1: password1,
        password2: password2,
        email: email,
      });
      console.log(resp.data);
      setRegistedProfile(resp.data.user);
      // alert(`register successfuly [user: ${username}; email: ${email}]`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error, Try again");
    }
  };

  return (
    <>
      <div className="px-6 py-12 bg-white border shadow sm:rounded-md sm:px-12">
        <form className="space-y-6" onSubmit={onRegiste}>
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
                onInput={onInputSomething}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                // required
                className="px-3 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                onInput={onInputSomething}
                onChange={(e) => setEmail(e.target.value)}
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
                onInput={onInputSomething}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password again
            </label>
            <div className="mt-2">
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                onInput={onInputSomething}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </div>

          <div className="px-1 text-red-700">{errorMessage}</div>
          {registedProfile && (
            <div className="px-1 text-green-700">
              <p>{`register successfuly`}</p>
              <p>{`username: ${registedProfile.username}`}</p>
              <p>{`email: ${registedProfile.email}`}</p>
            </div>
          )}

          <div className="pt-5">
            <button
              type="submit"
              className="flex w-full justify-center rounded-sm bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registe
            </button>
          </div>
        </form>

        <div className="h-8"></div>
      </div>
    </>
  );
}
