import express from "express";
import router from "./ProductRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

export default app;