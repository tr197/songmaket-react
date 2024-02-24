import NavGroupLogin from "./LoginField";
import Logo from "./Logo";
import SearchingField from "./SearchingField";

export default function Navbar() {
  return (
    <div className="border-b shadow" style={{ backgroundColor: "#FF3179" }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* mobile logo and btns */}
        <div className="flex justify-between pt-3 md:hidden lg:gap-8">
          <Logo />
          <NavGroupLogin />
        </div>

        <div className="relative flex justify-between lg:gap-2">
          <div className="hidden md:flex md:inset-y-0 md:left-0 lg:static">
            <Logo />
          </div>
          <div className="flex-1 min-w-0 md:px-8 lg:px-12">
            <div className="flex items-center py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <SearchingField />
              </div>
            </div>
          </div>

          <div className="flex items-center lg:justify-end">
            <div className="hidden md:flex md:items-center">
              <NavGroupLogin></NavGroupLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
