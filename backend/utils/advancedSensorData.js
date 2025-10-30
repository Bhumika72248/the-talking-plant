// Advanced sensor simulation with ML-like patterns and realistic environmental factors
class AdvancedSensorSimulator {
  constructor() {
    this.baseValues = {
      soilMoisture: 65,
      temperature: 24,
      lightIntensity: 450,
      humidity: 60,
      pH: 6.5,
      nutrients: 75
    };
    
    this.trends = {
      soilMoisture: -0.15, // Gradual water consumption
      temperature: 0.1,
      lightIntensity: 0.3,
      humidity: -0.05,
      pH: 0.01,
      nutrients: -0.08
    };
    
    this.timeOfDay = 0;
    this.dayOfWeek = 0;
    this.season = 'spring';
    this.weatherPattern = 'sunny';
    this.plantAge = 30; // days
    this.stressLevel = 0;
  }

  updateEnvironmentalFactors() {
    const now = new Date();
    this.timeOfDay = now.getHours();
    this.dayOfWeek = now.getDay();
    
    // Seasonal effects
    const month = now.getMonth();
    if (month >= 2 && month <= 4) this.season = 'spring';
    else if (month >= 5 && month <= 7) this.season = 'summer';
    else if (month >= 8 && month <= 10) this.season = 'autumn';
    else this.season = 'winter';
    
    // Weather patterns (simulated)
    const weatherRandom = Math.random();
    if (weatherRandom < 0.6) this.weatherPattern = 'sunny';
    else if (weatherRandom < 0.8) this.weatherPattern = 'cloudy';
    else if (weatherRandom < 0.95) this.weatherPattern = 'rainy';
    else this.weatherPattern = 'stormy';
  }

  generateAdvancedReading() {
    this.updateEnvironmentalFactors();
    
    // Time-based light simulation
    let lightMultiplier = 1;
    if (this.timeOfDay >= 6 && this.timeOfDay <= 18) {
      // Daylight hours - bell curve
      const hourFromNoon = Math.abs(this.timeOfDay - 12);
      lightMultiplier = Math.max(0.2, 1 - (hourFromNoon / 8));
    } else {
      lightMultiplier = 0.1; // Night time
    }
    
    // Weather effects
    const weatherEffects = {
      sunny: { light: 1.2, temp: 1.1, humidity: 0.9 },
      cloudy: { light: 0.7, temp: 0.95, humidity: 1.1 },
      rainy: { light: 0.5, temp: 0.9, humidity: 1.3 },
      stormy: { light: 0.3, temp: 0.85, humidity: 1.4 }
    };
    
    const weather = weatherEffects[this.weatherPattern];
    
    // Seasonal effects
    const seasonalEffects = {
      spring: { temp: 1, light: 1.1, growth: 1.2 },
      summer: { temp: 1.3, light: 1.3, growth: 1.1 },
      autumn: { temp: 0.8, light: 0.9, growth: 0.8 },
      winter: { temp: 0.6, light: 0.7, growth: 0.5 }
    };
    
    const seasonal = seasonalEffects[this.season];
    
    // Calculate stress factors
    this.calculateStress();
    
    // Generate readings with all factors
    const soilMoisture = this.calculateSoilMoisture(weather);
    const temperature = this.calculateTemperature(weather, seasonal);
    const lightIntensity = this.calculateLight(weather, seasonal, lightMultiplier);
    const humidity = this.calculateHumidity(weather);
    const pH = this.calculatePH();
    const nutrients = this.calculateNutrients();
    
    // Update base values for next reading
    this.baseValues.soilMoisture = soilMoisture;
    this.baseValues.temperature = temperature;
    this.baseValues.lightIntensity = lightIntensity;
    this.baseValues.humidity = humidity;
    this.baseValues.pH = pH;
    this.baseValues.nutrients = nutrients;
    
    const reading = {
      soilMoisture: Math.round(soilMoisture * 10) / 10,
      temperature: Math.round(temperature * 10) / 10,
      lightIntensity: Math.round(lightIntensity),
      humidity: Math.round(humidity * 10) / 10,
      pH: Math.round(pH * 100) / 100,
      nutrients: Math.round(nutrients * 10) / 10,
      timestamp: new Date().toISOString(),
      environmentalData: {
        timeOfDay: this.timeOfDay,
        season: this.season,
        weather: this.weatherPattern,
        stressLevel: this.stressLevel,
        plantAge: this.plantAge
      }
    };
    
    return reading;
  }

