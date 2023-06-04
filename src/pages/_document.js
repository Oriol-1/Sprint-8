import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es" dir="ltr">
      <Head>
        <meta name="description" content="api star wars" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Coustard:wght@400;900&family=Foldit:wght@100;200&display=swap" />
        <link rel="stylesheet" href='https://necolas.github.io/normalize.css/8.0.1/normalize.css' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}