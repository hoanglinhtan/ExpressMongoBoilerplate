require('babel-core/register');
require('babel-polyfill');

const Chai = require('chai');
const ChaiHttp = require('chai-http');
const Server = require('../../index');

const User = require('../models/User');
const Event = require('../models/Event');

Chai.use(ChaiHttp);

const authrizationKey = 'x-access-token';
let token = '';
let userId = '';

describe('Events', () => {
    before((done) => {
        User.default
            .create({
                username: 'testing1@gmail.com',
                password: 'abc123',
            })
            .then((data) => {
                Chai.request(Server)
                    .post('/api/auth/login')
                    .send({
                        username: data.username,
                        password: 'abc123',
                    })
                    .end(function (err, res) {
                        userId = res.body.id;
                        token = res.body.accessToken;
                        done();
                    });
            });
    });

    beforeEach(async (done) => {
        Event.default
            .create({
                userId,
                name: 'Initial Event',
                description: 'Description',
                startDate: '2020-04-01T10:00:00.000Z',
                dueDate: '2020-04-02T10:00:00.000Z',
            })
            .then();
        done();
    });

    afterEach((done) => {
        Event.default.collection.drop();
        done();
    });

    after((done) => {
        User.default.deleteOne(
            {
                _id: userId,
            },
            () => {
                done();
            }
        );
    });

    it('TC01 - [200] - Create Event Succeeded', (done) => {
        Chai.request(Server)
            .post('/api/events')
            .set(authrizationKey, token)
            .send({
                name: 'Event Test 01',
                description: 'Description',
                startDate: '2020-01-01T10:00:00.000Z',
                dueDate: '2020-01-01T10:00:00.000Z',
            })
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                Chai.should().equal(res.body.name, 'Event Test 01');
                Chai.should().equal(res.body.description, 'Description');
                Chai.should().equal(res.body.startDate, '2020-01-01T10:00:00.000Z');
                Chai.should().equal(res.body.dueDate, '2020-01-01T10:00:00.000Z');
                done();
            });
    });

    it('TC02 - [400] - Missing Start Date', (done) => {
        Chai.request(Server)
            .post('/api/events')
            .set(authrizationKey, token)
            .send({
                name: 'Event Test 02',
                description: 'Description',
                dueDate: '2020-06-02T10:00:00.000Z',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Start Date is invalid');
                done();
            });
    });

    it('TC03 - [400] - Missing Due Date', (done) => {
        Chai.request(Server)
            .post('/api/events')
            .set(authrizationKey, token)
            .send({
                name: 'Event Test 03',
                description: 'Description',
                startDate: '2020-06-02T09:00:00.000Z',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Due Date is invalid');
                done();
            });
    });

    it('TC04 - 400 - Due Date is less than Start Date', (done) => {
        Chai.request(Server)
            .post('/api/events')
            .set(authrizationKey, token)
            .send({
                name: 'Event Test 04',
                description: 'Description',
                startDate: '2020-06-02T09:00:00.000Z',
                dueDate: '2020-06-02T08:00:00.000Z',
            })
            .end((err, res) => {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Start Date must be less than Due Date');
                done();
            });
    });

    it('TC05 - [400] - Missing page when Get Events', (done) => {
        Chai.request(Server)
            .get('/api/events')
            .set(authrizationKey, token)
            .end(function (err, res) {
                Chai.should().equal(res.status, 400);
                Chai.should().equal(res.body.message, 'Page is invalid');
                done();
            });
    });

    it('TC06 - [400] - List All Events with page and limit', (done) => {
        Chai.request(Server)
            .get('/api/events?page=1&limit=10')
            .set(authrizationKey, token)
            .end(function (err, res) {
                Chai.should().equal(res.status, 200);
                Chai.should().exist(res.body.pageInfo);
                done();
            });
    });

    it('TC07 - [400] - Get An Event', (done) => {
        Event.default
            .create({
                userId,
                name: 'Test',
                description: 'Test description',
                startDate: '2020-05-01T10:00:00.000Z',
                dueDate: '2020-05-02T10:00:00.000Z',
            })
            .then((data) => {
                Chai.request(Server)
                    .get(`/api/events/${data._id}`)
                    .set(authrizationKey, token)
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        Chai.should().equal(res.status, 200);
                        Chai.should().equal(res.body.name, 'Test');
                        Chai.should().equal(res.body.description, 'Test description');
                        Chai.should().exist(res.body.startDate, '2020-05-01T10:00:00.000Z');
                        Chai.should().exist(res.body.dueDate, '2020-05-02T10:00:00.000Z');
                        done();
                    });
            })
            .catch((err) => {
                throw err;
            });
    });

    it('TC08 - [200] - Update An Event Succeeded', (done) => {
        Event.default
            .create({
                userId,
                name: 'Test',
                description: 'Test description',
                startDate: '2020-05-08T08:00:00.000Z',
                dueDate: '2020-05-08T02:00:00.000Z',
            })
            .then((data) => {
                Chai.request(Server)
                    .put(`/api/events/${data._id}`)
                    .set(authrizationKey, token)
                    .send({
                        name: 'Updated Test',
                        description: 'Updated Desc',
                        startDate: '2020-07-08T08:00:00.000Z',
                        dueDate: '2020-07-08T12:00:00.000Z',
                    })
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        Chai.should().equal(res.status, 200);
                        Chai.should().exist(res.body.name);
                        done();
                    });
            })
            .catch((err) => {
                throw err;
            });
    });

    it('TC09 - [400] - Event Not Found when update', (done) => {
        Chai.request(Server)
            .put(`/api/events/5e8d53d54c1b44e2b26972d1`)
            .set(authrizationKey, token)
            .send({
                name: 'Updated Event',
                description: 'Updated Description',
            })
            .end(function (err, res) {
                Chai.should().equal(res.status, 400);
                Chai.should().exist(res.body.message, 'Event is not found');
                done();
            });
    });

    it('TC10 - [400] - Due Date is less than Start Date when update', (done) => {
        Event.default
            .create({
                userId,
                name: 'Test',
                description: 'Test description',
                startDate: '2020-05-01T10:00:00.000Z',
                dueDate: '2020-05-02T10:00:00.000Z',
            })
            .then((data) => {
                Chai.request(Server)
                    .put(`/api/events/${data._id}`)
                    .set(authrizationKey, token)
                    .send({
                        name: 'Update',
                        description: 'Updated Description',
                        startDate: '2020-06-01T10:00:00.000Z',
                    })
                    .end(function (err, res) {
                        Chai.should().equal(res.status, 400);
                        Chai.should().equal(
                            res.body.message,
                            'Start Date must be less than Due Date'
                        );
                        done();
                    });
            });
    });

    it('TC11 - [200] - Delete Event Succeeded', (done) => {
        Event.default
            .create({
                userId,
                name: 'Test Event 11',
                description: 'Description',
                startDate: '2020-05-01T10:00:00.000Z',
                dueDate: '2020-05-02T10:00:00.000Z',
            })
            .then((data) => {
                Chai.request(Server)
                    .delete(`/api/events/${data._id}`)
                    .set(authrizationKey, token)
                    .send({
                        id: data._id,
                    })
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        Chai.should().equal(res.status, 200);
                        Chai.should().equal(res.body, true);
                        done();
                    });
            })
            .catch((err) => {
                throw err;
            });
    });
});
