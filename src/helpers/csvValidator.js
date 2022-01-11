const csvValidator = (data) => {
  if (data.sensorType && data.value && data.location) {
    if (
      data.sensorType === "pH" ||
      data.sensorType === "rainFall" ||
      data.sensorType === "temperature"
    ) {
      if (data.sensorType === "pH") {
        if (data.value >= 0 && data.value <= 14) {
          return true;
        }
        return false;
      } else if (data.sensorType === "rainFall") {
        if (data.value >= 0 && data.value <= 500) {
          return true;
        }
        return false;
      } else if (data.sensorType === "temperature") {
        if (data.value >= -50 && data.value <= 100) {
          return true;
        }
        return false;
      }
    }
    return false;
  }
  return false;
};
