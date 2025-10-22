import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getLocalUser, logoutUserFunction } from "../utils/UserUtils";
import { getUserProjects, createProject } from "../api's/ProjectAp";

const AppNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  // Fetch user and projects on load
  useEffect(() => {
    const localUser = getLocalUser();
    if (localUser) {
      setUser(localUser);
      fetchUserProjects();
    }
  }, []);

  // Fetch projects from backend
  const fetchUserProjects = async () => {
    try {
      const data = await getUserProjects();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await logoutUserFunction();
    setUser(null);
    navigate("/login");
  };

  // Handle modal input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle create project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const created = await createProject(newProject);
      setProjects((prev) => [...prev, created]);
      setShowModal(false);
      setNewProject({ name: "", description: "" });
      alert("Project created successfully!");
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project");
    }
  };

  return (
    <>
      {/* ---------- NAVBAR ---------- */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="fw-bold text-light"
            style={{ cursor: "pointer" }}
          >
            React IDE
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {user ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="secondary" id="project-dropdown">
                      {user.firstName}'s Projects
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-dark text-light">
                      {projects.length > 0 ? (
                        projects.map((proj) => (
                          <Dropdown.Item
                            key={proj._id}
                            onClick={() => navigate(`/project/${proj._id}`)}
                            className="text-light"
                          >
                            {proj.name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item className="text-light">
                          No projects yet
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => setShowModal(true)}
                        className="text-success fw-semibold"
                      >
                        + Create New Project
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="outline-light"
                    size="sm"
                    className="ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ---------- CREATE PROJECT MODAL ---------- */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateProject}>
          <Modal.Body className="bg-dark text-light">
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={handleInputChange}
                required
                className="bg-secondary text-light border-0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter project description"
                value={newProject.description}
                onChange={handleInputChange}
                required
                className="bg-secondary text-light border-0"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AppNavbar;
