import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Heading, Text, Avatar, useTheme } from "spartak-ui";
import { Toggle } from "./toggle";
import { invertSvg, reduceImageBrightness, invertBackgroundCodeColor } from "../themes/helpers";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import profilePic from "../public/images/userpic.jpg";

const name = "Sergei Cherniaev";
export const siteTitle = "Sergei Cherniaev's blog";

export default function Layout({ children, home }) {
  const { theme } = useTheme();

  useEffect(() => {
    invertSvg(theme);
    reduceImageBrightness(theme);
    invertBackgroundCodeColor(theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {home ? (
          <>
            <div className={styles.flexRight}>
              <Toggle />
            </div>
            <header className={styles.header}>
              <Image
                src={profilePic}
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
                placeholder="blur"
              />
              <Heading as="h1" size="xxl" css={{ padding: "$paddingLG 0" }}>
                {name}
              </Heading>
            </header>
          </>
        ) : (
          <div className={styles.spaceBetween}>
            <header className={styles.postHeader}>
              <Link href="/">
                <Avatar round size="md" src={profilePic.src} alt={name} />
              </Link>
              <Heading as="p" size="lg" css={{ padding: "$paddingLG 0" }}>
                <Link
                  href="/"
                  className={`${utilStyles.colorInherit} ${utilStyles.blogLink}`}
                >
                  {name}{" "}
                  <Text as="span" secondary>
                    Blog
                  </Text>
                </Link>
              </Heading>
            </header>
            <Toggle />
          </div>
        )}
      </>
      <main>{children}</main>
      {!home && (
        <Text as={Link} href="/" size="md" color="red">
          ← Back to home
        </Text>
      )}
    </div>
  );
}
