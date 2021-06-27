const express = require('express');
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    } )
        .then(() => console.log("MongoDB connection suuccess!!"))
        .catch((e) => {
            console.log(e);
            console.log("Retrying...");
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.enable("trust proxy");
app.use(cors());
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false, 
        saveUninitilized: false,
        httpOnly: true,
        maxAge: 30000
    }
}));

app.use(express.json());

app.get("/api/v1/", (req, resp) => {
    resp.send("<h2>Hi There - Express * NodeJs</h2>")
    console.log("request processed!!");
});

//localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter);

//localhost:3000/api/v1/posts
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

