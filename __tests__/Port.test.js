const Port = require("../src/Port");

describe("Port", () => {

  let port;

  beforeEach(() => {
    port = new Port("Leith");
  });

  it("can be instantiated", () => {

    expect(new Port()).toBeInstanceOf(Object);

    });

  it("has a name property", () => {

    expect(port.name).toEqual("Leith");

  });
});

describe("addShip", () => {

  let port;
  let titanic;
  let queenMary;

  beforeEach(() => {
    port = new Port("Dover");
    titanic = jest.fn();
    queenMary = jest.fn();
  });

  it("can add a ship", () => {

    port.addShip(titanic);

    expect(port.ships).toContain(titanic);

    port.addShip(queenMary);

    expect(port.ships).toContain(queenMary);

  });
});

describe("removeShip", () => {

  let port;
  let titanic;
  let queenMary;
  
  beforeEach(() => {
    port = new Port("Dover");
    titanic = jest.fn();
    queenMary = jest.fn();

    port.addShip(titanic);
    port.addShip(queenMary);
  });

  it("can remove a ship", () => {

    port.removeShip(titanic);

    expect(port.ships).not.toContain(titanic);

    port.removeShip(queenMary);

    expect(port.ships).not.toContain(queenMary);

  });
});