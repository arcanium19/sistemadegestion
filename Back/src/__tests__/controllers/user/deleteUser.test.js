const request = require('supertest');
const server = require('../../../server');
const { sequelize, models } = require('../../../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

describe('DELETE /api/user/:id', () => {
	let authToken;
	let userData;

	beforeAll(async () => {
		await sequelize.sync({ force: true });
		// Crear usuario de prueba y obtener token de autenticación
		const user = await models.User.create({
			name: 'Usuario Test',
			last_name: 'Apellido Test',
			email: 'usuario@test.com',
			password: await bcrypt.hash('test123', 10),
			role: 'user'
		});
		const response = await request(server)
			.post('/api/user/login')
			.send({
				email: 'usuario@test.com',
				password: 'test123'
			});
		authToken = response.body.data;
		userData = user.toJSON();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should delete a user by ID and return 204', async () => {
		const userToEliminate = await request(server).post('/api/user').send({
			name: 'Usuario para eliminar',
			last_name: 'Apellido a eliminar',
			email: 'usuari333o@test.com',
			password: await bcrypt.hash('test123', 10),
		})

		const userCreated = await models.User.findOne({ where: { email: 'usuari333o@test.com' } })

		const response = await request(server)
			.delete(`/api/user/${userCreated.id}`)
			.set('Authorization', `Bearer ${authToken}`);

		const userIsEliminated = await models.User.findByPk(userCreated.id)
		// Verificar que el usuario ya no existe en la base de datos
		expect(userIsEliminated).toBeNull();
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('error', false);
		expect(response.body).toHaveProperty('data', 'El usuario ha sido eliminado.');
	});

	it('should return 404 if user not found', async () => {
		const userToEliminate = await request(server).post('/api/user').send({
			name: 'Usuario para eliminar',
			last_name: 'Apellido a eliminar',
			email: 'usuari333o@test.com',
			password: await bcrypt.hash('test123', 10),
		})

		const userCreated = await models.User.findOne({ where: { email: 'usuari333o@test.com' } })
		
		await userCreated.destroy()

		const response = await request(server)
			.delete(`/api/user/${userCreated.id}`)
			.set('Authorization', `Bearer ${authToken}`);


		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'Usuario no encontrado.');
	});

	it('should return 401 if not authorized', async () => {
		const response = await request(server)
			.delete(`/api/user/${userData.id}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('error', true);
		expect(response.body).toHaveProperty('message', 'Token de autenticación no proporcionado');
	});
});
