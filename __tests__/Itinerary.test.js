const Itinerary = require("../src/Itinerary");

describe("Itinerary", () => {
  it("can be instantiated", () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });

  it("has a starting port", () => {
    const dover = jest.fn();
    const calais = jest.fn();

    const itinerary = new Itinerary([dover, calais]);

    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
