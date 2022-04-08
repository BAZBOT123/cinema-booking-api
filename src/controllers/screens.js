const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {
    const {
        number
    } = req.body;
console.log(req.body)

    const createdScreen = await prisma.screen.create({
        data: {
            number: parseInt(number)
        }
    })
    res.json({ data: createdScreen });
}




module.exports = {
    createScreen
};
