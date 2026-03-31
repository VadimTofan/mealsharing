import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './globals.scss';

import { Header } from '@/app/components/header/Header';
import { Footer } from '@/app/components/footer/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/app/components/header/components/AuthContext';

export const metadata = {
  title: 'Mealsharing',
  description: 'Discover hosted meals, reserve a seat, and turn dinner into a shared experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Header />
            <main className="databox">{children}</main>
            <Footer />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
