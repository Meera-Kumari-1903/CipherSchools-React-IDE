import IDEbackend from "./IDEbackend";

// Create a new project
export const createProject = async (projectData) => {
  const { data } = await IDEbackend.post("api/projects/create", projectData);
  return data;
};

// Get all projects of the logged-in user
export const getUserProjects = async () => {
  const { data } = await IDEbackend.get("api/projects/get");
  return data;
};

// Update an existing project
export const updateProject = async (projectId, projectData) => {
  const { data } = await IDEbackend.put(`api/projects/update/${projectId}`, projectData);
  return data;
};

// Delete a project
export const deleteProject = async (projectId) => {
  const { data } = await IDEbackend.delete(`api/projects/delete/${projectId}`);
  return data;
};

