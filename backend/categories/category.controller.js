const express = require("express");
const router = express.Router();
const categoryService = require("./category.service");

router.get("/getSubCategory/:parentId", getSubCategory);
router.get("/getSubCategory", getSubCategory);
router.post("/create", createCategory);
router.post("/update", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;

function getSubCategory(req, res, next) {
  categoryService
    .getSubCategory(req.params.parentId)
    .then((categories) => res.json(categories))
    .catch((err) => next(err));
}

function createCategory(req, res, next) {
  categoryService
    .createCategory(req.body)
    .then((id) => {
      return res.send({
        status: 200,
        message: "Category created successfully",
        categoryId: id,
      });
    })
    .catch((err) => next(err));
}

function updateCategory(req, res, next) {
  categoryService
    .updateCategory(req.body)
    .then(() => {
      return res.send({
        status: 200,
        message: "Category updated successfully",
      });
    })
    .catch((err) => next(err));
}

function deleteCategory(req, res, next) {
  categoryService
    .deleteCategory(req.params.id)
    .then(() => {
      return res.send({
        status: 200,
        message: "Category deleted successfully",
      });
    })
    .catch((err) => next(err));
}
