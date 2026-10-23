import { productModel } from "../models/product.model.js";
import { deleteFile, uploadFiles } from "../services/imagekit.service.js";

export const createProductController = async (req, res) => {
  // const imageUrls = [];
  //console.log("Step1");
  // for (let i = 0; i < req.files.length; i++) {
  //   const res = await uploadFiles({
  //     buffer: req.files[i].buffer,
  //     fileName: req.files[i].originalname,
  //   });
  //   console.log(res);
  //   imageUrls.push({ url: res.url, fileId: res.fileId });
  // }
  // console.log(imageUrls);

  const imageUrls = await Promise.all(req.files.map(async(file)=>{
    const res = await uploadFiles({
      buffer:file.buffer,
      fileName:file.originalname
    })
    console.log(res)
    return {url:res.url,fileId:res.fileId}
  }))
  const { title, description, price, stock, category } = req.body;

  const prod = await productModel.create({
    title,
    description,
    price,
    stock,
    category,
    images: imageUrls,
  });

  res.status(201).json({
    message: "Product created successfully",
    product: prod,
  });
};

export const getAllProductsController = async (req, res) => {
  const prods = await productModel.find();

  if (prods.length === 0) {
    res.status(400).json({ message: "No product in Stock" });
  }

  res.status(200).json({
    message: "Products fetched successfully",
    products: prods,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  const prod = await productModel.findById(id);

  if (!prod) {
    return res.status(404).json({ message: "No product found" });
  }

  res.status(200).json({
    message: "Product fetched successfully",
    product: prod,
  });
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  let prod = await productModel.findById(id);

  if (!prod) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  const fields = ["title", "description", "price", "stock", "size", "category"];

  const updates = {};

  for (let field of fields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }
  //console.log(updates);
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message: "No valid fields provided to update",
      allowedFields,
    });
  }

  prod = await productModel.findByIdAndUpdate(
    id,
     updates ,
    {
      returnDocument: "after",
    },
  );

  return res.status(200).json({
    message: "Product updated successfully",
    product: prod,
  });
};

export const deletedProductController = async (req, res) => {
  const { id } = req.params;

  let prod = await productModel.findById(id);

  if (!prod) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const fileIds = prod.images.map((image) => image.fileId);
  console.log(fileIds)
  await Promise.all(fileIds.map((fileId) => deleteFile(fileId)));

  await productModel.findByIdAndDelete(id);

  res.status(200).json({ message: "Product deleted successfully" });
};
