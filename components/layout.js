import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Heading, Text, useTheme } from "spartak-ui";
import { Toggle } from "./toggle";
import { inverseSvg, reduceImageBrightness } from "../themes/helpers";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import profilePic from "../public/images/userpic.jpg";

const name = "Sergei Cherniaev";
export const siteTitle = "Sergei Cherniaev's blog";

export default function Layout({ children, home }) {
  const { theme } = useTheme();

  useEffect(() => {
    inverseSvg(theme);
    reduceImageBrightness(theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flexRight}>
        <Toggle />
      </div>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src={profilePic}
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
              placeholder="blur"
            />
            <Heading as="h1" size="xxl" css={{ padding: "$paddingLG 0" }}>
              {name}
            </Heading>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                src={profilePic}
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={name}
                placeholder="blur"
              />
            </Link>
            <Heading as="p" size="xl" css={{ padding: "$paddingLG 0" }}>
              <Link
                href="/"
                className={`${utilStyles.colorInherit} ${utilStyles.blogLink}`}
              >
                {name}
              </Link>
            </Heading>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <Text as={Link} href="/" size="md" color="red">
          ← Back to home
        </Text>
      )}
    </div>
  );
}
