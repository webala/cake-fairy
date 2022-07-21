import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({account, profile}) {
        if (account.provider === 'google') {
            return profile.email === 'webala1001@gmail.com'
        }
        return true // Verification for other providers
    }
  }
});
