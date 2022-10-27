const Ship = require("../src/Ship.js");


describe("Ship", () => {

    let dover;
    let itinerary;
    let ship;

  beforeEach(() => {
    dover = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Dover',
    ships: []
  };

    itinerary =  {
      ports: [dover]
    };

    ship = new Ship(itinerary);
  });

  it("can be instantiated", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("has a starting port", () => {
    expect(ship.currentPort).toBe(dover);
  });

  it('gets added to port on instantiation', () => {
    expect(dover.addShip).toHaveBeenCalledWith(ship);
  });

});

describe("setSail", () => {

let dover;
let calais;
let itinerary;

beforeEach(() => {
  dover = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Dover',
    ships: []
  };

  calais = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Calais',
    ships: []
  };

  itinerary =  {
      ports: [dover, calais]
    };
  ship = new Ship(itinerary);
});

  it("can set sail", () => {

    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
  });

  it("port removes ship after setting sail", () => {

    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
    expect(dover.removeShip).toHaveBeenCalledWith(ship);
  });

  it("can\'t sail further than its itinerary", () => {
  
    ship.setSail();
    ship.dock();
  
    expect(() => ship.setSail()).toThrowError("End of itinerary reached");
  });
});

describe("dock", () => {

  let dover;
  let calais;
  let itinerary;
  let ship;

  beforeEach(() => {
    dover = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Dover',
    ships: []
  };

  calais = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Calais',
    ships: []
  };

  itinerary =  {
    ports: [dover, calais]
  };

  ship = new Ship(itinerary);

    ship.setSail();
    ship.dock();
  });

  it("can dock at a different port", () => {

    expect(ship.currentPort).toBe(calais);
  });

  it('port accepts ship upon docking', () => {
  
    expect(ship.currentPort).toBe(calais);
    expect(calais.addShip).toHaveBeenCalledWith(ship);
  });
});