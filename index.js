"use strict";

const Hapi = require("@hapi/hapi");
const Joi = require("joi");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "POST",
    path: "/apps",
    handler: (request, h) => {
      const length = request?.payload?.apps?.length;
      if (length) {
        return h
          .response({
            numberOfApps: length,
          })
          .code(201);
      } else {
        return h
          .response({
            error: "something is wrong with the payload after validation",
          })
          .code(400);
      }
    },
    options: {
      validate: {
        payload: Joi.object({
          apps: Joi.array().items(Joi.number()),
        }),
      },
    },
  });

  server.route({
    method: "GET",
    path: "/apps",
    handler: (request, h) => {
      return { apps: [1, 2, 3, 4] };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
