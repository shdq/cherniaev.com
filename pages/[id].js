import Head from "next/head";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import light from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";

import { Heading, Text, useTheme } from "spartak-ui";
import { getAllPostIds, getPostData } from "../lib/posts";

import Layout from "../components/layout";
import Date from "../components/date";

export default function Post({ postData }) {
  const { theme } = useTheme();

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
        <Heading as="h1" size="xl" css={{ paddingBottom: "$paddingLG" }}>
          {postData.title}
        </Heading>
        <Text secondary size="md">
          <Date dateString={postData.date} />
        </Text>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node, ...props }) => {
              return (
                <Link
                  href={props?.href}
                  title={props?.title}
                  target={props?.href?.includes("http") ? "_blank" : "_self"}
                >
                  {props?.children?.[0]}
                </Link>
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={theme === "dark" ? dark : light}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
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
