import React from "react";

const illustrations = {
  1: ["days-of-week.webp", "A child explorer discovers the seven days of the week"],
  2: ["yesterday-today-tomorrow.webp", "A calendar shows yesterday, today and tomorrow in sequence"],
  3: ["weekdays-and-weekend.webp", "School days and weekend activities across one week"],
  4: ["months-of-year.webp", "The twelve months arranged across the year"],
  5: ["understanding-dates.webp", "A calendar page showing how a date is written"],
  6: ["reading-a-calendar.webp", "A child finds a date on a monthly calendar"],
  7: ["special-events.webp", "A child marks birthdays and special events on a calendar"],
  8: ["four-seasons.webp", "One tree shown in spring, summer, autumn and winter"],
  9: ["leap-year.webp", "A calendar highlights the extra day in February during a leap year"],
  10: ["solar-calendar.webp", "Earth orbiting the Sun to represent a solar calendar"],
  11: ["lunar-calendar.webp", "The changing phases of the Moon across a lunar cycle"],
  12: ["solar-lunar-lunisolar.webp", "A visual comparison of solar, lunar and lunisolar calendars"],
  13: ["time-zones.webp", "Earth showing different local times around the world"],
  14: ["calendar-master-challenge.webp", "A child explorer reviews calendar skills with a companion"]
};

export default function CalendarIllustration({ lessonId }) {
  const [file, alt] = illustrations[lessonId] || illustrations[14];
  return (
    <figure className="calendar-illustration">
      <img
        src={`/clock-learning/images/calendar/${file}`}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