  calculateSoilMoisture(weather) {
    let moisture = this.baseValues.soilMoisture + this.trends.soilMoisture;
    
    // Weather effects
    if (weather === weatherEffects.rainy) {
      moisture += Math.random() * 15; // Rain adds moisture
    }
    
    // Evaporation based on temperature and humidity
    const evaporation = (this.baseValues.temperature - 20) * 0.5 + (100 - this.baseValues.humidity) * 0.1;
    moisture -= evaporation * 0.1;
    
    // Plant consumption based on age and health
    const consumption = (this.plantAge / 100) * (1 + this.stressLevel);
    moisture -= consumption;
    
    return Math.max(10, Math.min(95, moisture + (Math.random() - 0.5) * 5));
  }

  calculateTemperature(weather, seasonal) {
    let temp = this.baseValues.temperature + this.trends.temperature;
    
    // Time of day effects
    const timeEffect = Math.sin((this.timeOfDay - 6) * Math.PI / 12) * 8;
    temp += timeEffect;
    
    // Weather and seasonal effects
    temp *= weather.temp * seasonal.temp;
    
    // Random variation
    temp += (Math.random() - 0.5) * 3;
    
    return Math.max(5, Math.min(45, temp));
  }

  calculateLight(weather, seasonal, lightMultiplier) {
    let light = this.baseValues.lightIntensity + this.trends.lightIntensity;
    
    // Apply all multipliers
    light *= lightMultiplier * weather.light * seasonal.light;
    
    // Random variation
    light += (Math.random() - 0.5) * 50;
    
    return Math.max(50, Math.min(1200, light));
  }

  calculateHumidity(weather) {
    let humidity = this.baseValues.humidity + this.trends.humidity;
    
    // Weather effects
    humidity *= weather.humidity;
    
    // Temperature inverse relationship
    humidity -= (this.baseValues.temperature - 25) * 0.8;
    
    // Random variation
    humidity += (Math.random() - 0.5) * 8;
    
    return Math.max(20, Math.min(95, humidity));
  }

  calculatePH() {
    let pH = this.baseValues.pH + this.trends.pH;
    
    // Soil moisture affects pH
    if (this.baseValues.soilMoisture > 80) {
      pH -= 0.1; // Waterlogged soil becomes more acidic
    }
    
    // Random variation
    pH += (Math.random() - 0.5) * 0.2;
    
    return Math.max(4.5, Math.min(8.5, pH));
  }

  calculateNutrients() {
    let nutrients = this.baseValues.nutrients + this.trends.nutrients;
    
    // Plant consumption based on growth rate
    const growthRate = this.season === 'spring' ? 1.5 : this.season === 'summer' ? 1.2 : 0.8;
    nutrients -= growthRate * 0.5;
    
    // Random variation
    nutrients += (Math.random() - 0.5) * 3;
    
    return Math.max(10, Math.min(100, nutrients));
  }

  calculateStress() {
    let stress = 0;
    
    // Environmental stress factors
    if (this.baseValues.soilMoisture < 30) stress += 0.3;
    if (this.baseValues.soilMoisture > 85) stress += 0.2;
    if (this.baseValues.temperature < 15 || this.baseValues.temperature > 32) stress += 0.4;
    if (this.baseValues.lightIntensity < 200) stress += 0.2;
    if (this.baseValues.pH < 5.5 || this.baseValues.pH > 7.5) stress += 0.2;
    if (this.baseValues.nutrients < 30) stress += 0.3;
    
    this.stressLevel = Math.min(1, stress);
  }

