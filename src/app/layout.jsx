import { Roboto } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import LoginWithGoogle from '@/components/buttons/LoginWithGoogle';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce App created with NextJS',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className='flex items-center'>
        <div className='text-center w-full'>
          <LoginWithGoogle />
        </div>
      </div>
    );
  }

  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div className='bg-blue-900 text-white flex min-h-screen'>
          <Nav />
          <main className='bg-white text-black flex-grow m-2 ml-0 rounded-lg p-4'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}