import AdminSidebar from "./AdminSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#06070a] text-white">

      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}