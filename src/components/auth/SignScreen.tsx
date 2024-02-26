import { Link } from "react-router-dom";
import SigninForm from "@/components/auth/SigninForm";
import SignupForm from "./SignupForm";

type SignOption = "signin" | "signup";

export default function SignScreen({ option }: { option: SignOption }) {
  const headerText =
    option === "signin" ? "Sign in to your account" : "Register";

  const redirectLink = option === "signin" ? "/signup" : "/signin";
  const footer =
    option === "signin"
      ? { text1: "Not a member?", text2: "Register" }
      : { text1: "Have an account", text2: "Log in" };

  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/">
            <img
              className="w-auto h-8 mx-auto hover:border-b border-1 hover:border-gray-300"
              src="/images/Logo.png"
              alt="dictionary.tr197.com"
            />
          </Link>
          <h2 className="mt-6 text-xl font-bold leading-9 tracking-tight text-center text-gray-900">
            {headerText}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          {option === "signin" ? <SigninForm /> : <SignupForm />}
          <div className="py-4 text-center">
            <span className="text-gray-500">{footer.text1}</span>
            <Link
              to={redirectLink}
              className="px-1 font-semibold text-sky-800 hover:text-sky-400"
            >
              {footer.text2}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
