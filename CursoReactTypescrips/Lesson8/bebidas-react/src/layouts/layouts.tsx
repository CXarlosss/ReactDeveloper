import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function layouts() {
  return (
    <>
      <Header />
      <main className="container mx-auto py16">
        <Outlet />
      </main>
    </>
  );
}
