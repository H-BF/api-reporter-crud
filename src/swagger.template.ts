
import parse from 'json-templates';

export const swaggerTemplate = parse({
  "openapi": "3.0.0",
  "info": {
    "title": "API REPORT CRUD",
    "description": "Описание API запросов для получения результатов API-тестов для HBF",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://{{host}}:{{port}}/api/v1"
    }
  ],
  "paths": {
    "/request": {
      "get": {
        "summary": "Получение данных из request по его uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "uuid записи"
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/response": {
      "get": {
        "summary": "Получение данных из response по его uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "uuid записи"
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/response"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/assertion": {
      "get": {
        "summary": "Получение данных из assertion по его uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "uuid записи"
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/assertion"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/assertions": {
      "get": {
        "summary": "Получение всех записей из assertion для указанного executionUuid",
        "parameters": [
          {
            "in": "query",
            "name": "executionUuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/assertion"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/execution": {
      "get": {
        "summary": "Получение данных из execution по его uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "uuid записи"
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/execution"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/executions": {
      "get": {
        "summary": "Получение всех записей из execution для указанного launchUuid",
        "parameters": [
          {
            "in": "query",
            "name": "launchUuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/execution"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launch_error": {
      "get": {
        "summary": "Получение данных из launch_error по launchUuid",
        "parameters": [
          {
            "in": "query",
            "name": "launchUuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launchError"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launch": {
      "get": {
        "summary": "Получение данных из launch по uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launch"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launchs": {
      "get": {
        "summary": "Получение списка лаунчей подходящих под условия",
        "parameters": [
          {
            "in": "query",
            "name": "pipeline",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "job",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcBranch",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "dstBranch",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "commit",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "hbfTag",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "status",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "create",
                "in_process",
                "finish",
                "error"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/launch"
                  }
                }
              }
            }
          },
                    "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/json_schema": {
      "get": {
        "summary": "Получение данных из json_schema по uuid",
        "parameters": [{
          "in": "query",
          "name": "uuid",
          "required": true,
          "schema": {
            "type": "string"
          }
      }],
      "responses": {
        "200": {
          "description": "Данные успешно получены",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/jsonSchema"
              }
            }
          }          
        },
        "400": {
          "description": "Не корректный запрос",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/error"
              }
            }
          }
        },
        "500": {
          "description": "Серверная ошибка",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/error"
              }
            }
          }
        }        
      }
      }
    },
    "/json_schemas": {
      "get": {
        "summary": "Получение всех записей из json_schema для указанного launchUuid",
        "parameters": [{
          "in": "query",
          "name":"launchUuid",
          "required": true,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/jsonSchema"
                  }
                }
              }
            }            
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }          
        }
      }
    },
  },
  "components": {
    "schemas": {
      "request": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "method": {
            "type": "string",
            "enum": [
              "GET",
              "POST"
            ]
          },
          "header": {
            "type": "object"
          },
          "body": {
            "type": "object"
          }
        }
      },
      "response": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "status": {
            "type": "string"
          },
          "code": {
            "type": "integer"
          },
          "header": {
            "type": "object"
          },
          "body": {
            "type": "object"
          }
        }
      },
      "assertion": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "execution_uuid": {
            "type": "string"
          },
          "json_schema": {
            "type": "object"
          },
          "error_message": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "enum": [
              "pass",
              "fail"
            ]
          }
        }
      },
      "execution": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "request_uuid": {
            "type": "string"
          },
          "response_uuid": {
            "type": "string"
          },
          "fail_count": {
            "type": "number"
          },
          "pass_count": {
            "type": "number"
          }
        }
      },
      "launch": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "date": {
            "type": "string"
          },
          "pipeline": {
            "type": "number"
          },
          "job": {
            "type": "number"
          },
          "src_branch": {
            "type": "string"
          },
          "dst_branch": {
            "type": "string"
          },
          "commit": {
            "type": "string"
          },
          "fail_count": {
            "type": "number"
          },
          "pass_count": {
            "type": "number"
          },
          "duration": {
            "type": "number"
          },
          "hbf_tag": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "create",
              "in_process",
              "finish",
              "error"
            ]
          }
        }
      },
      "launchError": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "messgae": {
            "type": "string"
          }
        }
      },
      "jsonSchema": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "json_schema": {
            "type": "object"
          }
        }
      },
      "error": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "msg": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object"
              }
            ]
          }
        }
      }
    }
  }
})