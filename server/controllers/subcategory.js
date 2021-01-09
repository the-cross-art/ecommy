const Subcategory = require("../models/subcategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const subcategory = await new Subcategory({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.json(subcategory);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create subcategory failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({})
      .sort({ createdAt: -1 })
      .exec();
    if (subcategories) {
      res.json(subcategories);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No categories found");
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  const subcategory = await Subcategory.findOne({ slug }).exec();

  if (subcategory) {
    res.json(subcategory);
  } else {
    console.log(error);
    res.status(400).send("Subcategory not found");
  }
};

exports.update = async (req, res) => {
  const { slug } = req.params;
  const { name } = req.body;

  try {
    const subcategoryUpdated = await Subcategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(subcategoryUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Subcategory not updated");
  }
};

exports.remove = async (req, res) => {
  const { slug } = req.params;
  try {
    const subcategoryDeleted = await Subcategory.findOneAndDelete({
      slug,
    }).exec();
    res.json(subcategoryDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Subcategory not deleted");
  }
};
