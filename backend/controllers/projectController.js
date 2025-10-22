const { Project } = require("../models/projects");
const { Files } = require("../models/files");


// Helper: Convert name to slug
const generateSlug = (name) => name.toLowerCase().trim().replace(/\s+/g, "-");

// Helper: Create minimal default React folder/file structure
const createDefaultStructure = async (projectId, rootFolderId) => {
  // --- Create Folders ---
  const publicFolder = await Files.create({
    projectId,
    parentId: rootFolderId,
    name: "public",
    type: "folder",
  });

  const srcFolder = await Files.create({
    projectId,
    parentId: rootFolderId,
    name: "src",
    type: "folder",
  });

  // --- Create Files ---
  const files = [
    {
      projectId,
      parentId: publicFolder._id,
      name: "index.html",
      type: "file",
      content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
    {
      projectId,
      parentId: srcFolder._id,
      name: "App.js",
      type: "file",
      content: `export default function App() { return <h1>Hello React</h1>; }`,
    },
    {
      projectId,
      parentId: srcFolder._id,
      name: "index.js",
      type: "file",
      content: `import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
    {
      projectId,
      parentId: srcFolder._id,
      name: "App.css",
      type: "file",
      content: `body { font-family: sans-serif; }`,
    },
    {
      projectId,
      parentId: rootFolderId,
      name: "package.json",
      type: "file",
      content: JSON.stringify(
        {
          name: "my-react-app",
          version: "1.0.0",
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
          },
        },
        null,
        2
      ),
    },
  ];

  await Files.insertMany(files);
};

// Controller: Create new project
const createProject = async (req, res) => {
  try {
    const { projectName, description, frameWork } = req.body;
    const userId = req.user._id;

    if (!projectName) {
      return res.status(400).json({ message: "Project name is required" });
    }

    // Create project
    const projectSlug = generateSlug(projectName);
    const project = await Project.create({
      projectSlug,
      userId,
      projectName,
      description,
      settings: { frameWork },
    });

    // Create root folder for project
    const rootFolder = await Files.create({
      projectId: project._id,
      parentId: null,
      name: projectName,
      type: "folder",
    });

    project.rootFolder = rootFolder._id;
    await project.save();

    // Create default React file structure
    await createDefaultStructure(project._id, rootFolder._id);

    res.status(201).json({
      message: "Project created successfully with default React structure",
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects for a user
const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project details
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { projectName, description, settings } = req.body;
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, userId: req.user._id },
      { projectName, description, settings, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project and its files
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOneAndDelete({ _id: projectId, userId: req.user._id });
    if (!project) return res.status(404).json({ message: "Project not found" });

    await Files.deleteMany({ projectId });
    res.status(200).json({ message: "Project and its files deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports =  { createProject, getUserProjects, updateProject, deleteProject };