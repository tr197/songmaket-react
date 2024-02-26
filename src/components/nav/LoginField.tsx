import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { AccountState } from "@/store/auth/slice";

export default function NavGroupLogin() {
  const accountStore = useSelector(
    (state: { auth: AccountState }) => state.auth
  );

  if (accountStore.authenticated) {
    return (
      <div className="h-12">
        <UserCard
          user={{
            username: accountStore.profile?.username,
            email: accountStore.profile?.email,
            image: "/images/default-acc.png",
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex justify-between h-12 gap-1">
      <Link to="/signup">
        <button className="h-full px-5 font-bold text-gray-300 text-md hover:text-gray-50">
          Sign up
        </button>
      </Link>
      <Link to="/signin">
        <button className="h-full px-8 font-bold text-gray-800 rounded-full bg-gray-50 text-md hover:bg-gray-200">
          Log in
        </button>
      </Link>
    </div>
  );
}
