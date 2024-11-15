import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

//Create Product
productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  await collection.insertOne(productData);
  return res.json({
    message: "Product has been created successfully",
  });
});

//View All products
productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const result = await collection.find().toArray();
  return res.json({ data: result });
});

//View by ID
productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  const result = await collection.findOne({ _id: productId });
  return res.json({ data: result });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const newProduct = {...req.body};
  const productId = new ObjectId(req.params.id);

  await collection.updateOne({_id:productId},{$set: newProduct});
  return res.json({
 "message": "Product has been updated successfully"
})
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);

  await collection.deleteOne({_id:productId});
  return res.json({
 "message": "Product has been updated successfully"
})
});

export default productRouter;
