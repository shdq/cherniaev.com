import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllPostTags, getSortedPostsDataByTag } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";

import Layout from "../../components/layout";
import { Heading, Text } from "spartak-ui";

export default function Tag({ allTaggedPostsData }) {
  const router = useRouter();
  const tag = router.query.tag;
  return (
    <Layout>
      <Head>
        <title>Posts about {tag}</title>
      </Head>
      <Heading as="h1" size="xl" css={{ paddingBottom: "$paddingXS" }}>
        Posts about {tag}
      </Heading>
      <ul className={utilStyles.list}>
        {allTaggedPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Text as={Link} href={`/${id}`} size="xl" color="red">
              {title}
            </Text>
            <Text size="md" secondary css={{ paddingTop: "5px" }}>
              <Date dateString={date} />
            </Text>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  const tagsMap = getAllPostTags();
  const paths = [...tagsMap.keys()].map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const allTaggedPostsData = getSortedPostsDataByTag(tag);
  return {
    props: {
      allTaggedPostsData,
    },
  };
}
