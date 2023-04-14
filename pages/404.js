import Layout from "../components/layout";
import Head from "next/head";
import { Heading } from "spartak-ui";

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Heading as="h1" size="xl">404 - Page Not Found</Heading>
    </Layout>
  );
}
