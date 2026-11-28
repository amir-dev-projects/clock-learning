import React from "react";
const illustrations = {
1:["01-our-home-planet.webp","The explorers discover Earth, our home planet."],
2:["02-globes-and-maps.webp","The explorers use a globe and map to find places."],
3:["03-directions.webp","The explorers learn compass directions and navigation."],
4:["04-the-sun.webp","The explorers discover the Sun and daylight."],
5:["05-day-and-night.webp","The explorers see how Earth's rotation creates day and night."],
6:["06-seasons.webp","The explorers explore the changing seasons."],
7:["07-the-moon.webp","The explorers observe the Moon and its phases."],
8:["08-weather.webp","The explorers investigate different kinds of weather."],
9:["09-water-cycle.webp","The explorers follow water through the water cycle."],
10:["10-caring-for-earth.webp","The explorers help care for nature and Earth's habitats."],
11:["11-solar-system.webp","The explorers discover the Sun and eight planets."],
12:["12-earth-sun-moon.webp","The explorers connect Earth, the Sun and the Moon."]
};
export default function EarthSpaceIllustration({lessonId}) {
 const [file,alt]=illustrations[lessonId]||illustrations[1];
 return <figure className="calendar-illustration earth-space-illustration"><img src={`/clock-learning/images/earth-space/${file}`} alt={alt} loading="lazy" decoding="async"/></figure>;
}
