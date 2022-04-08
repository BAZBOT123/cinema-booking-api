const prisma = require('../utils/prisma');

const createTicket = async (req, res) => {
    const {
        screeningId,
        customerId 
    } = req.body;
    console.log(req.body)

    const createTicket = await prisma.ticket.create({
        data: {
           screeningId,
           customerId
        },
        include: { 
            screening: true,
            customer: true
        }
    })
    res.json({ data: createTicket });
}




module.exports = {
    createTicket
};
