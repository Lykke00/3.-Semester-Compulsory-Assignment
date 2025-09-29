import { Outlet } from "react-router";
import { Navbar } from "./navigation/Navbar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="w-full border-b flex justify-center p-2 bg-zinc-900 border-zinc-700">
        <Navbar />
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <Outlet />
          <Toaster />
        </div>
      </main>
    </div>
  );
}
