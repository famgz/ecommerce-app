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

  // Not logged in
  if (!session) {
    return (
      <html lang='en'>
        <body className={roboto.className}>
          <div className='flex items-center bg-blue-900 min-h-screen'>
            <div className='text-center w-full'>
              <LoginWithGoogle />
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Logged in
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div className='bg-blue-900 text-white flex min-h-screen'>
          <Nav />
          <main className='bg-white text-gray-700 flex-grow m-2 ml-0 rounded-lg p-4'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
