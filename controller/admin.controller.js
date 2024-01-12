const connection = require('../config/db')
const jwt = require('jsonwebtoken')

module.exports = {
    loginAdmin: (req, res) => {
        const user = req.body;
        try {
            connection.query('SELECT * FROM Doctor_And_admin_Table WHERE email=?AND password = ?', [user.email, user.password], (err, result, field) => {
                if (err) {
                    res.status(400).send({ message: "Error login" });
                }
                if (!result.length > 0) {
                    res.status(404).send({ message: "Email or Password is wrong" });
                } else {
                    const token = jwt.sign({ id: result[0].id, isAdmin: result[0].isAdmin }, process.env.JWT_SEC, { expiresIn: "21d"});
                    res.status(200).json({ message: "login successfully!!", user: result[0], token });
                }
            });
        } catch (e) {
            res.status(500).send({ message: "Login error" });
        }
    },
    createAdmin: (req, res) => {

    },
    addPatient: (req, res) => {
        const newPatientId = req.body.patientId; // รับ ID จาก req.body
        const existingId = req.body.id; // รับ ID ที่มีอยู่แล้วจาก req.params
        try {
            connection.query('SELECT `DataPatient` FROM `doctor_and_admin_table` WHERE `id` = ?',
                [existingId], (selectError, selectResults) => {
                    if (selectError) {
                        console.error('Error:', selectError.message);
                        res.status(500).send({ message: "Error retrieving patient data" });
                    } else {
                        const existingDataPatient = JSON.parse(selectResults[0].DataPatient);

                        // ตรวจสอบว่า newPatientId ยังไม่มีใน DataPatient ก่อนที่จะเพิ่ม                                                                                                          
                        if (!existingDataPatient.some(patient => patient.id === newPatientId)) {
                            const newDataPatient = [...existingDataPatient, { id: newPatientId }];

                            // แปลงข้อมูลผู้ป่วยเป็นสตริง JSON
                            const newDataPatientString = JSON.stringify(newDataPatient);
                            try {

                                // ใช้ backticks ในการระบุชื่อคอลัมน์ที่มีช่องว่างหรืออักขระพิเศษ
                                connection.query('UPDATE `doctor_and_admin_table` SET `DataPatient`=? WHERE `id`=?',
                                    [newDataPatientString, existingId], (updateError, updateResults) => {
                                        if (updateError) {
                                            console.error('Error:', updateError.message);
                                            res.status(500).send({ message: "Error updating patient data" });
                                        }
                                    });
                                connection.query('UPDATE `id_card_information` SET`added`=? WHERE `id` =?',
                                    [1, newPatientId], (err, result) => {
                                        if (err) {
                                            console.error('Error:', updateError.message);
                                            res.status(500).send({ message: "Error updating patient data" });
                                        }
                                        res.status(200).send({ message: "เพิ่มผู้ป่วยเรียบร้อยแล้ว" });
                                    })
                            } catch (e) {
                                console.error('Error:', e.message);
                                res.status(500).send({ message: "Error adding patient" });
                            }
                        } else {
                            res.status(200).send({ message: `Patient with ID ${newPatientId} already exists in DataPatient` });
                        }
                    }
                });
        } catch (e) {
            console.error('Error:', e.message);
            res.status(500).send({ message: "Error adding patient" });
        }
    },


    cancelPatient: (req, res) => {
        const patientId = req.body.patientId;
        const id = req.body.id;

        try {
            // ดึงข้อมูลทั้งหมดจากคอลัมน์ DataPatient ในแถวที่มี id เท่ากับ patientId
            connection.query('SELECT `DataPatient` FROM `doctor_and_admin_table` WHERE `id` = ?', [id], (selectError, selectResults) => {
                if (selectError) {
                    console.error('Error:', selectError.message);
                    res.status(500).send({ message: "Error fetching patient data" });
                    return;
                }

                // แปลงข้อมูลจากสตริง JSON เป็นออบเจ็กต์
                const dataPatient = JSON.parse(selectResults[0].DataPatient);

                // ตรวจสอบว่ามี id ที่ต้องการลบหรือไม่
                const indexToRemove = dataPatient.findIndex(patient => patient.id === patientId);

                if (indexToRemove !== -1) {
                    // ลบข้อมูลที่ต้องการออกจากอาเรย์
                    dataPatient.splice(indexToRemove, 1);

                    // แปลงกลับเป็นสตริง JSON
                    const updatedDataPatient = JSON.stringify(dataPatient);
                    try {

                        // ทำการอัพเดทข้อมูลทั้งหมดในคอลัมน์ DataPatient
                        connection.query('UPDATE `doctor_and_admin_table` SET `DataPatient`=? WHERE `id`=?', [updatedDataPatient, id], (updateError) => {
                            if (updateError) {
                                console.error('Error:', updateError.message);
                                res.status(500).send({ message: "Error updating patient data" });
                            } else {
                            }
                        });
                        connection.query('UPDATE `id_card_information` SET`added`=? WHERE `id` =?',
                            [0, patientId], (err, result) => {
                                if (err) {
                                    console.error('Error:', updateError.message);
                                    res.status(500).send({ message: "Error updating patient data" });
                                }
                                res.status(200).send({ message: "Patient cancelled successfully" });
                            })
                    } catch (e) {
                        console.error('Error:', e.message);
                        res.status(500).send({ message: "Error adding patient" });
                    }
                } else {
                    // ถ้าไม่พบ id ที่ต้องการลบ
                    res.status(404).send({ message: "Patient not found" });
                }
            });
        } catch (e) {
            console.error('Error:', e.message);
            res.status(500).send({ message: "Error cancelling patient" });
        }
    },

    
    getDoctorAdmin: (req, res) => {
        const id = req.params.id
        try {
            connection.query('SELECT * FROM Doctor_And_admin_Table WHERE id = ?',
                [id], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    res.status(200).json(result)
                })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
