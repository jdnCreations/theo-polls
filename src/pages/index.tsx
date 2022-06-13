import Link from 'next/link';
import { useRef } from 'react';
import { trpc } from '../utils/trpc';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all-my-questions']);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-6 flex flex-col w-full'>
      <div className='header flex w-full justify-between'>
        <div className='text-2xl font-bold'>Your Questions</div>
        <Link href='/create'>
          <a className='bg-gray-300 rounded-md text-gray-800 p-4'>
            Create New Question
          </a>
        </Link>
      </div>
      <div className='flex flex-col'>
        {data.map((question) => {
          return (
            <div className='flex flex-col my-2' key={question.id}>
              <Link href={`/question/${question.id}`}>
                <a>
                  <div>{question.question}</div>
                </a>
              </Link>
              <span>Created on {question.createdAt.toDateString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
