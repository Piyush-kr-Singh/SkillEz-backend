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

// tackling the cors policy  
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET , POST, PUT, PATCH,DELETE,HEAD",
    credentials: true
}
app.use(cors(corsOptions));


// this middleware is used to parse the json data from requests and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Mount the Router : To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);


// service form route
app.use("/api/service", webdevFormRoute);

// resume review form route
app.use("/api/service", resumeReviewFormRoute);

// resume build form route
app.use("/api/service", resumeBuildFormRoute);

// resume build form route
app.use("/api/service", mockInterviewFormRoute);



// lets define the admin route
app.use("/api/admin", adminRoute);

// contact admin message route
app.use("/api/admin", adminContactRoute);

// this is the error middleware
app.use(errorMiddleWare);

// newsLetter route
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

