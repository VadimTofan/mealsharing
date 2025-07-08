import "./globals.css";

import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

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
