import { MovieDb } from 'moviedb-promise'

const moviedb = new MovieDb(process.env.API_KEY!)

export default moviedb
