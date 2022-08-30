import type { CommentEntry } from './comments';
import { getComments } from './comments';

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Films = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
  comments?: CommentEntry[];
};

export async function getFilms(title?: string | null) {
  const response = await fetch('https://ghibliapi.herokuapp.com/films/');

  const films: Films[] = await response.json();

  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmId(filmId?: string) {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  );

  const film: Films = await response.json();

  const comments = await getComments(filmId);

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people')
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters, comments };
}

export async function getFilmCharacter(
  characterId: string
): Promise<FilmCharacter> {
  const res = await fetch(
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  if (!res.ok) {
    throw res;
  }

  return res.json();
}
