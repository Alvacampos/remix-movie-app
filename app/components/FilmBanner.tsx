import { Link } from '@remix-run/react';
import type { Films } from '~/api/films';

type FilmBannerProps = {
  film: Films;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <div>
      <div className="w-full h-120 overflow-hidden relative">
        <div className="w-full h-full flex flex-col absolute justify-between items-start">
          <Link to="/films" className="text-white p-5 text-2xl hover:underline">
            {' '}
            Go Back
          </Link>
          <div className="bg-slate-700/60 p-5">
            <div className="texxt-6xl font-bold text-white">{film.title}</div>
          </div>
        </div>
        <img
          src={film.movie_banner}
          className="w-full h-auto"
          style={{ marginTop: -100 }}
          alt={film.title}
        />
      </div>
    </div>
  );
}
