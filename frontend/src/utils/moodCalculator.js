export const calculateMood = (temp, moisture, sunlight) => {
  if (moisture < 40) return "thirsty";
  if (temp > 32) return "hot";
  if (sunlight < 400) return "sleepy";
  return "happy";
};
