import Header from "./components/header-footer/Header.jsx";
import Footer from "./components/header-footer/footer.jsx";
import Main from "./components/main/main.jsx";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Meal-Sharing APP",
  description: "This is a Meal-Sharing APP HYF DK",
};
