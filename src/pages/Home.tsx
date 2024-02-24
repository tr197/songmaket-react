import Navbar from "@/components/nav/Navbar";
import Banners from "@/components/home/Banners";
import SongsGroup from "@/components/home/SongsGroup";
import Footer from "@/components/footer/Footer";


function HomePage() {
  return (
    <>
      <Navbar />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[59rem]">
        <div className="pb-4 sm:pb-10">
          <Banners />
        </div>

        <SongsGroup />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
