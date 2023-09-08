const express = require("express"); 
const morgan = require("morgan");
const cors = require("cors");
const app = express(); 
const contactRoutes = require("./routes/contact");
const { NotFoundError } = require("./utils/errors");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/contact", contactRoutes);

app.use("/", (req, res, next) => {
    return res.status(200).json({ ping: "pong" });
});

app.use((req, res, next) => {
    return next(new NotFoundError());
})

app.listen(3002, () => {
    console.log("🚀 Server is running on port 3002");
}); 