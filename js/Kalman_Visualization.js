let step = 0;
let animating = false;  // Track whether the animation is active

// Kalman Filter Variables
let x_prior = 0;   // Prior estimate
let P_prior = 1;   // Prior error covariance
let x_post = 0;    // Posterior estimate
let P_post = 1;    // Posterior error covariance
let K = 0;         // Kalman Gain
let z = 0;         // Measurement
let Q = 0.1;       // Process noise covariance
let R = 1;         // Measurement noise covariance
let measurements = [];
let estimates = [];  // To store the history of x_post values
let futureEstimates = [];  // To store the predicted future state estimates
let measurementIndex = 0;
let maxSteps;
let animationInterval;

function setup() {
  createCanvas(windowWidth, windowHeight);  // Set canvas size relative to the window

  // Create buttons, position relative to the window size
  nextButton = createButton('Next Step');
  nextButton.position(windowWidth * 0.01, windowHeight * 0.01);  // Relative position
  nextButton.mousePressed(nextStep);

  resetButton = createButton('Reset');
  resetButton.position(windowWidth * 0.09, windowHeight * 0.01);  // Relative position
  resetButton.mousePressed(resetSimulation);
  
  animateButton = createButton('Animate');
  animateButton.position(windowWidth * 0.17, windowHeight * 0.01);  // Relative position
  animateButton.mousePressed(toggleAnimation);

  // Initialize measurements with some noise
  for (let i = 0; i < 50; i++) {
    let trueValue = sin(i * 0.1) * 10;
    let noisyMeasurement = trueValue + randomGaussian(0, sqrt(R));
    measurements.push(noisyMeasurement);
  }

  // Initial estimates
  x_post = measurements[0];
  P_post = 1;
  maxSteps = int((windowWidth * 0.75 - windowWidth * 0.05) / 10);  // Proportional to line length
}

function draw() {
  background(255);

  // Draw block diagram
  drawBlockDiagram();

  // Display the current step, position text relative to window size
  textSize(windowWidth * 0.02);
  fill(0);
  noStroke();  // Ensure no stroke is applied to text
  text(`Step: ${step}`, windowWidth * 0.8, windowHeight * 0.05);  // Relative position

  // Display measurements
  displayMeasurements();

  // Display sidebar with Kalman Filter values
  drawSidebar();
}

function nextStep() {
  if (measurementIndex < min(measurements.length - 1, maxSteps - 1)) {
    measurementIndex++;
    kalmanFilterStep();
    step++;
  }
}

function resetSimulation() {
  step = 0;
  measurementIndex = 0;
  x_post = measurements[0];
  futureEstimates = []; 
  estimates = [];  // Clear the estimates array
  P_post = 1;
  animating = false;
  clearInterval(animationInterval);  // Stop animation if reset is pressed

  // Reinitialize measurements (with noise) to reset the graph
  measurements = [];
  for (let i = 0; i < 50; i++) {
    let trueValue = sin(i * 0.1) * 10;
    let noisyMeasurement = trueValue + randomGaussian(0, sqrt(R));
    measurements.push(noisyMeasurement);
  }
}


function kalmanFilterStep() {
  // Time Update (Prediction)
  x_prior = x_post;
  P_prior = P_post + Q;

  // Predict the future state estimate (before measurement update)
  let futureEstimate = x_prior;  // This is the predicted future state before incorporating the measurement
  futureEstimates.push(futureEstimate);

  // Measurement Update (Correction)
  z = measurements[measurementIndex];  // Get the current measurement
  K = P_prior / (P_prior + R);  // Calculate Kalman gain
  x_post = x_prior + K * (z - x_prior);  // Update state estimate based on measurement
  P_post = (1 - K) * P_prior;

  // Push the new estimate
  estimates.push(x_post);
}


