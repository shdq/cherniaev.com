import { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Date from "../components/date";
import { getAllPostIds, getPostData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

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
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: (props) => {
              console.log(props)
              if (!props) props === null;
              return (
                <Link
                  href={props?.href}
                  title={props?.title}
                  target={props?.href?.includes("http") ? "_blank" : "_self"}
                >
                  {props?.children[0]}
                </Link>
              );
            },
          }}
        >
          {postData.contentMarkdown}
        </ReactMarkdown>
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
