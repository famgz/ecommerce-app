import { CartContextProvider } from '@/app/(front)/_components/CartContext';
import Header from '@/app/(front)/_components/Header';
import '@/app/(front)/front.css';
import '@/app/globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'E-Commerce App Front',
  description: 'E-Commerce App created with NextJS',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={roboto.className + ' bg-zinc-200'}>
        <div>
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>
        </div>
      </body>
    </html>
  );
}
