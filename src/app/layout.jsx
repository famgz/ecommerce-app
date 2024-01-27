import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce App created with NextJS',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <main className='bg-blue-900 text-white w-screen h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
