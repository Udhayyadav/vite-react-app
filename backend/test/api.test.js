const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server'); // Importing your app

describe('Student API Tests', () => {

    // Test GET /students
    it('GET /students should return all students', async () => {
        const res = await request(app).get('/students');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    // Test POST /students
    it('POST /students should create a new student', async () => {
        const newStudent = { name: "Test User", grade: "A" };
        const res = await request(app).post('/students').send(newStudent);
        
        expect(res.status).to.equal(201);
        expect(res.body.student).to.have.property('name', 'Test User');
    });

    // Test PATCH /students/:id
    it('PATCH /students/:id should update a student', async () => {
        const updateData = { grade: "F" };
        // Assuming ID 1 exists (Alice)
        const res = await request(app).patch('/students/1').send(updateData);

        expect(res.status).to.equal(200);
        expect(res.body.student.grade).to.equal('F');
    });

    // Test DELETE /students/:id
    it('DELETE /students/:id should delete a student', async () => {
        // We delete ID 1 which we just updated
        const res = await request(app).delete('/students/1');
        
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Student deleted successfully');
    });
});