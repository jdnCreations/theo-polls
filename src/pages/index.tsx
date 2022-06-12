import type { NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../db/client';

export default function Home(props: any) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='This is the home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='text-2xl font-light'>WELCOME ABOARD.</h1>
        <code>{props.questions}</code>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestion.findMany();

  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
