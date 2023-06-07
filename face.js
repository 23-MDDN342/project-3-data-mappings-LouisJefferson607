/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false ;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 5;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face(eye_value, mouth_value, chocolate_value, NS, chocolate_size) {
  this.eye_value = 1;
  this.mouth_value = 20
  this.chocolate_value = 7
  this.height_cook = 20
  this.width_cook = 20
  this.chocolate_size = 0.2

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    this.averageRightEye = segment_average(positions.right_eye)
    this.averageLeftEye = segment_average(positions.left_eye)
    this.averageTipLip = segment_average(positions.top_lip)

    this.centreX = positions.nose_bridge[0][0]
    this.centreY = positions.nose_bridge[0][1]
    this.brown = color(132, 86, 60)
    this.lightbrown = color(217, 190, 145)
    
    //  fill(random_cookie_color);
  
    this.currentAccentColor = this.brown;
    if(this.colorValue > 50){
      this.currentAccentColor = this.brown;
    }else{
      this.currentAccentColor = this.lightbrown;
    }

  fill(this.currentAccentColor);
  //Gets random noise seed so that all cookies are drawn differently
  //Draws cookies shadow using Perlin noise
noiseSeed(NS);
noStroke();
push();
pop();
beginShape();
stroke(1);
noiseMax = 0.5; // set maximum noise value to 0.5
for (let angle = 0; angle <= 360; angle += 10) {
  let xOff = map(cos(angle), -1, 1, 0, noiseMax);
  let yOff = map(sin(angle), -1, 1, 0, noiseMax);
  let noiseVal = noise(xOff * 2, yOff * 2); // multiply xOff and yOff by 2 for a smaller noise size
  let radius = 1.4 + (noiseVal * 1.4); // set radius range to 5-10 for a smaller cookie size
  let x = radius * cos(angle);
  let y = radius * sin(angle);
  curveVertex(x, y);
}
endShape(CLOSE);


    
    // If cookie is brown color , choc chip cookies are white. Otherise they are breown
    noStroke();
    ;
    if (this.colorValue < 50) {
      fill(37, 32, 27); // chocolate color
    } else {
      fill(237, 230, 214); // white color for chocolate chips if the cookie is the first color in the array
    }

     //Draws choc chips
     for (let i = 0; i < this.chocolate_value; i++) {
      let x = random(-1.5, 1.5);
      let y = random(-1.5, 1.5);
      ellipse(x, y, this.chocolate_size, this.chocolate_size);
    }
     // draw eyes
     stroke(1);
     fill(255);
     ellipse(this.averageRightEye[0], this.averageRightEye[1],this.eye_value);
     ellipse(this.averageLeftEye[0], this.averageLeftEye[1], this.eye_value);
     
     // draw black pupils in the eyes
     fill(0);
     let pupil_size = this.eye_value * 0.5; // size of the pupil
     let pupil_offset = this.eye_value * 0.2; // offset of the pupil from the center of the eye
     ellipse(this.averageRightEye[0], this.averageRightEye[1], pupil_size, pupil_size);
     ellipse(this.averageLeftEye[0], this.averageLeftEye[1], pupil_size, pupil_size);
     
     // draw two small white circles inside each pupil relative to eyes
     fill(255);
     noStroke();
     let small_circle1_size = pupil_size * 0.5;
     let small_circle2_size = pupil_size * 0.3;
     let small_circle1_offset = pupil_size * 0.2;
     let small_circle2_offset = pupil_size * 0.1;
     ellipse(this.averageLeftEye[0] - pupil_offset + small_circle1_offset, this.averageLeftEye[1] - small_circle1_offset, small_circle1_size, small_circle1_size);
     ellipse(this.averageLeftEye[0] - pupil_offset + small_circle2_offset, this.averageLeftEye[1] + small_circle2_offset, small_circle2_size, small_circle2_size);
     ellipse(this.averageRightEye[0] + pupil_offset - small_circle1_offset, this.averageRightEye[1] - small_circle1_offset, small_circle1_size, small_circle1_size);
     ellipse(this.averageRightEye[0] + pupil_offset - small_circle2_offset, this.averageRightEye[1] + small_circle2_offset, small_circle2_size, small_circle2_size);
     
     stroke(1);
     // draw mouth
     fill(255, 100, 100);
     let mouth_height = map(this.mouth_value, 0, 100, 0, 2); // map the mouth value to a range of 0-2
     rect(this.averageTipLip[0]-0.5, this.averageTipLip[1], 1, mouth_height, 1); // draw a rectangle for the mouth

   // Draw the nose
let noseX = segment_average(positions.nose_tip)[0]*0.8 ; // adjust the horizontal position of the nose
let noseY = segment_average(positions.nose_tip)[1] *0.8; // adjust the vertical position of the nose
let noseSize = this.eye_value * 0.1; // adjust the size of the nose relative to the eye value
fill(this.currentAccentColor); // set the fill color of the nose

// Draw the main nose shape
beginShape();
curveVertex(noseX, noseY - noseSize * 1.2);
curveVertex(noseX - noseSize * 0.6, noseY - noseSize * 0.8);
curveVertex(noseX - noseSize, noseY + noseSize * 0.8);
curveVertex(noseX, noseY + noseSize * 1.2);
curveVertex(noseX + noseSize, noseY + noseSize * 0.8);
curveVertex(noseX + noseSize * 0.6, noseY - noseSize * 0.8);
curveVertex(noseX, noseY - noseSize * 1.2);
endShape(CLOSE);

// Draw nostrils
let nostrilSize = noseSize * 0.15; // adjust the size of the nostrils
let nostrilOffset = noseSize * 0.1; // adjust the offset of the nostrils
fill(0); // set the fill color of the nostrils
ellipse(noseX - nostrilOffset, noseY + nostrilOffset, nostrilSize, nostrilSize); // draw left nostril
ellipse(noseX + nostrilOffset, noseY + nostrilOffset, nostrilSize, nostrilSize); // draw right nostril

  
    
    // console.log()
    // // head
    // ellipseMode(CENTER);
    // stroke(stroke_color);
    // fill(this.mainColour);
    // ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    // noStroke();


    // // mouth
    // fill(this.detailColour);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

    // // eyebrows
    // fill( this.eyebrowColour);
    // stroke( this.eyebrowColour);
    // strokeWeight(0.08);
    // this.draw_segment(positions.left_eyebrow);
    // this.draw_segment(positions.right_eyebrow);

    // // draw the chin segment using points
    // fill(this.chinColour);
    // stroke(this.chinColour);
    // this.draw_segment(positions.chin);

    // fill(100, 0, 100);
    // stroke(100, 0, 100);
    // this.draw_segment(positions.nose_bridge);
    // this.draw_segment(positions.nose_tip);

    // strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);

    // let left_eye_pos = segment_average(positions.left_eye);
    // let right_eye_pos = segment_average(positions.right_eye);

    // // eyes
    // noStroke();
    // let curEyeShift = 0.04 * this.eye_shift;
    // if(this.num_eyes == 2) {
    //   fill(this.detailColour);
    //   ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
    //   ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

    //   // fill(this.mainColour);
    //   // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
    //   // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    // }
    // else {
    //   let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
    //   let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

    //   fill(this.detailColour);
    //   ellipse(eyePosX, eyePosY, 0.45, 0.27);

    //   fill(this.mainColour);
    //   ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    // }
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.eye_value = map(settings[0], 0, 100, 1, 3, true);
    this.mouth_value = map(settings[1], 0, 100, 0, 150);
    this.chocolate_value = map(settings[2], 0, 100, 0, 15);
    this.chocolate_size = map(settings[3], 0, 100, 0, 2);
    this.colorValue = map(settings[4], 0, 100, 0, 100);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.eye_value, 1, 3, 0, 100,true);
    settings[1] = map(this.mouth_value, 0, 150, 0, 100);
    settings[2] = map(this.chocolate_value, 0, 15, 0, 100);
    settings[3] = map(this.chocolate_size, 0, 2, 0, 100);
    settings[4] = map(this.colorValue, 0, 100, 0, 100);
    return settings;
  }
}

// this.eye_value = 5;
//   this.mouth_value = 75
//   this.chocolate_value = 7
//   this.height_cook = 20
//   this.width_cook = 20
//   this.chocolate_size = 1