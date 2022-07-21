import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.bundle.min'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {" "}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
