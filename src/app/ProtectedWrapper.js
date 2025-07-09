import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

const ProtectedWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const protectedPaths1 = useMemo(
    () => ["/myaccount", "/order", "/orders", "/orderdetails", "/payment"],
    []
  );
  const protectedPaths2 = useMemo(() => ["/signup", "/login"], []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (protectedPaths1.includes(pathname) && token === null) {
      router.push("/login");
    }
    if (protectedPaths2.includes(pathname) && token !== null) {
      router.push("/");
    }
  }, [pathname, protectedPaths1, protectedPaths2, router]);

  return children;
};

export default ProtectedWrapper;
