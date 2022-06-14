import Link from 'next/link';
import { useRef } from 'react';
import { trpc } from '../utils/trpc';

import { useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateQuestionInputType,
  createQuestionValidator,
} from '../shared/create-question-validator';
import { useRouter } from 'next/router';

const CreateQuestionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateQuestionInputType>({
    resolver: zodResolver(createQuestionValidator),
    defaultValues: {
      options: [{ text: 'Yes' }, { text: 'No' }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: 'options',
      control,
    }
  );

  const { mutate, isLoading, data } = trpc.useMutation('questions.create', {
    onSuccess: (data) => {
      router.push(`/question/${data.id}`);
      reset();
    },
  });

  if (isLoading || data) return <div>Loading...</div>;

  return (
    <div className='antialiased text-gray-100 px-6'>
      <div className='max-w-xl mx-auto py-12 md:max-w-4xl'>
        <h2 className='text-2xl font-bold'>Create a new poll</h2>
        <form
          onSubmit={handleSubmit((data) => {
            mutate(data);
          })}
        >
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
            <div className='grid grid-cols-1 col-span-2 gap-6'>
              <label className='block'>
                <span className='text-gray-200'>Question</span>
                <input
                  {...register('question')}
                  type='text'
                  className='form-input mt-1 block w-full text-gray-800'
                  placeholder='How do magnets work?'
                />
              </label>
              {errors.question && (
                <p className='text-red-400'>{errors.question.message}</p>
              )}
            </div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <section className={'section'} key={field.id}>
                    <input
                      placeholder='name'
                      {...register(`options.${index}.text`, {
                        required: true,
                      })}
                      className='form-input mt-1 block w-full text-gray-800'
                    />
                    <button type='button' onClick={() => remove(index)}>
                      DELETE
                    </button>
                  </section>
                </div>
              );
            })}
            <div>
              <button
                type='button'
                onClick={() => {
                  append({
                    text: 'Another Option',
                  });
                }}
              >
                Add options
              </button>
            </div>
            <div className='grid grid-cols-1 col-span-2 gap-6'>
              <label className='block'>
                <input
                  type='submit'
                  className='form-input text-gray-900'
                  value='Create Question'
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuestionCreator: React.FC = () => {
  return <CreateQuestionForm />;
};

export default QuestionCreator;
