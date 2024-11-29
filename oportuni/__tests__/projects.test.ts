import { createRequestResponse, Project } from "./testSetup";
const handler = require('@/src/pages/api/project/projects').default;

describe("Projects API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1 - Classe de equivalência: ID válido
  it("should return 200 if project is found by ID", async () => {
    const mockProject = { ID: 1, name: "Project A", category: "Category 1" };
    Project.findOne.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(mockProject),
    });

    const { req, res } = createRequestResponse("GET", {}, { ID: "1" });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockProject);
  });

  // 2 - Classe de equivalência: ID inválido
  it("should return 404 if project is not found by ID 0", async () => {
    Project.findOne.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(null),
    });

    const { req, res } = createRequestResponse("GET", {}, { ID: "0" });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ message: "Projeto não encontrado" });
  });

  // 4 - Análise de Valor Limite: Limit = 0
  it("should return empty array when limit is zero", async () => {
    Project.find.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValueOnce([]),
    });

    const { req, res } = createRequestResponse("GET", {}, { limit: "0" });
    await handler(req, res);
    expect(Project.find).toHaveBeenCalledWith({});
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([]);
  });

  // 5 - Análise de Valor Limite: Limit = MAX_SAFE_INTEGER
  it("should return all projects when limit is maximum value", async () => {
    const maxLimit = Number.MAX_SAFE_INTEGER;
    const mockProjects = [
      { ID: 1, name: "Project A", category: "Category 1" },
      { ID: 2, name: "Project B", category: "Category 2" },
      { ID: 3, name: "Project C", category: "Category 3" },
    ];
    Project.find.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValueOnce(mockProjects),
    });

    const { req, res } = createRequestResponse("GET", {}, { limit: maxLimit.toString() });
    await handler(req, res);
    expect(Project.find).toHaveBeenCalledWith({});
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockProjects);
  });

  // 6 - Classe de Equivalência: categoria encontrada
  it("should return 200 and projects filtered by category", async () => {
    const mockProjects = [
      { ID: 1, name: "Project A", category: "Category 1" },
    ];
    Project.find.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValueOnce(mockProjects),
    });

    const { req, res } = createRequestResponse("GET", {}, { category: "Category 1" });
    await handler(req, res);
    expect(Project.find).toHaveBeenCalledWith({ category: "Category 1" });
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockProjects);
  });

  // 7 - Classe de Equivalência: nome de projeto encontrado
  it("should return 200 and projects matching the name search", async () => {
    const mockProjects = [
      { ID: 2, name: "Project B", category: "Category 2" },
      { ID: 3, name: "Project B and C", category: "Category 3" },
    ];
    Project.find.mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValueOnce(mockProjects),
    });

    const { req, res } = createRequestResponse("GET", {}, { name: "Project B" });
    await handler(req, res);
    expect(Project.find).toHaveBeenCalledWith({ name: { $regex: "Project B", $options: "i" } });
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockProjects);
  });
});