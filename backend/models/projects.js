const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  projectSlug: { type: String, required: true, unique: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  projectName: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  rootFolder: { type: Schema.Types.ObjectId, ref: "Files"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  settings: {
    autosave: { type: Boolean, default: true },
    frameWork: { type: String, default: "react" },
  },
});

const Project = model("Project", projectSchema);
module.exports = { Project };