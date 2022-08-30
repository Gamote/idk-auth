// import "tailwindcss/tailwind.css";
import '../styles/globals.css';
import { FC } from 'react';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <div style={{ display: 'flex', maxWidth: 1100 }}>
    <div style={{ flexBasis: '70%', margin: 25 }}>
      <Component {...pageProps} />
    </div>
  </div>
);

export default App;
