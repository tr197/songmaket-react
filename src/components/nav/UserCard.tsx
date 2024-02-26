import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/services/utils/ui-suport";
import { useDispatch } from "react-redux";
import { signOut } from "@/store/auth/slice";

type User = {
  username?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export default function UserCard(props: { user: User }) {
  const dispath = useDispatch();
  return (
    <>
      <Menu as="div" className="relative h-12 py-2 ml-3">
        <div>
          <Menu.Button className="relative flex items-center text-sm focus:text-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {props.user.image ? (
              <img
                className="w-8 h-8 rounded-full"
                src={props.user.image}
                alt=""
              />
            ) : (
              <span className="flex py-1 font-semibold">
                {props.user.username || props.user.email}
              </span>
            )}
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-auto px-1 py-2 mt-3 origin-top-right bg-white border-gray-300 rounded-sm shadow-lg border-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <span className="block px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                {props.user.email}
              </span>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  //   href="/api/auth/signout"
                  onClick={() => dispath(signOut())}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
