const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  categoryName: { type: String, required: true },
  parentId: { type: Schema.ObjectId, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  hasChild: { type: Boolean, default: false },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Category", schema);
