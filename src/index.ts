import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);



app.listen(5000, () => {
  console.log("Server Running on http://localhost:5000");
});
