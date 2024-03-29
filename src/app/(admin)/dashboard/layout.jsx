import { getServerSession } from 'next-auth';
import { Roboto } from 'next/font/google';
import '@/app/(admin)/dashboard/admin.css';
import '@/app/globals.css';
import LoginWithGoogle from '@/app/(admin)/dashboard/_components/buttons/LoginWithGoogle';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Nav from '@/app/(admin)/dashboard/_components/Nav';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'E-Commerce App Admin',
  description: 'E-Commerce App created with NextJS',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Not logged in
  if (!session) {
    return (
      <html lang='en'>
        <body className={roboto.className}>
          <div className='flex items-center bg-primary min-h-screen'>
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
        <div className='bg-gray-200 text-gray-600 flex min-h-screen'>
          <Nav />
          <main className='bg-white text-gray-700 flex-grow m-2 md:ml-2 rounded-lg px-4 py-6 md:z-50'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
