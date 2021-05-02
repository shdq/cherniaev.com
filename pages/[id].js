import { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Date from "../components/date";
import { getAllPostIds, getPostData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Prism from "prismjs";

export default function Post({ postData }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta
          name="description"
          content={postData.excerpt || "Sergei Cherniaev's blog"}
        />
        <meta property="og:image" content={postData.image} />
        <meta name="og:title" content={postData.title} />
        <meta name="twitter:card" content={postData.image} />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
