export default function(image) {
  let minX = image.width - 1;
  let maxX = 0;
  let minY = image.height - 1;
  let maxY = 0;

  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');

  context.drawImage(image, 0, 0 );

  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      let data = context.getImageData(x, y, 1, 1);
      if (data.data[3] != 0) {
        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);
      }
    }
  }

  return [minX, maxX, minY, maxY];
}
