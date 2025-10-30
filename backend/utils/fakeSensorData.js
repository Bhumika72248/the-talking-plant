// Simulated sensor data generator
class SensorSimulator {
  constructor() {
    this.baseValues = {
      soilMoisture: 60,
      temperature: 25,
      lightIntensity: 500
    };
    this.trends = {
      soilMoisture: -0.1, // Gradually decreases (plant drinks water)
      temperature: 0.05,
      lightIntensity: 0.2
    };
  }

  generateReading() {
    // Add realistic variations
    const soilMoisture = Math.max(20, Math.min(90, 
      this.baseValues.soilMoisture + (Math.random() - 0.5) * 10 + this.trends.soilMoisture
    ));
    
    const temperature = Math.max(15, Math.min(40,
      this.baseValues.temperature + (Math.random() - 0.5) * 5 + this.trends.temperature
    ));
    
    const lightIntensity = Math.max(100, Math.min(1000,
      this.baseValues.lightIntensity + (Math.random() - 0.5) * 100 + this.trends.lightIntensity
    ));

    // Update base values for next reading
    this.baseValues.soilMoisture = soilMoisture;
    this.baseValues.temperature = temperature;
    this.baseValues.lightIntensity = lightIntensity;

    return {
      soilMoisture: Math.round(soilMoisture * 10) / 10,
      temperature: Math.round(temperature * 10) / 10,
      lightIntensity: Math.round(lightIntensity),
      timestamp: new Date().toISOString()
    };
  }

  analyzeMood(data) {
    const { soilMoisture, temperature, lightIntensity } = data;
    
    if (soilMoisture < 40) {
      return {
        mood: "Thirsty 🌵",
        message: "Hey there! I'm feeling quite dry. Could you give me some water please?",
        priority: "high"
      };
    }
    
    if (temperature > 32) {
      return {
        mood: "Too Hot 🥵",
        message: "Whew! It's getting pretty toasty in here. Maybe some shade would be nice?",
        priority: "medium"
      };
    }
    
    if (lightIntensity < 300) {
      return {
        mood: "In Shade 🌥️",
        message: "I'm feeling a bit dim here. Could you move me closer to the light?",
        priority: "medium"
      };
    }
    
    if (soilMoisture > 80) {
      return {
        mood: "Well Watered 💧",
        message: "Ahh, perfect! I'm feeling refreshed and happy. Thank you for taking care of me!",
        priority: "low"
      };
    }
    
    return {
      mood: "Happy 🌸",
      message: "I'm feeling fantastic! Everything is just perfect right now. You're doing great!",
      priority: "low"
    };
  }
}

module.exports = SensorSimulator;