function drawBlockDiagram() {
  // Define positions for each block, estimated based on the reference image
  let blockWidth = 120;  // Estimated block width in pixels
  let blockHeight = 60;  // Estimated block height in pixels

  // Estimated X, Y positions for each block based on your feedback
  let x0 = 200, y0 = 150;  // Starting point for positioning blocks
  let hGap = 50, vGap = 100;  // Horizontal and vertical gaps between blocks

  // Draw each block
  let pk1Pos = { x: x0 + blockWidth + hGap, y: y0 + vGap };
  let kkPos = { x: x0 + 2 * (blockWidth + hGap), y: y0 + vGap };
  let xk1Pos = { x: x0 + 3 * (blockWidth + hGap), y: y0 };
  let xkPos = { x: x0 + 3 * (blockWidth + hGap), y: y0 + vGap };
  let pkPos = { x: x0 + 2 * (blockWidth + hGap), y: y0 + 2 * vGap };

  // 1. Prior Covariance (Pₖ₊₁⁻) to the left of Kalman Gain (Kₖ)
  drawBlock(pk1Pos.x, pk1Pos.y, blockWidth, blockHeight, "Prior Covariance\nPₖ₊₁⁻", P_prior.toFixed(2));

  // 2. Kalman Gain (Kₖ) to the right of Pₖ₊₁⁻
  drawBlock(kkPos.x, kkPos.y, blockWidth, blockHeight, "Kalman Gain\nKₖ", K.toFixed(2));

  // 3. Prior Estimate (x̂ₖ₊₁) to the top
  drawBlock(xk1Pos.x, xk1Pos.y, blockWidth, blockHeight, "Prior Estimate\nx̂ₖ₊₁", x_prior.toFixed(2));

  // 4. Posterior Estimate (x̂ₖ) to the lower position
  drawBlock(xkPos.x, xkPos.y, blockWidth, blockHeight, "Posterior Estimate\nx̂ₖ", x_post.toFixed(2));

  // 5. Updated Covariance (Pₖ) stays in place
  drawBlock(pkPos.x, pkPos.y, blockWidth, blockHeight, "Updated Covariance\nPₖ", P_post.toFixed(2));

  // Draw arrows
  drawArrow(kkPos.x + blockWidth, kkPos.y + blockHeight / 2, xkPos.x, xkPos.y + blockHeight / 2); // Kₖ -> x̂ₖ
  drawArrow(xkPos.x + blockWidth / 2, xkPos.y, xk1Pos.x + blockWidth / 2, xk1Pos.y + blockHeight); // x̂ₖ -> x̂ₖ₊₁
  drawArrow(xk1Pos.x, xk1Pos.y + blockHeight / 2, kkPos.x + blockWidth, kkPos.y); // x̂ₖ₊₁ -> Kₖ (diagonal)
  drawArrow(xkPos.x + blockWidth / 2, xkPos.y + blockHeight, pkPos.x + blockWidth / 2, pkPos.y); // x̂ₖ -> Pₖ (diagonal)
  
  // Adjust diagonal arrow from Pₖ to Pₖ₊₁ to fix alignment
  drawArrow(pkPos.x + blockWidth * 0.2, pkPos.y, pk1Pos.x + blockWidth * 0.2, pk1Pos.y + blockHeight); // Pₖ -> Pₖ₊₁ (diagonal)

  drawArrow(pk1Pos.x + blockWidth, pk1Pos.y + blockHeight / 2, kkPos.x, kkPos.y + blockHeight / 2); // Pₖ₊₁ -> Kₖ
}

// Function to draw a block with title and value
function drawBlock(x, y, w, h, title, value) {
  stroke(0);
  fill(230);
  rect(x, y, w, h, 10);  // Draw the block with rounded corners

  textSize(14);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(title, x + w / 2, y + h / 4);  // Title in the top half
  text(`Value: ${value}`, x + w / 2, y + (3 * h) / 4);  // Value in the bottom half
}

// Function to draw arrows
function drawArrow(x1, y1, x2, y2) {
  stroke(0);
  strokeWeight(2);
  fill(0);
  let angle = atan2(y2 - y1, x2 - x1);
  line(x1, y1, x2, y2);  // Line for the arrow shaft
  push();
  translate(x2, y2);
  rotate(angle);
  // Arrowhead
  triangle(0, 0, -10, -5, -10, 5);  
  pop();
}




