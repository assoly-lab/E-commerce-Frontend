import "./globals.css";
import {Toaster} from "react-hot-toast"
import AppContextProvider from "@/Contexts/AppContext";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Info from "@/components/Info";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{

  
  return (
    <html lang="en">
        <AppContextProvider>
          <body className='text-black' >
            <Info />
            <div className="flex w-full pb-4 justify-center">
              <Navbar />
            </div>
            <Toaster position="top-center" />
            {children}
            <Footer />
          </body>
        </AppContextProvider>
    </html>
  );
}
