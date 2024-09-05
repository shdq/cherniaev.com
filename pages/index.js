import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getAllPostTags, getSortedPostsData } from "../lib/posts";
import { Badge, Heading, Text } from "spartak-ui";

export default function Home({ allPostsData, allTags }) {
  const tags = allTags || [];
  const badges = tags.map((tag) => (
    <Link href={`/tag/${tag.split(" ").join("-")}`} key={tag}>
      <Badge
        size="md"
        css={{ margin: "8px 4px 0 0" }}
        variant="outlined"
        color="green"
      >
        {tag.toLowerCase()}
      </Badge>
    </Link>
  ));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Text size="xl" align="center" secondary>
          Full Stack Engineer, Google certified Mobile Web Specialist
        </Text>
        <Text size="xl" align="center" secondary>
          Typescript &#183; React &#183; Node.js
        </Text>
        <Text size="md" align="center">
          <Text
            as="a"
            color="red"
            href="https://twitter.com/shdq"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Text>{" "}
          <span>&#183;</span>{" "}
          <Text
            as="a"
            color="red"
            href="https://github.com/shdq"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Text>{" "}
          <span>&#183;</span>{" "}
          <Text
            as="a"
            color="red"
            href="https://www.linkedin.com/in/cherniaev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Text>
        </Text>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Heading size="xl">Blog</Heading>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Text as={Link} href={`/${id}`} size="xl" color="red">
                {title}
              </Text>
              <Text size="md" secondary>
                <Date dateString={date} />
              </Text>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Heading size="xl">Topics</Heading>
        {badges}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const tagsMap = getAllPostTags();
  const allTags = [...tagsMap.values()];
  return {
    props: {
      allPostsData,
      allTags,
    },
  };
}
