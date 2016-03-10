export default function imageToSprites(image, dx, dy) {
  let result = [];

  let canvas = document.createElement('canvas');
  canvas.width = dx;
  canvas.height = dy;
  let context = canvas.getContext('2d');

  for (let y = 0; y <= image.height - dy; y += dy) {
    let rowSprites = [];
    for (let x = 0; x <= image.width - dx; x += dx) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, dx, dy, 0, 0, dx, dy);

      let sprite = new Image();
      sprite.src = canvas.toDataURL('image/png');
      rowSprites.push(sprite);
    }
    result.push(rowSprites);
  }

  return result;
}
