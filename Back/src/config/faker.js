// src/controllers/fakeUserGenerator.js
const { catchedAsync } = require('../utils')
const createUser = catchedAsync(require('../controllers/user.controllers/createUser')); // Asegúrate de ajustar la ruta
const createClient = catchedAsync(require('../controllers/client.controllers/createClient')); // Asegúrate de ajustar la ruta
const createProvider = catchedAsync(require('../controllers/provider.controllers/createProvider'));
const createEmployee = catchedAsync(require('../controllers/employee.controllers/createEmployee')); // Asegúrate de ajustar la ruta


const { faker } = require('@faker-js/faker');

const generateFakeUsers = async (count = 3) => {
    for (let i = 0; i < count; i++) {
        const fakeUser = {
            name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        // Crear un nuevo objeto de solicitud para pasar al controlador
        const req = {
            body: fakeUser,
        };

        // Crear un objeto de respuesta simulado
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        console.log(`Status: ${statusCode}`, data);
                    },
                };
            },
        };

        // Llama al controlador
        await createUser(req, res);
    }

    console.log(`${count} fake users generated and created.`);
};

const generateFakeClients = async (count = 23) => {
    for (let i = 0; i < count; i++) {
        const fakeClient = {
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
            contact: faker.phone.number(),
            email: faker.internet.email(),
			address: faker.location.streetAddress(),
        };
	
        // Crear un nuevo objeto de solicitud para pasar al controlador
        const req = {
            body: fakeClient,
        };

        // Crear un objeto de respuesta simulado
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        console.log(`Status: ${statusCode}`, data);
                    },
                };
            },
        };

        // Llama al controlador para crear el cliente
        await createClient(req, res);
    }

    console.log(`${count} fake clients generated and created.`);
};

const generateFakeProviders = async (count = 23) => {
    for (let i = 0; i < count; i++) {
        const fakeClient = {
            name: faker.company.name(),
            contact: faker.phone.number(),
            email: faker.internet.email(),
			address: faker.location.streetAddress(),
        };
	
        // Crear un nuevo objeto de solicitud para pasar al controlador
        const req = {
            body: fakeClient,
        };

        // Crear un objeto de respuesta simulado
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        console.log(`Status: ${statusCode}`, data);
                    },
                };
            },
        };

        // Llama al controlador para crear el cliente
        await createProvider(req, res);
    }

    console.log(`${count} fake clients generated and created.`);
};

const generateFakeEmployees = async (count = 23) => {
    for (let i = 0; i < count; i++) {
        const fakeEmployee = {
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
			hourly_wage: Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000,
        };

        // Crear un nuevo objeto de solicitud para pasar al controlador
        const req = {
            body: fakeEmployee,
        };

        // Crear un objeto de respuesta simulado
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        console.log(`Status: ${statusCode}`, data);
                    },
                };
            },
        };

        // Llama al controlador para crear el empleado
        await createEmployee(req, res);
    }

    console.log(`${count} fake employees generated and created.`);
};

module.exports = {
    generateFakeUsers,
	generateFakeClients,
	generateFakeEmployees,
	generateFakeProviders,
};
