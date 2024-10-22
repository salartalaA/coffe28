import "./globals.css";
import Header from "./components/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "./components/Footer";
import Toastify from "./components/Toastify";
import { AuthProvider } from "./context/AuthContext";
config.autoAddCss = false;
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://28coffee.ir/wp-content/uploads/2023/02/logo_28coffee.webp"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Practice - Project" />
        <title>قهوه 28</title>
      </head>
      <body>
        <AuthProvider>
          <Header />

          {children}
          <Toastify />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
