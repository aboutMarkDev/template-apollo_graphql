import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto">
      <Outlet />
      <Toaster />
    </main>
  );
};

export default Layout;
