import store from "@/store/store";

export function formatDateTime(isoString, monthFormat = 'short', fullFormat = true) {
  const dateObj = new Date(isoString);
  const lang = store.getState().langSlice.lang;
  const locale = lang === "ar" ? "ar-EG" : "en-GB";

  const shortDateOptions = {
    day: "2-digit",
    month: lang === "ar" ? (monthFormat === 'numeric' ? 'numeric' : 'long') : 'long',
    year: "numeric",
  };

  const longDateOptions = {
    weekday: 'long',
    day: "2-digit",
    month: lang === "ar" ? 'long' : 'long',
    year: "numeric",
  };

  const shortDate = dateObj.toLocaleDateString(locale, shortDateOptions);
  
  const longDate = dateObj.toLocaleDateString(locale, longDateOptions);
  
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: lang !== "ar",
  };

  let time = dateObj.toLocaleTimeString(locale, timeOptions);

  if (lang === "ar") {
    const hour = dateObj.getHours();
    time += hour < 12 ? " صباحاً" : " مساءً";
  }

  const formatted = {
    shortDate: shortDate,
    longDate: lang === "ar" ? `${longDate} في ${time}` : `${longDate} at ${time}`,
    time: time
  };

  return formatted;
}
