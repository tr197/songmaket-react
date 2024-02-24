import Navbar from "@/components/nav/Navbar";
import Banners from "@/components/home/Banners";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Banners />
        <h1 className="text-3xl font-bold underline text-sky-700 bg-slate-100">
          Hello world!
        </h1>
      </div>
    </>
  );
}

export default HomePage;
