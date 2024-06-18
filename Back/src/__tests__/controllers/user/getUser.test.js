const request = require('supertest');
const server = require('../../../server');
const { sequelize, models } = require('../../../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

describe('GET /api/users', () => {
    let userData;
    let authToken;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        // Crear usuario de prueba y obtener token de autenticación
        const user = await models.User.create({
            name: 'Admin',
            last_name: 'User',
            email: 'admin@admin.com',
            password: await bcrypt.hash('admin123', 10),
            role: 'admin'
        });
        const response = await request(server)
            .post('/api/user/login')
            .send({
                email: 'admin@admin.com',
                password: 'admin123'
            });
        authToken = response.body.data;
    });

    beforeEach(async () => {
        userData = await models.User.create({
            name: 'Julio',
            last_name: 'Manuel',
            email: 'julio@julio.com',
            password: await bcrypt.hash('12345', 10),
        });
    });

    afterEach(async () => {
        await models.User.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should return all users with status 200', async () => {
        const response = await request(server)
            .get('/api/user')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('error', false);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return 200 and [] if no users found', async () => {
        await models.User.destroy({ where: {} });

        const response = await request(server)
            .get('/api/user')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('error', false);
        expect(response.body).toHaveProperty('data', []);
    });

    it('should return a user by ID with status 200', async () => {
        const response = await request(server)
            .get(`/api/user/${userData.id}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('error', false);
        expect(response.body.data).toHaveProperty('id', userData.id);
    });

    it('should return 404 if user not found', async () => {
        const user_id = uuidv4();
        const response = await request(server)
            .get(`/api/user/${user_id}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', true);
        expect(response.body).toHaveProperty('message', 'Usuario no encontrado.');
    });
});
