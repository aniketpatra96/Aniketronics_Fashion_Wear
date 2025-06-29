"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartContext from "@/contexts/CartContext";
import UserContext from "@/contexts/UserContext";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useMemo } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isSecretPage, setIsSecretPage] = useState(false);
  const protectedPaths = useMemo(
    () => [
      "/login",
      "/signup",
      "/myaccount",
      "/order",
      "/orders",
      "/orderdetails",
    ],
    []
  );

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");

    if (protectedPaths.includes(pathname) && !token) {
      router.push("/login");
    }
  }, [pathname, protectedPaths, router]);

  useEffect(() => {
    setIsSecretPage(pathname === "/secret");
    setProgress(100);
  }, [pathname]);

  if (!hasMounted) return null;
  return isSecretPage ? (
    children
  ) : (
    <UserContext>
      <CartContext>
        <LoadingBar
          color="#ff2d55"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={400}
        />
        <Navbar />
        {children}
        <Footer />
      </CartContext>
    </UserContext>
  );
}
