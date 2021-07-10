import Head from "next/head";
import Header from "../components/Header";
import NewDocumentSection from "../components/NewDocumentSection";
import DocumentsSection from "../components/DocumentsSection";
import Login from "../components/Login";

import { getSession, useSession } from "next-auth/client";

const Home = () => {
  const [session] = useSession();

  if (!session) return <Login />;

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <NewDocumentSection />

      <DocumentsSection />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
