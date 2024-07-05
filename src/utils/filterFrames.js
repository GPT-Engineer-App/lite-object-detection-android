const fs = require('fs');
const path = require('path');

const annotationsDir = path.join(__dirname, 'annotations');
const framesDir = path.join(__dirname, 'frames');
const outputDir = path.join(__dirname, 'filtered_dataset');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to check if annotation file contains valid bounding box coordinates
const isValidAnnotation = (annotation) => {
  const lines = annotation.split('\n');
  for (const line of lines) {
    if (line.trim() !== '') {
      const parts = line.split(' ');
      if (parts.length === 5) {
        return true;
      }
    }
  }
  return false;
};

// Read all annotation files
const annotationFiles = fs.readdirSync(annotationsDir).filter(file => file.endsWith('_annotations.txt'));

// Filter annotation files and corresponding frames
annotationFiles.forEach(file => {
  const annotationPath = path.join(annotationsDir, file);
  const annotationContent = fs.readFileSync(annotationPath, 'utf-8');

  if (isValidAnnotation(annotationContent)) {
    const frameFileName = file.replace('_annotations.txt', '.jpg');
    const framePath = path.join(framesDir, frameFileName);

    if (fs.existsSync(framePath)) {
      // Copy valid annotation and corresponding frame to output directory
      fs.copyFileSync(annotationPath, path.join(outputDir, file));
      fs.copyFileSync(framePath, path.join(outputDir, frameFileName));
    }
  }
});

console.log('Filtering complete. Check the filtered_dataset directory for results.');