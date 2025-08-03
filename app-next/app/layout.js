import "./globals.css";

import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/components/header/components/AuthContext";

export const metadata = {
  title: "Meal-sharing APP",
  description: "This is a Meal-Sharing APP HYF DK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Header />
            <div className="databox">{children}</div>
            <Footer />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
