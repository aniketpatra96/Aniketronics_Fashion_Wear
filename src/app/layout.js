import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata = {
  title: "Aniketronics Fashion Wear",
  description: "AniWear.com - Wear the best, feel the best",
  icons: {
    icon: "https://codeswear.com/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EdgeStoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
