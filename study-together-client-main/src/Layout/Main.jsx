import { Outlet } from "react-router-dom";
import Navbar from "../components/ShareSection/Navbar";
import Footer from "../components/ShareSection/Footer";
import { Toaster } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

const Main = () => {
  return (
    <div>
      <Toaster />
      <div className="">
        <Navbar></Navbar>
      </div>

      <div className="min-h-[calc(100vh-116px-239px)]   ">
        <Outlet></Outlet>
      </div>
      <Fade duration={1500}>
        <div className="mt-20">
          <Footer></Footer>
        </div>
      </Fade>
    </div>
  );
};

export default Main;
