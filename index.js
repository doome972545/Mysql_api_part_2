const express = require("express");
const app = express();
const port = 5000;
const connection = require("./config/db")
const dotenv = require("dotenv").config();
const cors = require("cors")
const userRoute = require("./routes/User.routes")
const telemedRoute = require("./routes/Telemed.routes")
const authRoute = require("./routes/Auth.routes")
const adminRoute = require("./routes/Admin.routes")
const sleepRoute = require("./routes/SleepTime.routes")
const uploadRoute = require("./routes/UploadPost.routes")

app.use(cors())
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/telemed', telemedRoute);
app.use('/api/auth', authRoute);
app.use('/api/sleep', sleepRoute);
app.use('/api/admin', adminRoute);
app.use('/api/upload', uploadRoute);

// app.post('/upload', upload.single('image'), (req, res) => {
    
// });
const fs = require('fs');
app.post('/remove', async (req, res) => {
    await fs.unlink('uploads/' + 'upload-1704953586269-pngwing.com.png', (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('deleted successfully')
        }
    })
})

app.listen(port, () => console.log(`Example app listening http://localhost:${port}`));
