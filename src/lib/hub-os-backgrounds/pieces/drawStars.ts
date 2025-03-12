import { lerp } from "../lerp";
import Theme from "../themes/Theme";
import { Press_Start_2P } from "next/font/google";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

// const stars = [];
// const starCharacters = [
//   "*",
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
// ];

// while (starCharacters.length > 0) {
//   const star = {
//     character: starCharacters.splice(
//       Math.floor(Math.random() * starCharacters.length),
//       1
//     )[0],
//     x: 0,
//     y: 0,
//     twinkleOffset: Math.floor(Math.random() * TOTAL_FRAMES * FRAMES_PER_FRAME),
//     rotation: Math.random() * Math.PI * 2,
//   };

//   while (true) {
//     star.x = Math.floor(Math.random() * (canvas.width - 16));
//     star.y = Math.floor(Math.random() * (HORIZON_Y - 32)) + 28;

//     const isTooClose = (otherStar) =>
//       Math.sqrt((star.x - otherStar.x) ** 2 + (star.y - otherStar.y) ** 2) < 20;

//     if (!stars.some(isTooClose)) {
//       break;
//     }
//   }

//   stars.push(star);
// }

const stars = [
  {
    character: "C",
    x: 20,
    y: 57,
    twinkleOffset: 196,
    rotation: 4.306651743531555,
  },
  {
    character: "G",
    x: 134,
    y: 32,
    twinkleOffset: 165,
    rotation: 1.463005135250454,
  },
  {
    character: "H",
    x: 59,
    y: 28,
    twinkleOffset: 42,
    rotation: 6.1750612198151416,
  },
  {
    character: "M",
    x: 144,
    y: 59,
    twinkleOffset: 158,
    rotation: 2.347081716398176,
  },
  {
    character: "O",
    x: 128,
    y: 72,
    twinkleOffset: 167,
    rotation: 2.368910698235972,
  },
  {
    character: "E",
    x: 38,
    y: 41,
    twinkleOffset: 120,
    rotation: 1.9124642264619054,
  },
  {
    character: "*",
    x: 78,
    y: 38,
    twinkleOffset: 111,
    rotation: 4.828846358971202,
  },
  {
    character: "B",
    x: 172,
    y: 63,
    twinkleOffset: 33,
    rotation: 3.737931853176279,
  },
  {
    character: "I",
    x: 77,
    y: 66,
    twinkleOffset: 125,
    rotation: 4.369704638653444,
  },
  {
    character: "N",
    x: 42,
    y: 72,
    twinkleOffset: 13,
    rotation: 3.610627366367215,
  },
  {
    character: "F",
    x: 15,
    y: 32,
    twinkleOffset: 81,
    rotation: 3.0306378476987064,
  },
  {
    character: "L",
    x: 223,
    y: 56,
    twinkleOffset: 73,
    rotation: 1.2434593632149409,
  },
  {
    character: "J",
    x: 192,
    y: 50,
    twinkleOffset: 6,
    rotation: 1.430232875888638,
  },
  {
    character: "K",
    x: 97,
    y: 68,
    twinkleOffset: 18,
    rotation: 5.2237352966823405,
  },
  {
    character: "D",
    x: 164,
    y: 40,
    twinkleOffset: 217,
    rotation: 3.9052242835698356,
  },
  {
    character: "A",
    x: 208,
    y: 70,
    twinkleOffset: 101,
    rotation: 1.2817823687440528,
  },
  {
    character: "P",
    x: 114,
    y: 39,
    twinkleOffset: 273,
    rotation: 1.9572766716681302,
  },
];

for (const star of stars) {
  star.y -= 1;
}

export default function drawStars(
  ctx: CanvasRenderingContext2D,
  theme: Theme,
  frame_number: number,
  min_alpha: number,
  max_alpha: number
) {
  const MAX = theme.TOTAL_FRAMES;

  // ctx.font = `16px bn-code`;
  ctx.font = `8px ${font.style.fontFamily}`;

  for (const star of stars) {
    const twinkleTick = frame_number + star.twinkleOffset;
    const multiplier = (Math.abs((twinkleTick % MAX) - MAX / 2) / MAX) * 2;

    // twinkle
    ctx.globalAlpha = lerp(min_alpha, max_alpha, multiplier);

    // draw
    ctx.fillText(star.character, star.x, star.y);
  }

  ctx.globalAlpha = 1;
}
