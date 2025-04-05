function convertTimeToUTCHHMM(timeStr: string, baseDate = new Date()): string {
  if (!timeStr) return "";

  const [hours, minutes] = timeStr.split(":").map(Number);

  const localDate = new Date(baseDate);
  localDate.setHours(hours, minutes, 0, 0); // Set local time

  const utcHours = localDate.getUTCHours().toString().padStart(2, "0");
  const utcMinutes = localDate.getUTCMinutes().toString().padStart(2, "0");

  return `${utcHours}:${utcMinutes}`;
}

export function convertUTCToLocalTime(utcTimeStr: string): string | "" {
  if (!utcTimeStr) return "";
  
  const [hours, minutes] = utcTimeStr.split(":").map(Number);

  // Create a UTC date
  const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));

  // Convert to local time
  const localHours = utcDate.getHours().toString().padStart(2, "0");
  const localMinutes = utcDate.getMinutes().toString().padStart(2, "0");

  return `${localHours}:${localMinutes}`;
}

export function convertTimesToUTC(times: {
  time1: string;
  time2: string;
  time3: string;
}) {
  return {
    time1UTC: convertTimeToUTCHHMM(times.time1),
    time2UTC: convertTimeToUTCHHMM(times.time2),
    time3UTC: convertTimeToUTCHHMM(times.time3),
  };
}

export function addMinutesToUTCTimeString(timeStr: string, minutesToAdd: number): string {
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Create a UTC date (Jan 1, 1970 UTC as base)
  const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));

  // Add minutes
  utcDate.setUTCMinutes(utcDate.getUTCMinutes() + minutesToAdd);

  // Extract new UTC hours and minutes
  const newHours = utcDate.getUTCHours().toString().padStart(2, "0");
  const newMinutes = utcDate.getUTCMinutes().toString().padStart(2, "0");

  return `${newHours}:${newMinutes}`;
}