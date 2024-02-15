import { Roboto } from 'next/font/google';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import LoginWithGoogle from './_components/buttons/LoginWithGoogle';
import { authOptions, isAdmin } from '../api/auth/[...nextauth]/route';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'E-Commerce App Front',
  description: 'E-Commerce App created with NextJS',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div>
          {!user && (await isAdmin()) ? (
            <div>
              <LoginWithGoogle />
            </div>
          ) : (
            <div>
              <Link href='/dashboard'>Dashboard</Link>
            </div>
          )}
          {children}
        </div>
      </body>
    </html>
  );
}
