import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p align="center">
          Javascript and React developer, Google certified Mobile Web Specialist
          <br />
          <small>
            <a
              href="https://twitter.com/shdq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>{" "}
            <span>&#183;</span>{" "}
            <a
              href="https://github.com/shdq"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            <span>&#183;</span>{" "}
            <a
              href="https://www.linkedin.com/in/cherniaev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </small>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${id}`}>
                <a className={utilStyles.blogLink}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
