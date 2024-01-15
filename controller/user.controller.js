const connection = require('../config/db')
const verifyAuth = require('../middleware/verifyToken')

module.exports = {
    readUser: (req, res) => {
        try {
            connection.query("SELECT * FROM id_card_information", (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err)
                }
                res.status(200).send(result)
            })
        } catch (e) {
            res.status(500).send({ massage: "couldn't read" })
        }
    },
    
    readUserAndCount: (req, res) => {
        console.log("object")
        try {
            // connection.query("SELECT * FROM id_card_information", (err, result) => {
            //     if (err) {
            //         console.log(err);
            //         return res.status(400).send(err)
            //     }
            //     return result
            // })
            connection.query('SELECT COUNT(CASE WHEN added = 1 THEN 1 END ) as Added ,COUNT(CASE WHEN added = 0 THEN 1 END ) as NotAdded FROM id_card_information',
                (err, resultcount) => {
                    if(err) return res.status(500).json(err)
                    console.log(resultcount)
                    res.status(200).send(resultcount)
                })
        } catch (e) {
            res.status(500).send({ massage: "couldn't read" })
        }
    },


    readUserId: (req, res) => {
        try {
            const id = req.params.id
            connection.query('SELECT * FROM `id_card_information` WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send(err)
                }
                res.status(200).send(result)
            })
        } catch (err) {
            res.status(500).send({ massage: "couldn't read", err })
        }
    }

}
