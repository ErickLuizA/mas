import { MovieDb } from 'moviedb-promise'

const moviedb = new MovieDb(process.env.API_KEY!)

export const getPopularTvShows = async () => {
  const { results } = await moviedb.tvPopular()

  return results
}

export const getAiringTodayTvShows = async () => {
  const { results } = await moviedb.tvAiringToday()

  return results
}

export const getPopularMovies = async () => {
  const { results } = await moviedb.moviePopular()

  return results
}

export const getPlayingNowMovies = async () => {
  const { results } = await moviedb.movieNowPlaying()

  return results
}
