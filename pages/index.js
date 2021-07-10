import Head from "next/head";
import Header from "../components/Header";
import NewDocumentSection from "../components/NewDocumentSection";
import DocumentsSection from "../components/DocumentsSection";

const Home = () => (
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

export default Home;
