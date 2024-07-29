import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    //Validation
    if (!name) {
      return res.status(401).send({ message: "Category Name is requireds" });
    }
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory)
      return res
        .status(200)
        .send({ success: true, message: "Category already exists" });

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "New category created", data: category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Category",
    });
  }
};

//Get All Categories
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All categories", categories });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Categories",
    });
  }
};

//Get Single Category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category)
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    res.status(200).send({
      success: true,
      message: "Category successfully found",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single Category",
    });
  }
};

//Delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting Category",
    });
  }
};
