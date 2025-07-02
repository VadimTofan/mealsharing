import "./globals.css";

import Header from "./components/header-footer/header/header.jsx";
import Footer from "./components/header-footer/footer/footer.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout children={children}></Layout>
      </body>
    </html>
  );
}

export function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="databox">{children}</div>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Meal-Sharing APP",
  description: "This is a Meal-Sharing APP HYF DK",
};
