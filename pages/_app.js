import { ThemeProvider } from "spartak-ui";
import { Analytics } from '@vercel/analytics/react';

import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
