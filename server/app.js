import express from "express";
import productRouter from "./apps/products.mjs";
import { client } from "./utils/db.js";

async function init() {
  await client.connect();
  const app = express();
  const port = 4001;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/products", productRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

init();

// `cors` เป็น Middleware ที่ทำให้ Client ใดๆ ตามที่กำหนด
// สามารถสร้าง Request มาหา Server เราได้
// ในโค้ดบรรทัดล่างนี้คือให้ Client ไหนก็ได้สามารถสร้าง Request มาหา Server ได้
