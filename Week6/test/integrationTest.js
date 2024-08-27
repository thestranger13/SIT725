const request = require('supertest');
const { expect } = require('chai'); 
const app = require('../server'); 
const { connectToDatabase, getCollection } = require('../startServer'); 

// Integration test 
describe('Vehicle Checker API', function() {
    // connects to the database and closes after the test to clean up 
  before(async function() {
    await connectToDatabase();
  });

  after(async function() {
    await getCollection().db.close();
  });

  // Test (a) - validate that API correctly identifies a valid vehicle number
  it('should return valid response for a valid vehicle number', async function() {
    const validVehicleNumber = '131724';
    const response = await request(app)
      .get(`/checker?vehicle=${validVehicleNumber}`);

    expect(response.status).to.equal(200);
    expect(response.body.valid).to.be.true;
    expect(response.body.message).to.equal('VALID!');
  });

  // Test (b) - validate that API saves a vehicle number not in database
  it('should save and return invalid response for an invalid vehicle number', async function() {
    const invalidVehicleNumber = '000999';
    const response = await request(app)
      .get(`/checker?vehicle=${invalidVehicleNumber}`);

    expect(response.status).to.equal(400);
    expect(response.body.valid).to.be.false;
    expect(response.body.message).to.equal('VEHICLE NOT IN DATABASE - entry saved!');
  });

  // Test (c) - validate that API correctly identifies vehicle number with incorrect format 
  it('should return invalid response for a vehicle number with wrong characters', async function() {
    const invalidVehicleNumber = 'abc999';
    const response = await request(app)
      .get(`/checker?vehicle=${invalidVehicleNumber}`);
  
    expect(response.status).to.equal(400);
    expect(response.body.valid).to.be.false;
    expect(response.body.message).to.equal('Hey Hey! Invalid vehicle number format?!?!');
  });

  // Test (d) - validate that API retrieves a list of saved vehicles
  it('should return saved vehicles', async function() {
    const response = await request(app)
      .get('/checker/saved');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});