const express = require("express");
const app = express();
const { errorHandler, errorConvertor } = require("./middleware/error");
const { status } = require("http-status");
const CustomError = require("./utils/customError");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const morgan = require("./config/morgan");
const { xss } = require("express-xss-sanitizer");
const helmet = require("helmet");
const path = require("path"); 

const {
  googleStrategy,
  serializeUserFunction,
  deserializeUserFunction,
} = require("./config/passport");

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

//initialize passport

app.use(passport.initialize());

app.get("/api/docs", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html')); // Adjust path if docs.html is in a different folder
});

passport.use(googleStrategy);
passport.serializeUser(serializeUserFunction);
passport.deserializeUser(deserializeUserFunction);


app.use(helmet())
app.use(xss());

const userRoute = require('./routes/users');
const postRoute = require('./routes/post');
const catRoute = require('./routes/catagory');


//auth Routes

app.use("/api/auth", authRouter);


// routes

app.use("/api/users",userRoute); // we are using our user route here
app.use("/api/posts",postRoute); // we are using our post route here
app.use("/api/category",catRoute); // we are using our category route here
app.use("/",(req,res)=>{
  res.send("Welcome to the GDG Blogging Website!");
});



//error handler middleware
app.use((req, res, next) => {
  next(new CustomError(status.NOT_FOUND, "Not Found"));
});
app.use(errorConvertor);
app.use(errorHandler);



module.exports = app;
