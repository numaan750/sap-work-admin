"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/Context/appcontext";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/Components/sidebar";

export default function ClientLayout({ children }) {
  const { isAuthenticated } = useContext(AppContext); // 👈 yahan se dono lo
  const router = useRouter();
  const pathname = usePathname();

  // Redirects
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    } 
    console.log(isAuthenticated);
  }, [isAuthenticated, pathname, router]);

  // Login ya Signup page par sidebar mat dikhao
  if (pathname === "/login" || pathname === "/signup" ) {
    return <div className="w-full h-screen">{children}</div>;
  }

  // Otherwise show sidebar layout
  return (
    <div className="flex h-screen w-full">
      <div>
        <Sidebar />
      </div>
      <div className="w-[80%] overflow-y-auto">{children}</div>
    </div>
  );
}
