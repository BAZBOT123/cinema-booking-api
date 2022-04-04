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
module.exports = {
    findMovie
};
