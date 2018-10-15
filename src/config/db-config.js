// Configuration about database
module.exports = {
    "development": {
        database: "development_tresR",
        username: "",
        password: "",
        params: {
            dialect: 'sqlite',
            storage: 'tres-r.sqlite',
            define: {
                underscore: true
            },
            operatorsAliases: false
        }
    },
    "test": {
        database: "test_tresR",
        username: "",
        password: "",
        params: {
            dialect: 'sqlite',
            storage: 'tres-r.sqlite',
            define: {
                underscore: true
            },
            operatorsAliases: false
        }
    }
};