const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  parentId: { type: Schema.Types.ObjectId, ref: "Files", default: null },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["file", "folder"], required: true },
  s3Key: { type: String, default: null },
  language: { type: String },
  content: { type: String, default: "" }, // store code or text
  sizeInBytes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Files = model("Files", fileSchema);
module.exports = { Files };