import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Toggle from "./theme-toggle-button";

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
            <img
              src="/images/userpic.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">

              <img
                src="/images/userpic.jpg"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={name}
              />

            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={`${utilStyles.colorInherit} ${utilStyles.blogLink}`}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
