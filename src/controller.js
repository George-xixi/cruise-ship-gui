
(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;

      this.initialiseSea();
      

      document.querySelector('#sailbutton').addEventListener('click', () => {
        this.setSail();
      });
    }
    initialiseSea() {
      const backgrounds = [
        "/images/water0.png",
        "/images/water1.png",
      ];

      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url("${backgrounds[backgroundIndex % backgrounds.length]}")`;
        backgroundIndex += 1;
      }, 1000);
    };
    renderPorts(ports) {

      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';

      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    };
    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);

      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 20}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    };
    renderMessage(message) {
      const newMessageElement = document.createElement('div');
      const viewport = document.querySelector('#viewport');
      newMessageElement.setAttribute('id', 'message');
      newMessageElement.innerHTML = message;
      viewport.appendChild(newMessageElement);
      
      setTimeout(() => { 
        viewport.removeChild(newMessageElement);
      },2000);
    };
    renderHud() {
      const ship = this.ship;
      const itinerary = this.ship.itinerary
      const currentPortDisplay = document.querySelector('#hud-Current');
      const nextPortDisplay = document.querySelector('#hud-Next');
      const currentPortName = ship.currentPort.name;
      const currentPortIndex = itinerary.ports.indexOf(ship.currentPort);
      const nextPortName = itinerary.ports[currentPortIndex + 1].name;

      currentPortDisplay.innerHTML = `Current Port: ${currentPortName}`;
      nextPortDisplay.innerHTML = `Next Port: ${nextPortName}`;
      
    };
    setSail() {
      const ship = this.ship
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
      const currentPortDisplay = document.querySelector('#hud-Current');
      const nextPortDisplay = document.querySelector('#hud-Next');
      const currentPortName = ship.currentPort.name;

      if (!nextPortElement) {
        this.renderMessage('End of the Line!');
      } else {

      this.renderMessage(`Now departing ${currentPortName}.`);
      const shipElement = document.querySelector('#ship');
      const sailInterval = setInterval(() => {
      const shipLeft = parseInt(shipElement.style.left, 10);
      if (shipLeft === (nextPortElement.offsetLeft - 32)) {
        ship.setSail();
        ship.dock();
        clearInterval(sailInterval);
      }

      shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);

      currentPortDisplay.innerHTML = `Current Port: At sea`;
      
      setTimeout(() => {
        this.renderMessage(`Now arriving at ${ship.itinerary.ports[nextPortIndex].name}.`)
      },5000)
    
      setTimeout(() => {
        currentPortDisplay.innerHTML = (`Current Port: ${ship.itinerary.ports[nextPortIndex].name}`)
      },5000)

      setTimeout(() => {
        nextPortDisplay.innerHTML = (`Next Port: ${ship.itinerary.ports[nextPortIndex + 1].name}`)
      },5000)
    };
    };
  };




if (typeof module !== 'undefined' && module.exports) {
  module.exports = Controller;
} else {
  window.Controller = Controller;
}

}());
