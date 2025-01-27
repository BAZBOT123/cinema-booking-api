const prisma = require('../utils/prisma');

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body;

    /**
     * This `create` will create a Customer AND create a new Contact, then automatically relate them with each other
     * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
     */
    const createdCustomer = await prisma.customer.create({
        data: {
            name,
            contact: {
                create: {
                    phone,
                    email
                }
            }
        },
        // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
        // This is like doing RETURNING in SQL
        include: {
            contact: true
        }
    })

    res.json({ data: createdCustomer });

}


//Build a single route to update a Customer sending back the updated details in the response
//EXT update the same route to also update their contact details
const updateCustomer = async (req, res) => {
    const { name, phone, email } = req.body

    const updateCustomer = await prisma.customer.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name,
            contact: {
                update: {
                    phone,
                    email
                }
            }
        }

    })
    res.json({ data: updateCustomer });
}






module.exports = {
    createCustomer, updateCustomer
};
