// Declare and initialize variables
let gridSize = 18;
let circleRadius = 30;
let colors = ["#769ced", "#97b8ff", "#b4ccff", "#c4d7ff"];

// Declare variables for animation
let angle = 0;
let circleYPos = 0;

function setup() {
  const canvasWidth = windowWidth * 0.9;
  const canvasHeight = windowHeight * 0.9;
  createCanvas(canvasWidth, canvasHeight);
  frameRate(24);
}

// Continuously draw frames
function draw() {
  // Call a function to draw a single frame
  draw_one_frame(frameCount);
}

// Draw a single frame
function draw_one_frame(cur_frac) {
  // Set up ellipse properties
  ellipseMode(RADIUS);
  stroke(0);
  strokeWeight(width / 80); // Set stroke weight relative to canvas width

  // Draw outer and inner circles
  noFill();
  fill("#bfd7ea");
  ellipse(width / 2, height / 2, width / 2, height / 2);
  noFill();
  stroke("#7f5539");
  strokeWeight(width * 0.005); // Set stroke weight relative to canvas width
  ellipse(width / 2, height / 2, width / 2, height / 2);

  // Loop through grid
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      // Skip grid squares inside the inner circle
      if (dist(x, y, width / 2, height / 2) < width / 4) {
        continue;
      }

      // Choose colors for stroke
      let colorIndex = floor(frameCount / 2) % colors.length;
      let color1 = colors[(colorIndex + int((x + y) / 40)) % colors.length];
      let color2 = colors[(colorIndex + int((x + y) / 40) + 1) % colors.length];

      // Draw ellipse with stroke gradient
      noFill();
      stroke(lerpColor(color(color1), color(color2), (frameCount % 2) / 2));
      push();
      translate(x + gridSize / 2, y + gridSize / 2);
      rotate(atan2(height / 2 - y, width / 2 - x));
      ellipse(0, 0, circleRadius, circleRadius);
      pop();
      
      // Draw circles on the sides
      if (x === width * 0.2 || x === width * 0.8) {
        noStroke();
        fill(0, 0, 255);
        circle(x, circleYPos, width / 100); // Set circle radius relative to canvas width
      }
    }
  }

  // Draw a rectangle and lines
  noFill();
  stroke("#c4d7ff");
  strokeWeight(width / 20); // Set stroke weight relative to canvas width
  rect(0, 0, width, height);
  line(width * 0.2, 0, width * 0.2, height);
  line(width * 0.8, 0, width * 0.8, height);

  // Animate circle Y position
  circleYPos = map(sin(frameCount / 24 * PI), -1, 1, 0, height);
}





