import { Form, useActionData, useTransition } from '@remix-run/react';
import type { CommentEntry } from '~/api/comments';
import Button from './Button';
import InputForm from './InputForm';

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const transition = useTransition();

  const actionData = useActionData();

  return (
    <div>
      <h2 className="text-3xl mb-2">Community Comments</h2>
      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 rounded border border-slate-400">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}

        <div className="p-4 rounded border border-slate-400">
          <Form method="post" action={`/films/${filmId}`}>
            <fieldset disabled={transition.state === 'submitting'}>
              <InputForm data={actionData} msg="Name:" />

              <InputForm data={actionData} msg="Message:" />

              <Button
                msg={
                  transition.state === 'submitting'
                    ? 'Adding...'
                    : 'Add comment'
                }
              />
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
