const connection = require('../config/db')
const fs = require('fs');

module.exports = {
    uploadPost: (req, res) => {
        const text = req.body;
        const imagePath = req.file.filename;
        console.log(text.title)
        console.log(req.file.filename)
        try {
            connection.query('INSERT INTO `post`(`title`, `desc`, `image`) VALUES (?,?,?)',
                [text.title, text.desc, imagePath], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err)
                    }
                    res.status(200).json({ message: 'เพิ่มรูปภาพเรียบร้อยแล้ว' });
                })
        } catch (e) {
            res.status(500).json({ message: "Err upload", e })
        }

        // ทำสิ่งที่ต้องการกับข้อมูลที่ได้จากการอัปโหลดไฟล์
    },

    showPost: (req, res) => {
        try {
            connection.query('SELECT * FROM `post`', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err)
                }
                res.status(200).json(result)
            })
        } catch (e) {
            res.status(500).json({ message: "show post error!!" })
        }
    },

    removePost: (req, res) => {
        const id = req.params.id;
        try {
            connection.query('SELECT * FROM `post` WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error fetching post data", error: err });
                } else {
                    const imageName = result[0].image
                    connection.query('DELETE FROM `post` WHERE id = ?',
                        [id], async (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ message: "error remove!!!", err })
                            }
                            await fs.unlink('../frontend/public/image/' + imageName, (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('deleted successfully')
                                    res.status(200).json("deleted successfully!!")
                                }
                            }
                            )
                        }
                    )
                }
            })
        } catch (e) {
            res.status(500).json({ message: "error remove post", e })
        }
    },

    editPost: (req, res) => {
        const id = req.params.id;
        try {
            connection.query('SELECT * FROM `post` WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error fetching post data", error: err });
                } else {
                    const oldimage = result[0].image
                }
            })
        } catch (e) {
            res.status(500).json({ message: "error remove post", e })
        }
    },



}
