import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import theme from '../layout/theme';
import ToDoProvider from '../context/ToDoContext';
import AppBarContainer from '../components/AppBar/AppBarContainer';
import DialogContainer from '../components/Dialog/DialogContainer';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

        <title>To DO App</title>

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json"/>
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB"/>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ToDoProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBarContainer/>
            <DialogContainer/>
            <Component {...pageProps} />
          </ThemeProvider>
        </ToDoProvider>
      </QueryClientProvider>
    </>
  );
}
