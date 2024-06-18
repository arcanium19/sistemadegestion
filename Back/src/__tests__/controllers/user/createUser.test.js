// __tests__/controllers/api/user/createUser.test.js
const request = require('supertest');
const server = require('../../../server'); // Asegúrate de importar tu aplicación correctamente
const { sequelize, models } = require('../../../config/database');

describe('POST /api/user', () => {
	beforeAll(async () => {
		// Sincronizar la base de datos
		await sequelize.sync({ force: true });
		
	});

	afterAll(async () => {
		// Cerrar la conexión con la base de datos
		await sequelize.close();
	});

	it('should create a user and return 201', async () => {
		const response = await request(server)
			.post('/api/user')
			.send({
				name: 'Julio',
				last_name: 'Manuel',
				email: 'julio@julio.com',
				password: '12345'
			});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('error', false);
		expect(response.body).toHaveProperty('data', 'Usuario creado con éxito');
	});

	it('should return 400 if email is missing', async () => {
		const response = await request(server)
			.post('/api/user')
			.send({
				name: 'Julio',
				last_name: 'Manuel',
				password: '12345'
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'El email es requerido');
	});

	it('should return 400 if name is missing', async () => {
		const response = await request(server)
			.post('/api/user')
			.send({
				last_name: 'Manuel',
				email: 'julio@julio.com',
				password: '12345'
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'El nombre es requerido');
	});

	it('should return 400 if password is missing', async () => {
		const response = await request(server)
			.post('/api/user')
			.send({
				name: 'Julio',
				last_name: 'Manuel',
				email: 'julio@julio.com'
			});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'La contraseña es requerida');
	});

	it('should return 401 if email is already in use', async () => {
		// Crear un usuario inicialmente
		await request(server)
			.post('/api/user')
			.send({
				name: 'Julio',
				last_name: 'Manuel',
				email: 'julio@julio.com',
				password: '12345'
			});

		// Intentar crear otro usuario con el mismo email
		const response = await request(server)
			.post('/api/user')
			.send({
				name: 'Julio',
				last_name: 'Manuel',
				email: 'julio@julio.com',
				password: '12345'
			});

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'El email ya se encuentra en uso');
	});
});
