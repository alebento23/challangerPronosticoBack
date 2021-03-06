const axios = require("axios");
const config = require("../config/config");
const moment = require("moment");

const urlIpInfo = config.urlIpInfo;
const urlWeaterApi = config.urlWeaterApi;
const token = config.token;

//paths
const pathWeatherCity = `weather`;
const pathForecastCity = `forecast`;

const getDatosMyCity = async () => {
    try {
        const locationInfo = await axios.get(urlIpInfo);
        return locationInfo.data;
    } catch (error) {
        console.log(error);
        throw "Error location";
    }
};

const getWeaterCity = async (city) => {
    try {
        let url = `${urlWeaterApi}${pathWeatherCity}`;
        const weatherInfo = await axios.get(url, {
            params: {
                q: city,
                lang: "es",
                appid: token,
                units: "metric"
            }
        });

        return weatherInfo.data;
    } catch (error) {
        console.log(error.response.data);
        throw error.response.data;
    }
};

const getForecastCity = async (city) => {
    try {
        let url = `${urlWeaterApi}${pathForecastCity}`;
        const weatherInfo = await axios.get(url, {
            params: {
                q: city,
                lang: "es",
                appid: token,
                units: "metric"
            }
        });

        if (weatherInfo && weatherInfo.data) {
            let datas = weatherInfo.data;
            let days = datas.list;
            let newlistado = [];
            let newDays = [];
            let count = 0;
            let day = "";

            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                let momento = moment(element.dt_txt).format("DD/MM/YYYY");

                if (day === momento) {
                    newDays.push(element);

                    if (days.length - 1 === i)
                        newlistado[count] = {
                            dayString: day,
                            data: newDays
                        };
                } else {
                    newlistado[count] = { dayString: day, data: newDays }; //newDays;

                    count = count + 1;
                    day = momento;

                    newDays = [];
                    newDays.push(element);
                }
            }

            weatherInfo.data.list = newlistado;
        }
        return weatherInfo.data;
    } catch (error) {
        console.log(error.response.data);
        throw error.response.data;
    }
};

const locationCity = (request, reply) => {
    try {
        getDatosMyCity()
            .then((info) => {
                reply.send(info);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        reply.code(404).send("Error internal");
    }
};

const climaCity = async (request, reply) => {
    try {
        const { params } = request;
        let MyCity = {};
        if (params.city) {
            MyCity = params;
        } else {
            MyCity = await getDatosMyCity();
        }

        if (MyCity && MyCity.city) {
            getWeaterCity(MyCity.city)
                .then((info) => {
                    reply.send(info);
                })
                .catch((error) => {
                    console.log(error);
                    reply.code(404).send("city not found");
                });
        } else {
            reply.send("City not found");
        }
    } catch (error) {
        reply.code(404).send("Error internal");
    }
};

const pronosticoCity = async (request, reply) => {
    try {
        const { params } = request;
        let MyCity = {};
        if (params.city) {
            MyCity = params;
        } else {
            MyCity = await getDatosMyCity();
        }

        if (MyCity && MyCity.city) {
            getForecastCity(MyCity.city)
                .then((info) => {
                    reply.send(info);
                })
                .catch((error) => {
                    console.log(error);
                    reply.code(404).send("city not found");
                });
        } else {
            reply.send("City not found");
        }
    } catch (error) {
        reply.code(404).send("Error internal");
    }
};

module.exports = {
    locationCity,
    climaCity,
    pronosticoCity
};
