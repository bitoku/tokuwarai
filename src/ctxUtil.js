export const drawImageCenter = (ctx, img, dx, dy, size) => {
  const dw = img.width * size;
  const dh = img.height * size;
  ctx.drawImage(img, dx - dw / 2, dy - dh / 2, dw, dh);
};

export const drawRotatedImage = (ctx, img, dx, dy, size, angle) => {
  const dw = img.width * size;
  const dh = img.height * size;
  ctx.save();
  ctx.translate(dx, dy);
  ctx.rotate(angle * Math.PI / 180);
  ctx.drawImage(img, -dw/2, -dh/2, dw, dh);
  ctx.restore();
};
