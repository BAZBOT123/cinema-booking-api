const prisma = require('../utils/prisma');

const findMovie = async (req, res) => {
  const { greaterThan, lessThan } = req.query
  console.log(req.query)
  let where = {}
  if (greaterThan) {
    where = {
      ['runtimeMins']: {
        gt: parseInt(greaterThan)
      }
    }
  }
  if (lessThan) {
    where = {
      ['runtimeMins']: {
        ...where.runtimeMins,
        lt: parseInt(lessThan)
      }
    }
  }
  const foundMovie = await prisma.movie.findMany({
    where,
    include: { screenings: true }
  })
  res.json({ movies: foundMovie });
}


//Build a route to create a new movie
const createMovie = async (req, res) => {
  const {
    title,
    runtimeMins
  } = req.body;
  console.log(req.body)

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    }

  })
  res.json({ data: createdMovie });
}

//Build a route to retrieve a single movie by ID
const movieById = async (req, res) => {

  const movieById = await prisma.movie.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  if (!movieById) {
    res.status(404)
    res.json({ error: 'Movie not found' })
  } else {
    res.json({ data: movieById });
  }
}







module.exports = {
  findMovie, createMovie, movieById
};
