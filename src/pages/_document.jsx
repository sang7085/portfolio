// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