  analyzeAdvancedMood(data) {
    const { soilMoisture, temperature, lightIntensity, humidity, pH, nutrients, environmentalData } = data;
    
    // Critical conditions first
    if (soilMoisture < 25) {
      return {
        mood: "Severely Dehydrated 🏜️",
        message: "URGENT: I'm critically low on water! My leaves are wilting and I need immediate attention!",
        priority: "critical",
        healthScore: 20,
        recommendations: ["Water immediately", "Check drainage", "Monitor closely"]
      };
    }
    
    if (temperature > 38) {
      return {
        mood: "Heat Stressed 🔥",
        message: "I'm overheating! Please move me to a cooler location or provide shade.",
        priority: "high",
        healthScore: 30,
        recommendations: ["Provide shade", "Increase ventilation", "Check water levels"]
      };
    }
    
    if (temperature < 10) {
      return {
        mood: "Freezing Cold 🧊",
        message: "Brrr! It's too cold for me. I need warmth to survive!",
        priority: "high",
        healthScore: 25,
        recommendations: ["Move to warmer location", "Protect from frost", "Reduce watering"]
      };
    }
    
    // Stress-based conditions
    if (environmentalData.stressLevel > 0.7) {
      return {
        mood: "Highly Stressed 😰",
        message: "I'm experiencing multiple environmental stresses. Please check my conditions!",
        priority: "high",
        healthScore: 40,
        recommendations: ["Review all conditions", "Adjust environment", "Monitor closely"]
      };
    }
    
    // Nutrient deficiency
    if (nutrients < 25) {
      return {
        mood: "Nutrient Starved 🍽️",
        message: "I'm running low on nutrients. Some fertilizer would help me grow stronger!",
        priority: "medium",
        healthScore: 50,
        recommendations: ["Add fertilizer", "Check soil quality", "Consider repotting"]
      };
    }
    
    // pH issues
    if (pH < 5.0 || pH > 8.0) {
      return {
        mood: "pH Imbalanced ⚖️",
        message: `My soil pH is ${pH < 5.0 ? 'too acidic' : 'too alkaline'}. This affects my nutrient absorption.`,
        priority: "medium",
        healthScore: 60,
        recommendations: ["Adjust soil pH", "Test soil regularly", "Use appropriate amendments"]
      };
    }
    
    // Standard conditions
    if (soilMoisture < 40) {
      return {
        mood: "Getting Thirsty 🌵",
        message: "I could use some water soon. My soil is getting a bit dry.",
        priority: "medium",
        healthScore: 65,
        recommendations: ["Water moderately", "Check soil moisture", "Maintain schedule"]
      };
    }
    
    if (temperature > 32) {
      return {
        mood: "Feeling Warm 🌡️",
        message: "It's getting quite warm here. Some air circulation would be nice!",
        priority: "low",
        healthScore: 70,
        recommendations: ["Improve ventilation", "Monitor temperature", "Consider shade"]
      };
    }
    
    if (lightIntensity < 300) {
      return {
        mood: "Seeking Light 🔍",
        message: "I could use more light for better photosynthesis. Maybe closer to a window?",
        priority: "medium",
        healthScore: 65,
        recommendations: ["Increase light exposure", "Move closer to window", "Consider grow lights"]
      };
    }
    
    if (soilMoisture > 85) {
      return {
        mood: "Well Hydrated 💧",
        message: "Ahh, perfect! I'm well-watered and feeling refreshed. Thank you for taking care of me!",
        priority: "low",
        healthScore: 85,
        recommendations: ["Maintain current care", "Monitor for overwatering", "Ensure good drainage"]
      };
    }
    
    // Optimal conditions
    if (soilMoisture >= 50 && soilMoisture <= 75 && 
        temperature >= 20 && temperature <= 28 && 
        lightIntensity >= 400 && lightIntensity <= 800 &&
        pH >= 6.0 && pH <= 7.0 &&
        nutrients >= 60) {
      
      const messages = [
        "I'm thriving! Everything is perfect right now. You're an amazing plant parent! 🌟",
        "Feeling absolutely fantastic! My photosynthesis is at peak efficiency! ☀️",
        "This is plant paradise! I'm growing strong and healthy thanks to your care! 🌱",
        "Perfect conditions detected! I'm channeling all this energy into beautiful growth! ✨",
        "I'm in my happy place! Watch me flourish with this excellent care! 🌸"
      ];
      
      return {
        mood: "Absolutely Thriving 🌟",
        message: messages[Math.floor(Math.random() * messages.length)],
        priority: "low",
        healthScore: 95,
        recommendations: ["Keep up excellent care", "Continue current routine", "Monitor for changes"]
      };
    }
    
    // Default happy state
    return {
      mood: "Content & Growing 🌱",
      message: "I'm doing well overall! Thanks for taking good care of me. Keep up the great work!",
      priority: "low",
      healthScore: 80,
      recommendations: ["Maintain current care", "Regular monitoring", "Continue good practices"]
    };
  }
}

module.exports = AdvancedSensorSimulator;