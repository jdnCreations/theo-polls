import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { trpc } from '../../utils/trpc';

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    'questions.get-by-id',
    { id },
  ]);

  if (!isLoading && !data) {
    return <div>Question not found</div>;
  }

  return <div>{data?.question}</div>;
};

const Questionpage = () => {
  const { query } = useRouter();
  const { id } = query;
  console.log(id);

  const { data, isLoading } = useQuery(['questions.get', { id }]);

  if (!id || typeof id !== 'string') return <div>No ID</div>;

  return <QuestionsPageContent id={id} />;
};

export default Questionpage;
