"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartContext from "@/contexts/CartContext";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useMemo } from "react";
import { SessionProvider } from "next-auth/react";
import UserContext from "@/contexts/UserContext";
import ProtectedWrapper from "./ProtectedWrapper";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isSecretPage, setIsSecretPage] = useState(false);

  useEffect(() => {
    setIsSecretPage(pathname === "/secret");
    setProgress(100);
  }, [pathname]);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  },[pathname]);

  if (!hasMounted) return null;
  return isSecretPage ? (
    children
  ) : (
    <SessionProvider>
      <UserContext>
        <CartContext>
          <LoadingBar
            color="#ff2d55"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            waitingTime={400}
          />
          <ProtectedWrapper>
            <Navbar />
            {children}
            <Footer />
          </ProtectedWrapper>
        </CartContext>
      </UserContext>
    </SessionProvider>
  );
}
