const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const fileController = require("../controllers/fileController");

// Get all files for a project
router.get("/get/:projectId", authMiddleware, fileController.getProjectFiles);

// Create new file or folder
router.post("/create/:projectId", authMiddleware, fileController.createFileOrFolder);

// Delete file/folder
router.delete("/delete/:fileId", authMiddleware, fileController.deleteFileOrFolder);

// Update only file content (for autosave)
router.put("/update-content/:fileId", authMiddleware, fileController.updateFileContent);

module.exports = router;