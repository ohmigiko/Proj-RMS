import React, { useEffect, useState } from "react";
import BottomNavBar from "./navbars/BottomNavbar";
import { useRouter } from "next/dist/client/router";
import NavbarAdmin from "./navbars/NavbarAdmin";
import SidebarAdmin from "./navbars/SidebarAdmin";

const Layout = ({ children }: any) => {
  const router = useRouter();
  // const isLoginPage = router.asPath.startsWith("/login");
  // const isMenuPage = router.asPath.includes("/menu");
  // const isOrderPage = router.asPath.includes("/order");
  // const isPaymentPage = router.asPath.includes("/payment");
  const isDineInPage = router.asPath.startsWith("/dine-in");
  const isTakeHomePage = router.asPath.startsWith("/take-home");
  const isWaitDineInPage = router.asPath.startsWith("/wait-dine-in");
  const isHistoryPage = router.asPath.startsWith("/history");
  const isAdminPage = router.asPath.startsWith("/admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <div className="font-kanit">
      <main>
        {isAdminPage ? (
          <div className="max-w-screen w-screen max-h-screen min-h-screen h-screen w-screen flex items-start">
            <SidebarAdmin />
            <div className="max-w-screen w-screen max-h-screen min-h-screen h-screen overflow-auto">
              <NavbarAdmin />
              <div className="p-5 bg-gray-200 h-full max-h-full overflow-auto">
                {children}
              </div>
            </div>
          </div>
        ) : isDineInPage ||
          isTakeHomePage ||
          isWaitDineInPage ||
          isHistoryPage ? (
          <div className="h-screen flex flex-col">
            <div className="h-full overflow-auto pb-4">{children}</div>
            <div>
              <BottomNavBar />
            </div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </main>
    </div>
  );
};

export default Layout;
