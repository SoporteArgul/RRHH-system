import sharp from 'sharp';
import fs from "fs"
import path from 'path';

export default function resizeImage(imagePath:string) {
    const image = sharp(imagePath);
    image.resize(600);
    image.toBuffer((err, data) => {
      if (err) {
        console.error(err);
      } else {
        const imageName = path.basename(imagePath);
        const imageDir = path.dirname(imagePath);
        const outputPath = path.join(imageDir, imageName);
        fs.writeFile(outputPath, data, err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Image saved: ${outputPath}`);
          }
        });
      }
    });
  }
