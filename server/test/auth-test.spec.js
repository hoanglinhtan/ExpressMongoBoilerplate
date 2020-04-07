require('babel-core/register');
require('babel-polyfill');

const Chai = require('chai');
const HttpClient = require('chai-http');
const App = require('../../index');
const UserModel = require('../models/User');

Chai.use(HttpClient);

describe('Auth', () => {
    beforeEach((done) => {
        Chai.request(App)
            .post('/api/auth/register')
            .send({
                username: `testing1@company.com`,
                password: 'abc123',
            })
            .end(() => {
                done();
            });
    });

    afterEach((done) => {
        UserModel.default.collection
            .drop()
            .then(() => {
                done();
            })
            .catch(() => done());
    });

    after(() => {
        process.exit();
    });

    it('[200] - Register -> Success', (done) => {
        const username = `testing2@company.com`;
        Chai.request(App)
            .post('/api/auth/register')
            .send({
                username,
                password: 'abc123',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 200);
                Chai.should().equal(res.body.username, username);
                done();
            });
    });

    it('[400] - Register -> Missing Username', (done) => {
        Chai.request(App)
            .post('/api/auth/register')
            .send({
                password: 'abc123',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Username is invalid');
                done();
            });
    });

    it('[400] - Register -> Missing Password', (done) => {
        Chai.request(App)
            .post('/api/auth/register')
            .send({
                username: 'testing@gmail.com',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Password is invalid');
                done();
            });
    });

    it('[400] - Register -> Wrong Username', (done) => {
        Chai.request(App)
            .post('/api/auth/register')
            .send({
                username: 'tester',
                password: '123456',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Username is invalid');
                done();
            });
    });

    it('[200] - Login -> Success', (done) => {
        Chai.request(App)
            .post('/api/auth/login')
            .send({
                username: 'testing1@company.com',
                password: 'abc123',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 200);
                Chai.should().equal(res.body.username, 'testing1@company.com');
                done();
            });
    });

    it('[400] - Login -> Missing Username', (done) => {
        Chai.request(App)
            .post('/api/auth/login')
            .send({
                password: 'abc123',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Username is invalid');
                done();
            });
    });

    it('[400] - Login -> Missing Password', (done) => {
        Chai.request(App)
            .post('/api/auth/login')
            .send({
                username: 'testing1@gmail.com',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Password is invalid');
                done();
            });
    });
});
