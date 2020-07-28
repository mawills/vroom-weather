import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vroom Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Vroom Weather App
        </h1>

        <p className={styles.description}>
          Begin by choosing an option below:
        </p>

        <div className={styles.grid}>
          <Link href="/current">
            <div className={styles.card} data-testid="current-weather">
              <h3>Current Weather &rarr;</h3>
              <p>Can't look out the window? See the current weather in your area.</p>
            </div>
          </Link>

          <Link href="/fiveday">
            <div className={styles.card} data-testid="five-day-forecast">
              <h3>5-Day Forecast &rarr;</h3>
              <p>See high and low temperatures for the next five days in your area.</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/mawills/vroom-weather"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="github-link"
        >
          See source code on GitHub
        </a>
      </footer>
    </div>
  );
}
