
(function exportShip() {
class Ship {
  constructor(itinerary) {
    this.itinerary = itinerary;
    this.currentPort = itinerary.ports[0];
    this.previousPort = null;
    this.currentPort.addShip(this)
  };

  setSail() {
    const itinerary = this.itinerary;
    const currentPortInItineraryIndex = itinerary.ports.indexOf(this.currentPort);

    if (currentPortInItineraryIndex === (itinerary.ports.length - 1)) {
      throw new Error('End of itinerary reached');
    }
    
    this.currentPort.removeShip(this);
    this.previousPort = this.currentPort;
    this.currentPort = null;
  };

  dock() {
    const itinerary = this.itinerary;
    const prevPortIndex = itinerary.ports.indexOf(this.previousPort);
    
    this.currentPort = itinerary.ports[prevPortIndex + 1];
    this.currentPort.addShip(this);
  };
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Ship;
} else {
  window.Port = Ship;
}

}());