function drawSidebar() {
  let sidebarX = windowWidth * 0.85;  // Positioning the sidebar based on window width
  let sidebarY = windowHeight * 0.7;
  
  textSize(windowWidth * 0.015);
  fill(0);
  noStroke();  // Ensure no stroke is applied to text
  text("Kalman Filter Details", sidebarX, sidebarY - windowHeight * 0.05);
  
  textSize(windowWidth * 0.013);
  text(`Raw Measurement (zₖ): ${z.toFixed(2)}`, sidebarX, sidebarY);
  text(`Prior State (x̂ₖ⁻): ${x_prior.toFixed(2)}`, sidebarX, sidebarY + windowHeight * 0.05);
  text(`Prior Covariance (Pₖ⁻): ${P_prior.toFixed(2)}`, sidebarX, sidebarY + windowHeight * 0.1);
  text(`Kalman Gain (Kₖ): ${K.toFixed(2)}`, sidebarX, sidebarY + windowHeight * 0.15);
  text(`Posterior State (x̂ₖ): ${x_post.toFixed(2)}`, sidebarX, sidebarY + windowHeight * 0.2);
  text(`Posterior Covariance (Pₖ): ${P_post.toFixed(2)}`, sidebarX, sidebarY + windowHeight * 0.25);
}

function displayMeasurements() {
  push();
  translate(0, windowHeight - windowHeight * 0.2);  // Adjusting based on window height
  stroke(200);
  line(windowWidth * 0.05, 0, windowWidth * 0.75, 0);  // Shortened measurement line
  stroke(0);
  noStroke();  // Ensure no stroke is applied to text
  textSize(windowWidth * 0.013);
  fill(0);
  noStroke();  // Ensure no stroke is applied to text
  text("Measurements over Time", (windowWidth * 0.75 + windowWidth * 0.05) / 2, windowHeight * 0.02);

  // Draw measurements (red line)
  noFill();
  stroke(255, 0, 0);  // Red color for measurements
  beginShape();
  for (let i = 0; i < measurementIndex; i++) {  // Plot measurements one step behind estimates
    let x = map(i, 0, measurements.length - 1, windowWidth * 0.05, windowWidth * 0.75);
    let y = -measurements[i] * 5;
    vertex(x, y);
  }
  endShape();
  
  // Draw estimates (blue line)
  noFill();
  stroke(0, 0, 255);  // Blue color for estimates
  beginShape();
  for (let i = 0; i <= measurementIndex; i++) {  // Plot blue line in sync with red
    let x = map(i, 0, measurements.length - 1, windowWidth * 0.05, windowWidth * 0.75);
    let y = -estimates[i] * 5;
    vertex(x, y);
  }
  endShape();
  
  // Draw future estimates (darker green line)
  noFill();
  stroke(0, 128, 0);  // Darker green color for future state estimates
  beginShape();
  for (let i = 0; i < futureEstimates.length; i++) {  // Offset future estimates by one step
    let x = map(i + 1, 0, measurements.length - 1, windowWidth * 0.05, windowWidth * 0.75);
    let y = -futureEstimates[i] * 5;
    vertex(x, y);
  }
  endShape();


  // Legend
  fill(255, 0, 0);
  noStroke();  // Ensure no stroke is applied to text
  text("Measurements", windowWidth * 0.05, -windowHeight * 0.2);
  fill(0, 0, 255);
  noStroke();  // Ensure no stroke is applied to text
  text("Estimates", windowWidth * 0.05, -windowHeight * 0.18);
  fill(0, 128, 0);  // Darker green for the legend
  text("Future Estimates", windowWidth * 0.05, -windowHeight * 0.16);
  pop();
}

function toggleAnimation() {
  if (animating) {
    animating = false;
    clearInterval(animationInterval);  // Stop the animation
  } else {
    animating = true;
    animationInterval = setInterval(() => {
      if (measurementIndex < min(measurements.length - 1, maxSteps - 1)) {
        nextStep();  // Progress to the next step
      } else {
        clearInterval(animationInterval);  // Stop when reaching the final step
      }
    }, 100);  // Adjust the time interval for smoother or faster animation (200ms is reasonable)
  }
}
