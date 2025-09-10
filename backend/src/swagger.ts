// src/swagger.ts
export default {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API для управления задачами",
    contact: {
      name: "API Support"
    }
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server"
    }
  ],
  paths: {
    "/api/tasks": {
      get: {
        summary: "Получить все задачи",
        description: "Возвращает список всех задач",
        responses: {
          "200": {
            description: "Список задач",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task"
                  }
                }
              }
            }
          },
          "500": {
            description: "Ошибка сервера"
          }
        }
      },
      post: {
        summary: "Создать новую задачу",
        description: "Создает новую задачу",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTaskDto"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Задача создана",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task"
                }
              }
            }
          },
          "400": {
            description: "Ошибка валидации",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          },
          "500": {
            description: "Ошибка сервера"
          }
        }
      }
    },
    "/api/tasks/{id}": {
      PATCH: {
        summary: "Обновить задачу",
        description: "Обновляет статус задачи",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "UUID задачи",
            schema: {
              type: "string",
              format: "uuid"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTaskDto"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Задача обновлена",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task"
                }
              }
            }
          },
          "400": {
            description: "Ошибка валидации",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          },
          "404": {
            description: "Задача не найдена"
          },
          "500": {
            description: "Ошибка сервера"
          }
        }
      },
      delete: {
        summary: "Удалить задачу",
        description: "Удаляет задачу по ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "UUID задачи",
            schema: {
              type: "string",
              format: "uuid"
            }
          }
        ],
        responses: {
          "204": {
            description: "Задача удалена"
          },
          "400": {
            description: "Ошибка валидации",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          },
          "404": {
            description: "Задача не найдена"
          },
          "500": {
            description: "Ошибка сервера"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Уникальный идентификатор задачи"
          },
          title: {
            type: "string",
            maxLength: 100,
            description: "Название задачи"
          },
          completed: {
            type: "boolean",
            description: "Статус выполнения задачи"
          }
        },
        required: ["id", "title", "completed"]
      },
      CreateTaskDto: {
        type: "object",
        properties: {
          title: {
            type: "string",
            maxLength: 100,
            minLength: 1,
            description: "Название задачи"
          }
        },
        required: ["title"]
      },
      UpdateTaskDto: {
        type: "object",
        properties: {
          completed: {
            type: "boolean",
            description: "Статус выполнения задачи. Поддерживает: true/false, 1/0, 'true'/'false', 'yes'/'no'"
          }
        },
        required: ["completed"]
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Сообщение об ошибке"
          }
        }
      }
    }
  }
};
