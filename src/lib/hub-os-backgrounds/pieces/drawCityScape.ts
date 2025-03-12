import { HORIZON_Y } from "../sharedConstants";

// const buildings = [];
// let building_x = 0;

// while (building_x < canvas.width) {
//   const building = {
//     width: Math.round(Math.random() * 3) + 2,
//     height: Math.round(Math.random() * 12) + 2,
//   };
//   buildings.push(building);
//   building_x += building.width;
// }

export const buildings = [
  {
    width: 3,
    height: 8,
  },
  {
    width: 3,
    height: 3,
  },
  {
    width: 5,
    height: 4,
  },
  {
    width: 5,
    height: 8,
  },
  {
    width: 3,
    height: 11,
  },
  {
    width: 2,
    height: 13,
  },
  {
    width: 4,
    height: 12,
  },
  {
    width: 2,
    height: 4,
  },
  {
    width: 5,
    height: 13,
  },
  {
    width: 2,
    height: 6,
  },
  {
    width: 4,
    height: 8,
  },
  {
    width: 4,
    height: 9,
  },
  {
    width: 4,
    height: 9,
  },
  {
    width: 2,
    height: 5,
  },
  {
    width: 4,
    height: 6,
  },
  {
    width: 2,
    height: 6,
  },
  {
    width: 4,
    height: 12,
  },
  {
    width: 4,
    height: 8,
  },
  {
    width: 4,
    height: 11,
  },
  {
    width: 3,
    height: 14,
  },
  {
    width: 3,
    height: 4,
  },
  {
    width: 4,
    height: 9,
  },
  {
    width: 3,
    height: 2,
  },
  {
    width: 4,
    height: 8,
  },
  {
    width: 5,
    height: 12,
  },
  {
    width: 3,
    height: 7,
  },
  {
    width: 3,
    height: 11,
  },
  {
    width: 3,
    height: 11,
  },
  {
    width: 2,
    height: 14,
  },
  {
    width: 4,
    height: 5,
  },
  {
    width: 4,
    height: 2,
  },
  {
    width: 4,
    height: 3,
  },
  {
    width: 2,
    height: 6,
  },
  {
    width: 2,
    height: 10,
  },
  {
    width: 2,
    height: 13,
  },
  {
    width: 3,
    height: 6,
  },
  {
    width: 4,
    height: 4,
  },
  {
    width: 4,
    height: 5,
  },
  {
    width: 3,
    height: 4,
  },
  {
    width: 4,
    height: 13,
  },
  {
    width: 2,
    height: 6,
  },
  {
    width: 3,
    height: 5,
  },
  {
    width: 5,
    height: 8,
  },
  {
    width: 4,
    height: 5,
  },
  {
    width: 3,
    height: 8,
  },
  {
    width: 2,
    height: 7,
  },
  {
    width: 2,
    height: 6,
  },
  {
    width: 4,
    height: 3,
  },
  {
    width: 4,
    height: 10,
  },
  {
    width: 4,
    height: 12,
  },
  {
    width: 4,
    height: 14,
  },
  {
    width: 3,
    height: 5,
  },
  {
    width: 5,
    height: 11,
  },
  {
    width: 3,
    height: 5,
  },
  {
    width: 2,
    height: 4,
  },
  {
    width: 4,
    height: 6,
  },
  {
    width: 2,
    height: 14,
  },
  {
    width: 3,
    height: 2,
  },
  {
    width: 3,
    height: 13,
  },
  {
    width: 5,
    height: 5,
  },
  {
    width: 4,
    height: 2,
  },
  {
    width: 4,
    height: 3,
  },
  {
    width: 3,
    height: 6,
  },
  {
    width: 4,
    height: 4,
  },
  {
    width: 5,
    height: 13,
  },
  {
    width: 3,
    height: 3,
  },
  {
    width: 3,
    height: 13,
  },
  {
    width: 3,
    height: 4,
  },
  {
    width: 4,
    height: 10,
  },
  {
    width: 2,
    height: 12,
  },
  {
    width: 4,
    height: 7,
  },
];

for (const building of buildings) {
  building.height += 1;
}

export default function drawCityScape(ctx: CanvasRenderingContext2D) {
  let x = 0;

  for (const building of buildings) {
    ctx.fillRect(
      x,
      HORIZON_Y - building.height,
      building.width,
      building.height
    );
    x += building.width;
  }
}
