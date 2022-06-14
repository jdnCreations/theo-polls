import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    'questions.get-by-id',
    { id },
  ]);

  if (!isLoading && !data) {
    return <div>Question not found</div>;
  }

  return (
    <div className='p-8 flex flex-col'>
      {data?.isOwner && (
        <div className='bg-red-700 rounded-md p-5'>You made this</div>
      )}
      <div className='text-2xl font-bold'>{data?.question?.question}</div>
      <div>
        {(data?.question?.options as string[])?.map((option) => (
          <div key='adskkq'>{(option as any).text}</div>
        ))}
      </div>
    </div>
  );
};

const Questionpage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== 'string') return <div>No ID</div>;

  // const { data, isLoading } = trpc.useQuery(['questions.get-all', { id }]);

  return <QuestionsPageContent id={id} />;
};

export default Questionpage;
