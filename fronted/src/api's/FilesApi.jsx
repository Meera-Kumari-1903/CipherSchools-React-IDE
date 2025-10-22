import IDEbackend from "./IDEbackend";

// Get all files and folder structure for a project
export const getProjectFiles = async (projectId) => {
  const { data } = await IDEbackend.get(`api/files/get/${projectId}`);
  return data;
};

// Create a new file or folder
export const createFileOrFolder = async (projectId, payload) => {
  const { data } = await IDEbackend.post(`api/files/create/${projectId}`, payload);
  return data;
};

// Delete a file or folder
export const deleteFileOrFolder = async (fileId) => {
  const { data } = await IDEbackend.delete(`api/files/delete/${fileId}`);
  return data;
};

// Update file content (for autosave from Sandpack)
export const updateFileContent = async (fileId, content) => {
  const { data } = await IDEbackend.put(`api/files/update-content/${fileId}`, { content });
  return data;
};