import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='This is the home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-2xl font-light'>HELLO</h1>
    </div>
  );
};

export default Home;
