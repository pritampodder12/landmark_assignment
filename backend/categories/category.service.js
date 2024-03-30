const db = require("_helpers/db");
const Category = db.Category;

module.exports = {
  getSubCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

async function getSubCategory(parentId) {
  if (!parentId) {
    return await Category.find({ parentId: null });
  }
  return await Category.find({ parentId });
}

async function createCategory(reqBody) {
  if (!reqBody.categoryName) {
    throw "categoryName field is required!";
  }

//   if (await Category.findOne({ categoryName: reqBody.categoryName })) {
//     throw 'Category "' + reqBody.categoryName + '" is already taken';
//   }

  const category = new Category();

  category.categoryName = reqBody.categoryName;

  if (reqBody.parentId) {
    //Checking if the parent is exists on DB
    const parent = await Category.findById(reqBody.parentId);
    if (!parent) throw "Parent not found!";

    category.parentId = reqBody.parentId;

    //Seting the hasChild field to true for parentId

    const updatedParent = {
      hasChild: true,
    };
    Object.assign(parent, updatedParent);
    await parent.save();
  }
  return new Promise((resolve, reject) => {
    category
      .save()
      .then((savedDoc) => {
        id = savedDoc.id;
        resolve(id);
      })
      .catch((err) => reject(err));
  });
}

async function updateCategory(reqBody) {
  if (!reqBody.categoryId) {
    throw "categoryId field is required!";
  }
  if (!reqBody.newName) {
    throw "newName field is required!";
  }

  const category = await Category.findById(reqBody.categoryId);
  if (!category) {
    throw "Category ID not found";
  }
//   if (await Category.findOne({ categoryName: reqBody.newName })) {
//     throw 'Category "' + reqBody.newName + '" is already taken';
//   }

  const updatedObj = {
    categoryName: reqBody.newName,
  };

  Object.assign(category, updatedObj);

  await category.save();
}

async function deleteCategory(id) {
  if(!id) {
    throw "categoryId field is required!";
  }
  const category = await Category.findById(id);
  if (!category) {
    throw "Category ID not found";
  }
  await Category.findByIdAndRemove(id);

  await Category.find({parentId: id}).remove();
}