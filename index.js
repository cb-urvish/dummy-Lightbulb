const { Service, Characteristic } = require("homebridge");

class ExampleLightbulbAccessory {
  constructor(log, config) {
    this.log = log;
    this.name = config["name"] || "Lightbulb";
    this.brightness = 100; // Initial brightness
    this.port = config["port"];
    this.total_switch_Lightbulb = config["total_Lightbulb"];
    this.ip = config["ip"]; 


    // Create a Lightbulb service
    this.service = new Service.Lightbulb(this.name);

    // Set the On characteristic
    this.service
      .getCharacteristic(Characteristic.On)
      .on("get", this.getLightOn.bind(this))
      .on("set", this.setLightOn.bind(this));

    // Set the Brightness characteristic
    this.service
      .getCharacteristic(Characteristic.Brightness)
      .on("get", this.getBrightness.bind(this))
      .on("set", this.setBrightness.bind(this));
  }

  getServices() {
    return [this.service];
  }

  getLightOn(callback) {
    this.log(`Getting power state for ${this.name}`);
    callback(null, true); // Return true to indicate the light is on.
  }

  setLightOn(value, callback) {
    this.log(`Setting power state for ${this.name} to ${value ? "On" : "Off"}`);
    callback(null);
  }

  getBrightness(callback) {
    this.log(`Getting brightness for ${this.name}`);
    callback(null, this.brightness);
  }

  setBrightness(value, callback) {
    this.log(`Setting brightness for ${this.name} to ${value}`);
    this.brightness = value;
    callback(null);
  }
}

module.exports = (homebridge) => {
  homebridge.registerAccessory("ExampleLightbulb", "ExampleLightbulb", ExampleLightbulbAccessory);
};
