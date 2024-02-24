export default function NavGroupLogin() {
  return (
    <div className="flex justify-between h-12 gap-1">
      <a href="/sign-in">
        <button className="h-full px-5 font-bold text-gray-300 text-md hover:text-gray-50">
          Sign up
        </button>
      </a>
      <a href="/sign-in">
        <button className="h-full px-8 font-bold text-gray-800 rounded-full bg-gray-50 text-md hover:bg-gray-200">
          Log in
        </button>
      </a>
    </div>
  );
}
