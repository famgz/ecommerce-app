import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/libs/mongodb';

const adminEmails = JSON.parse(process.env.ADMIN_EMAILS);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      if (email && adminEmails.includes(email)) {
        return true; // Allow sign-in
      }
      return false; // Block sign-in for non-admin users
    },
    session: ({ session, token, user }) => {
      const { email } = user;
      if (email && adminEmails.includes(email)) {
        return session;
      }
      return false;
    },
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!(email && adminEmails.includes(email))) {
    throw 'not an admin';
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
