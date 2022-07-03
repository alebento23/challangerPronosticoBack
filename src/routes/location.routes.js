const functionsClima = require("../controllers/clima.controller");

const route = [
    {
        url: "/location",
        method: "GET",
        handler: functionsClima.locationCity
    },
    {
        url: "/current",
        method: "GET",
        schema: {},
        handler: functionsClima.climaCity
    },
    {
        url: "/current/:city", //opcional
        method: "GET",
        schema: {
            params: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "user city"
                    }
                }
            }
        },
        handler: functionsClima.climaCity
    },
    {
        url: "/forecast",
        method: "GET",
        schema: {},
        handler: functionsClima.pronosticoCity
    },
    {
        url: "/forecast/:city",
        method: "GET",
        schema: {
            params: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "user city"
                    }
                }
            }
        },
        handler: functionsClima.pronosticoCity
    }
];

module.exports = route;
