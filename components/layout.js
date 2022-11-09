import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Toggle from "./theme-toggle-button";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

import profilePic from "../public/images/userpic.jpg";

const name = "Sergei Cherniaev";
export const siteTitle = "Sergei Cherniaev's blog";

export default function Layout({ children, home }) {
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
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
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
            <h2 className={utilStyles.headingLg}>
              <Link
                href="/"
                className={`${utilStyles.colorInherit} ${utilStyles.blogLink}`}
              >
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
