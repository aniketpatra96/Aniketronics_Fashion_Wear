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
  const protectedPaths1 = useMemo(
    () => ["/myaccount", "/order", "/orders", "/orderdetails", "/payment"],
    []
  );
  const protectedPaths2 = useMemo(() => ["/signup", "/login"], []);

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");

    if (protectedPaths1.includes(pathname) && token === null) {
      router.push("/login");
    }
    if (protectedPaths2.includes(pathname) && token !== null) {
      router.push("/");
    }
  }, [pathname, protectedPaths1, protectedPaths2, router]);

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
