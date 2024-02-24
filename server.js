require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require("./router/admin-router");
const adminContactRoute = require("./router/contact-admin-router");
const webdevFormRoute = require("./router/webdevform-router");
const resumeReviewFormRoute = require("./router/resume-review-router");
const resumeBuildFormRoute = require("./router/resume-build-router");
const mockInterviewFormRoute = require("./router/mockInterview-router");
const newsLetterRoute = require("./router/newsLetter-router");

const connectDb = require("./utils/db");
const errorMiddleWare = require('./middlewares/error-middleware');
const PORT = 5000;

// Update the origin to 'https://skillez.in'
const corsOptions = {
    origin: "https://www.skillez.in", // Update the origin to the correct domain
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/service", webdevFormRoute);
app.use("/api/service", resumeReviewFormRoute);
app.use("/api/service", resumeBuildFormRoute);
app.use("/api/service", mockInterviewFormRoute);

app.use("/api/admin", adminRoute);
app.use("/api/admin", adminContactRoute);

app.use(errorMiddleWare);

app.use("/api/newsletter", newsLetterRoute);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
