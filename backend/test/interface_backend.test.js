const expect = require('chai').expect;
const request = require('supertest');	// Used for testing posting data

const APP = 'http://localhost:3001';


const EXPECTED_LOGIN = 'DevonSav';

// user-search
describe(`Interface backend GET requests for user-search`, ()=>{
    it(`should respond with json with an 'avatar_url' and 'login' property`, function(done) {
        request(APP)
            .get('/user-search?name=DevonSav')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                if (error) return done(error);	// rethrow to fail the test case
                expect(response.body).to.have.property('avatar_url');
                expect(response.body).to.have.property('login');
                return done();
            });
    });
    it(`'login' should be '${EXPECTED_LOGIN}'`, function(done) {
        request(APP)
            .get('/user-search?name=DevonSav')
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body.login).to.equal(EXPECTED_LOGIN);
                return done();
            });
    });
});

// repo-search
// This only works for certain using this username (as I know there are available repos)
describe(`Interface backend GET requests for repo-search`, ()=>{
    it(`should respond with an array containing json with an 'id' property`, function(done) {
        request(APP)
            .get('/repo-search?name=DevonSav')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body[0]).to.have.property('id');
                return done();
            });
    });
    it(`'id' should not be 'undefined'`, function(done) {
        request(APP)
            .get('/repo-search?name=DevonSav')
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body[0].id).to.not.equal(undefined);
                return done();
            });
    });
});

// commit-search
describe(`Interface backend GET requests for commit-search`, ()=>{
    it(`should respond with an array containing json with an 'sha' property`, function(done) {
        request(APP)
            .get('/commit-search?name=DevonSav&repo=car-manager')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body[0]).to.have.property('sha');
                return done();
            });
    });
    it(`'sha' should not be 'undefined'`, function(done) {
        request(APP)
            .get('/commit-search?name=DevonSav&repo=car-manager')
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body[0].sha).to.not.equal(undefined);
                return done();
            });
    });
});