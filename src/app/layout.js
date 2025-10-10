// RootLayout.jsx
import "./globals.css";
import AppContextProvider from "@/Context/appcontext";
import ClientLayout from "./clientlayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <AppContextProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppContextProvider>
      </body>
    </html>
    
  );
}
  