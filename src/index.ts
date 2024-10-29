import express from "express";
import cors from "cors";
import routes from "../src/routes";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server Running on http://localhost:5000");
});
