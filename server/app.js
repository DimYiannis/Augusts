require("dotenv").config();
require("express-async-errors");
const axios = require('axios');

//express
const express = require("express");
const app = express();
const path = require("path");

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//DB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const sweatsRouter = require("./routes/sweatsRoutes");
const shirtsRouter = require("./routes/shirtsRoutes");
const bottomsRouter = require("./routes/bottomsRoutes");
const apparelRouter = require("./routes/apparelRoutes");
const likesRouter = require('./routes/likesRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/ordersRoutes');

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "./public"))); 
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: [process.env.DEV, 'https://augustsv2.netlify.app'],
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization']
  })
);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Serve the 'public/uploads' directory as static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
  
//app.options('*', cors()); dev

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.cookie('token', 'someToken', {
    path: '/',
    expires: new Date('2024-12-24T17:20:31.000Z'),
    httpOnly: true,
    //secure: process.env.PROD === "production",
    secure: true, // Set to true for HTTPS connections, production
    // secure: false, // For development, set to false
    sameSite: 'None', // Set to 'None' for cross-origin requests
  });
});

// Define a keep-alive route
app.get("/api/v1/keep-alive", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sweats", sweatsRouter);
app.use("/api/v1/shirts", shirtsRouter);
app.use("/api/v1/bottoms", bottomsRouter);
app.use("/api/v1/apparel", apparelRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening ${port}...`));

    // Periodically send a keep-alive request every 10 minutes (adjust as needed)
    setInterval(() => {
      
      axios.get('https://augusts-production.up.railway.app/api/v1/keep-alive')
      .then(response => console.log(response.data))
      .catch(error => console.error('Keep-alive failed', error));

      console.log("Sending keep-alive request...");
    }, 10 * 60 * 1000);
  } catch (error) {
    console.log(error);
  }
};

start();
