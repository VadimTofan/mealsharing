import "./globals.css";

import Header from "./components/header-footer/header/header.jsx";
import Footer from "./components/header-footer/footer/footer.jsx";

export const metadata = {
  title: "Meal-sharing APP",
  description: "This is a Meal-Sharing APP HYF DK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="databox">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
