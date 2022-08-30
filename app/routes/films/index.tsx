import type { LoaderFunction } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { Films } from '~/api/films';
import { getFilms } from '~/api/films';
import Button from '~/components/Button';

export const loader: LoaderFunction = async ({ request }) => {
  invariant(request.url, 'expected params.characterId');
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  return getFilms(title);
};

export default function Parent() {
  const data = useLoaderData<Films[]>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films </h1>
      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search {''}
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>

        <Button msg="Go" />
      </Form>
      <div className="grid grid-cols-4 gap-4">
        {data.map((film: any) => {
          return (
            <Link
              title={film.title}
              key={film.id}
              to={film.id}
              prefetch="intent"
              className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            >
              <p>{film.title}</p>
              <img src={film.image} alt={film.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
