let stage = 0;
let weight = 1.0;
let maxInput = 2;
let maxBias = 2;
let numInputs = 3;
let alpha = 0.01; // Default alpha value for Parametric ReLU

let inputs = new Array(numInputs);
let minInput = -1 * maxInput;
let bias = maxBias / 2;
let minBias = -1 * maxBias;

let z = 0;
let activation = 0;
let showActivation = true;
// Variables for the activation function graph
let graphX, graphY, graphWidth, graphHeight;

let draggingInput = false;
let draggingWeight = false;
let draggingBias = false;
let draggingIndex = -1; // Index of the input being dragged

let inputActive = false;
let biasActive = false;
let alphaActive = false; // New flag for alpha input
let inputText = "";
let biasText = "";
let alphaText = "0.01"; // New variable for alpha input
let enterButtonHover = false;
let alphaEnterButtonHover = false; // New flag for alpha enter button hover

let activationFunction = "ReLU";
let zValues = [];
let activationValues = [];
let graphSize = 200; // Number of points in the graph

// Constants for SELU
const lambdaSELU = 1.0507;
const alphaSELU = 1.6733;

function setup() {
  createCanvas(1000, 600); // Increased canvas width to 1000
  smooth();
  textAlign(CENTER, CENTER);
  graphX = width - 250; // Adjusted graph position
  graphY = 25;
  graphWidth = 100;
  graphHeight = 100;
  
  for (let i = 0; i < inputs.length; i++) {
    inputs[i] = random(minInput, maxInput);
  }
}

function draw() {
  background(240);
  drawNeuron();
  drawUI();
  drawTextBoxesAndButton();
  drawActivationButtons(); // New function to draw activation buttons
  if (showActivation) {
    calculateActivation();
  }
  drawActivationGraph();
}

function drawNeuron() {
  let x = width / 2 - 100; // Adjusted x position
  let y = height / 2 - 50; // Move neuron up by 50 pixels
  
  fill(200);
  stroke(0);
  strokeWeight(2);
  
  // Draw inputs symmetrically at 180, 150, and 210 degrees
  let angles = [ PI, PI + PI / 6, PI - PI / 6 ];
  for (let i = 0; i < numInputs; i++) {
    let inputX = x + 200 * cos(angles[i]);
    let inputY = y + 200 * sin(angles[i]);
    let inputValue = inputs[i];
    let colorValue = map(inputValue, minInput, maxInput, 0, 1);
    let lineColor = lerpColor(color(255, 0, 0), color(0, 0, 255), colorValue);
    stroke(lineColor); // Gradient from dark red to dark blue
    strokeWeight(5 * abs(inputValue) / maxInput); // Normalize based on maxInput
    line(inputX, inputY, x, y);
  }
  
  // Draw weights
  if (stage > 0) {
    for (let i = 0; i < numInputs; i++) {
      let inputX = x + 200 * cos(angles[i]);
      let inputY = y + 200 * sin(angles[i]);
      let weightValue = weight * (i + 1) / 3.0;
      let colorValue = map(weightValue, 0, maxInput, 0, 1);
      let lineColor = lerpColor(color(255, 0, 0), color(0, 0, 255), colorValue);
      stroke(lineColor); // Gradient from dark red to dark blue
      strokeWeight(5 * weightValue / maxInput); // Normalize based on maxInput
      line(inputX, inputY, x, y);
    }
  }
  
  // Draw bias
  if (stage > 1) {
    fill(255, 200, 100);
    ellipse(x + 100, y + 100, 80, 80);
  }
  
  // Draw neuron
  let neuronColorValue = map(z, minInput * 3 + minBias, maxInput * 3 + maxBias, 0, 1);
  let neuronColor = lerpColor(color(255, 0, 0), color(0, 0, 255), neuronColorValue); // Gradient from dark red to dark blue
  fill(neuronColor);
  stroke(0); // Constant outline color
  strokeWeight(2); // Constant outline thickness
  ellipse(x, y, 100, 100);
  
  // Draw activation and output line
  if (showActivation) {
    let outputX = x + 50;
    let outputY = y;
    let maxZ = 3 * maxInput * weight + maxBias;
    let activationColorValue = map(activation, -maxZ, maxZ, 0, 1);
    let activationColor = lerpColor(color(255, 0, 0), color(0, 0, 255), activationColorValue); // Gradient from dark red to dark blue
    stroke(activationColor);
    strokeWeight(5 * abs(activation) / maxZ); // Normalize based on maxZ
    line(x + 50, y, outputX + 50, outputY); // Adjust line to start from edge of neuron
  }
  
  // Draw input values
  for (let i = 0; i < numInputs; i++) {
    let inputX = x + 200 * cos(angles[i]);
    let inputY = y + 200 * sin(angles[i]);
    noStroke();
    fill(0);
    text(nf(inputs[i], 1, 2), inputX, inputY - 20);
  }
  
  // Draw z and activation values
  if (showActivation) {
    noStroke();
    fill(0);
    text(nf(z, 1, 2), x, y); // Display z at the center of the neuron
    text("Output: " + nf(activation, 1, 2), x + 150, y); // Shifted output text to the right
  }
}

function drawUI() {
  let x = width / 2 - 100; // Adjusted x position
  let y = height / 2 + 130; // Moved everything down by 30 pixels
  
  fill(0);
  textSize(24);
  text("Single Neuron Activation", x, 50);
  
  textSize(16);
  fill(0);
  text("Input 1: " + nf(inputs[0], 1, 2), x - 200, y - 40); // Adjusted y position
  text("Input 2: " + nf(inputs[1], 1, 2), x - 200, y + 10); // Adjusted y position
  text("Input 3: " + nf(inputs[2], 1, 2), x - 200, y + 60); // Adjusted y position
  text("Weight: " + nf(weight, 1, 2), x, y - 30);
  text("Bias: " + nf(bias, 1, 2), x + 200, y - 30);
  
  // Sliders
  stroke(0);
  strokeWeight(2);
  
  // Input sliders
  for (let i = 0; i < numInputs; i++) {
    line(x - 250, y - 60 + (i * 50), x - 150, y - 60 + (i * 50)); // Adjusted y position for more space
    fill(100, 200, 255);
    ellipse(x - 250 + map(inputs[i], minInput, maxInput, 0, 100), y - 60 + (i * 50), 20, 20); // Adjusted y position for more space
  }
  
  // Weight slider
  line(x - 50, y, x + 50, y);
  fill(100, 200, 255);
  ellipse(x - 50 + weight * 100, y, 20, 20);
  
  // Bias slider
  line(x + 150, y, x + 250, y);
  fill(100, 200, 255);
  ellipse(x + 150 + map(bias, minBias, maxBias, 0, 100), y, 20, 20); // Corrected mapping range
}

function drawTextBoxesAndButton() {
  // Text Boxes
  fill(255);
  stroke(0);
  
  // Input Text Box
  if (inputActive) {
    fill(200);
  }
  rect(80, 50, 100, 30);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text(inputText, 85, 65);
  textAlign(RIGHT, CENTER);
  text("maxInput:", 75, 65);

  // Bias Text Box
  fill(255);
  stroke(0); // Add outline to maxBias similar to maxInput
  if (biasActive) {
    fill(200);
  }
  rect(80, 100, 100, 30);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text(biasText, 85, 115);
  textAlign(RIGHT, CENTER);
  text("maxBias:", 75, 115);

  if (activationFunction === "Parametric ReLU") {
    // Alpha Text Box for Parametric ReLU
    fill(255);
    stroke(0); // Add outline to alpha input box
    if (alphaActive) {
      fill(200);
    }
    rect(670, 470, 60, 30); // Adjusted position
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    text(alphaText, 675, 485);
    textAlign(RIGHT, CENTER);
    text("Alpha:", 650, 485); // Adjusted position

    // Alpha Enter Button
    fill(200);
    if (alphaEnterButtonHover) {
      fill(150);
    }
    rect(740, 470, 60, 30); // Adjusted position
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Enter", 770, 485);
  }

  // Enter Button
  fill(200);
  if (enterButtonHover) {
    fill(150);
  }
  rect(80, 150, 100, 30);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Enter", 130, 165);
}

function drawActivationButtons() {
  let x = width - 100; // Adjusted x position for sidebar
  let y = 100; // Initial y position for buttons
  
  // Activation function buttons
  noStroke();
  fill(activationFunction === "ReLU" ? color(150) : color(200));
  rect(x - 50, y, 100, 40);
  fill(activationFunction === "Softmax" ? color(150) : color(200));
  rect(x - 50, y + 50, 100, 40);
  fill(activationFunction === "Binary Step" ? color(150) : color(200));
  rect(x - 50, y + 100, 100, 40);
  fill(activationFunction === "Linear" ? color(150) : color(200));
  rect(x - 50, y + 150, 100, 40);
  fill(activationFunction === "Leaky ReLU" ? color(150) : color(200));
  rect(x - 50, y + 200, 100, 40);
  fill(activationFunction === "Parametric ReLU" ? color(150) : color(200));
  rect(x - 50, y + 250, 100, 40);
  fill(activationFunction === "SELU" ? color(150) : color(200));
  rect(x - 50, y + 300, 100, 40);
  fill(activationFunction === "Swish" ? color(150) : color(200)); // New button for Swish
  rect(x - 50, y + 350, 100, 40);
  fill(0);
  textSize(16);
  text("ReLU", x, y + 20);
  text("Softmax", x, y + 70);
  text("Binary Step", x, y + 120);
  text("Linear", x, y + 170);
  text("Leaky ReLU", x, y + 220);
  text("PReLU", x, y + 270);
  text("SELU", x, y + 320);
  text("Swish", x, y + 370); // New button text for Swish
}

function mousePressed() {
  let x = width / 2 - 100; // Adjusted x position
  let y = height / 2 + 130; // Adjust for moved sliders (shifted down by 30 pixels)
  
  // Check if text boxes are clicked
  if (mouseX > 80 && mouseX < 180 && mouseY > 50 && mouseY < 80) {
    inputActive = true;
    biasActive = false;
    alphaActive = false;
  } else if (mouseX > 80 && mouseX < 180 && mouseY > 100 && mouseY < 130) {
    biasActive = true;
    inputActive = false;
    alphaActive = false;
  } else if (mouseX > 670 && mouseX < 730 && mouseY > 470 && mouseY < 500 && activationFunction === "Parametric ReLU") {
    alphaActive = true;
    inputActive = false;
    biasActive = false;
  } else {
    inputActive = false;
    biasActive = false;
    alphaActive = false;
  }
  
  // Check if Enter button is clicked
  if (mouseX > 80 && mouseX < 180 && mouseY > 150 && mouseY < 180) {
    enter();
  }
  
  // Check if Alpha Enter button is clicked
  if (mouseX > 740 && mouseX < 800 && mouseY > 470 && mouseY < 500 && activationFunction === "Parametric ReLU") {
    alphaEnter();
  }

  // Input sliders
  for (let i = 0; i < numInputs; i++) {
    if (dist(mouseX, mouseY, x - 250 + map(inputs[i], minInput, maxInput, 0, 100), y - 60 + (i * 50)) < 10) {
      draggingInput = true;
      draggingIndex = i;
    }
  }
  
  // Weight slider
  if (dist(mouseX, mouseY, x - 50 + weight * 100, y) < 10) {
    draggingWeight = true;
  }
  
  // Bias slider
  if (dist(mouseX, mouseY, x + 150 + map(bias, minBias, maxBias, 0, 100), y) < 10) {
    draggingBias = true;
  }
  
  // Activation function buttons
  let buttonX = width - 100; // Adjusted x position for sidebar
  if (mouseX > buttonX - 50 && mouseX < buttonX + 50) {
    if (mouseY > 100 && mouseY < 140) {
      activationFunction = "ReLU";
    }
    if (mouseY > 150 && mouseY < 190) {
      activationFunction = "Softmax";
    }
    if (mouseY > 200 && mouseY < 240) {
      activationFunction = "Binary Step";
    }
    if (mouseY > 250 && mouseY < 290) {
      activationFunction = "Linear";
    }
    if (mouseY > 300 && mouseY < 340) {
      activationFunction = "Leaky ReLU";
    }
    if (mouseY > 350 && mouseY < 390) {
      activationFunction = "Parametric ReLU";
    }
    if (mouseY > 400 && mouseY < 440) {
      activationFunction = "SELU";
    }
    if (mouseY > 450 && mouseY < 490) {
      activationFunction = "Swish"; // New button for Swish
    }
  }
}

function mouseDragged() {
  let x = width / 2 - 100; // Adjusted x position
  let y = height / 2 + 100; // Adjust for moved sliders
  
  if (draggingInput) {
    inputs[draggingIndex] = map(mouseX, x - 250, x - 150, minInput, maxInput);
    inputs[draggingIndex] = constrain(inputs[draggingIndex], minInput, maxInput);
  }
  
  if (draggingWeight) {
    weight = map(mouseX, x - 50, x + 50, 0, 1);
    weight = constrain(weight, 0, 1);
  }
  
  if (draggingBias) {
    bias = map(mouseX, x + 150, x + 250, minBias, maxBias);
    bias = constrain(bias, minBias, maxBias);
  }
}

function mouseReleased() {
  draggingInput = false;
  draggingIndex = -1; // Reset the dragging index
  draggingWeight = false;
  draggingBias = false;
}

function mouseMoved() {
  // Check if the mouse is hovering over the Enter button
  if (mouseX > 180 && mouseX < 280 && mouseY > 150 && mouseY < 180) {
    enterButtonHover = true;
  } else {
    enterButtonHover = false;
  }

  // Check if the mouse is hovering over the Alpha Enter button
  if (mouseX > 740 && mouseX < 800 && mouseY > 470 && mouseY < 500 && activationFunction === "Parametric ReLU") {
    alphaEnterButtonHover = true;
  } else {
    alphaEnterButtonHover = false;
  }
}

function keyPressed() {
  if (inputActive) {
    if (key === 'Backspace') {
      if (inputText.length > 0) {
        inputText = inputText.substring(0, inputText.length - 1);
      }
    } else if (key === 'Enter' || key === 'Return') {
      inputActive = false;
    } else if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
      inputText += key;
    }
  } else if (biasActive) {
    if (key === 'Backspace') {
      if (biasText.length > 0) {
        biasText = biasText.substring(0, biasText.length - 1);
      }
    } else if (key === 'Enter' || key === 'Return') {
      biasActive = false;
    } else if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
      biasText += key;
    }
  } else if (alphaActive) {
    if (key === 'Backspace') {
      if (alphaText.length > 0) {
        alphaText = alphaText.substring(0, alphaText.length - 1);
      }
    } else if (key === 'Enter' || key === 'Return') {
      alphaActive = false;
    } else if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
      alphaText += key;
    }
  } else if (key === ' ') {
    if (stage < 2) {
      stage++;
    } else {
      showActivation = true;
      stage = 0;
    }
  }
}

function enter() {
  try {
    maxInput = float(inputText);
    maxInput = constrain(maxInput, 1, 16383); // Constrain maxInput between 1 and 16383
    inputText = maxInput.toString(); // Update inputText to show the constrained value
    minInput = -1 * maxInput;
    
    maxBias = float(biasText);
    maxBias = constrain(maxBias, 1, 16383); // Constrain maxBias between 1 and 16383
    biasText = maxBias.toString(); // Update biasText to show the constrained value
    minBias = -1 * maxBias;
    
    alpha = float(alphaText);
    alpha = constrain(alpha, 0.01, 1); // Constrain alpha between 0.01 and 1
    alphaText = alpha.toString(); // Update alphaText to show the constrained value
    
    // Reset input and bias to within new ranges
    for (let i = 0; i < inputs.length; i++) {
      inputs[i] = constrain(inputs[i], minInput, maxInput);
    }
    bias = constrain(bias, minBias, maxBias);
  } catch (e) {
    console.log("Invalid input");
  }
}

function alphaEnter() {
  try {
    alpha = float(alphaText);
    alpha = constrain(alpha, 0.01, 1); // Constrain alpha between 0.01 and 1
    alphaText = alpha.toString(); // Update alphaText to show the constrained value
  } catch (e) {
    console.log("Invalid alpha input");
  }
}

function calculateActivation() {
  z = 0;
  for (let i = 0; i < inputs.length; i++) {
    z += inputs[i] * weight;
  }
  z += bias;
  if (activationFunction === "ReLU") {
    activation = max(0, z); // ReLU activation function
  } else if (activationFunction === "Softmax") {
    activation = exp(z) / (exp(z) + 1); // Softmax approximation for single neuron
  } else if (activationFunction === "Binary Step") {
    activation = z >= 0 ? 1 : 0; // Binary step activation function
  } else if (activationFunction === "Linear") {
    activation = z; // Linear activation function
  } else if (activationFunction === "Leaky ReLU") {
    activation = z > 0 ? z : 0.01 * z; // Leaky ReLU activation function
  } else if (activationFunction === "Parametric ReLU") {
    activation = z > 0 ? z : alpha * z; // Parametric ReLU activation function
  } else if (activationFunction === "SELU") {
    activation = z >= 0 ? lambdaSELU * z : lambdaSELU * alphaSELU * (exp(z) - 1); // SELU activation function
  } else if (activationFunction === "Swish") {
    activation = z * (1 / (1 + exp(-z))); // Swish activation function
  }
  
  // Store the latest values in the graph arrays
  zValues.push(z);
  activationValues.push(activation);
  if (zValues.length > graphSize) {
    zValues.shift();
    activationValues.shift();
  }
}

function drawGraph() {
  let graphX = width - 250;
  let graphY = 50;
  let graphWidth = 200;
  let graphHeight = 200;
  
  // Draw graph background
  fill(240);
  stroke(0);
  rect(graphX, graphY, graphWidth, graphHeight);
  
  // Draw the axes
  stroke(0);
  line(graphX, graphY + graphHeight / 2, graphX + graphWidth, graphY + graphHeight / 2); // X-axis
  line(graphX + graphWidth / 2, graphY, graphX + graphWidth / 2, graphY + graphHeight); // Y-axis
  
  // Draw the z values as the input
  stroke(0, 0, 255);
  noFill();
  beginShape();
  for (let i = 0; i < zValues.length; i++) {
    let x = map(i, 0, graphSize, graphX, graphX + graphWidth);
    let y = map(zValues[i], -1, 1, graphY + graphHeight, graphY);
    vertex(x, y);
  }
  endShape();
  
  // Draw the activation values
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (let i = 0; i < activationValues.length; i++) {
    let x = map(i, 0, graphSize, graphX, graphX + graphWidth);
    let y = map(activationValues[i], 0, 1, graphY + graphHeight, graphY);
    vertex(x, y);
  }
  endShape();
}

function drawActivationGraph() {
  // Calculate dynamic range based on minimum and maximum possible values of input and bias
  let minRange = 3 * minInput + minBias;
  let maxRange = 3 * maxInput + maxBias;

  // Draw graph background
  fill(240);
  noStroke();
  rect(graphX, graphY, graphWidth, graphHeight);
  
  // Draw the activation function
  stroke(255, 165, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = minRange; i <= maxRange; i += 0.1) {
    let x = map(i, minRange, maxRange, graphX, graphX + graphWidth);
    let y;
    if (activationFunction === "ReLU") {
      y = map(max(0, i), minRange, maxRange, graphY + graphHeight, graphY);
    } else if (activationFunction === "Softmax") {
      y = map(1 / (1 + exp(-i)), 0, 1, graphY + graphHeight, graphY);
    } else if (activationFunction === "Binary Step") {
      y = map(i >= 0 ? 1 : 0, 0, 1, graphY + graphHeight, graphY);
    } else if (activationFunction === "Linear") {
      y = map(i, minRange, maxRange, graphY + graphHeight, graphY);
    } else if (activationFunction === "Leaky ReLU") {
      y = map(i > 0 ? i : 0.01 * i, minRange, maxRange, graphY + graphHeight, graphY);
    } else if (activationFunction === "Parametric ReLU") {
      y = map(i > 0 ? i : alpha * i, minRange, maxRange, graphY + graphHeight, graphY);
    } else if (activationFunction === "SELU") {
      y = map(i >= 0 ? lambdaSELU * i : lambdaSELU * alphaSELU * (exp(i) - 1), minRange, maxRange, graphY + graphHeight, graphY);
    } else if (activationFunction === "Swish") {
      y = map(i * (1 / (1 + exp(-i))), minRange, maxRange, graphY + graphHeight, graphY); // Swish activation function
    }
    vertex(x, y);
  }
  endShape();
  
  // Draw the live point
  let liveX = map(z, minRange, maxRange, graphX, graphX + graphWidth);
  let liveY;
  if (activationFunction === "ReLU") {
    liveY = map(max(0, z), minRange, maxRange, graphY + graphHeight, graphY);
  } else if (activationFunction === "Softmax") {
    liveY = map(1 / (1 + exp(-z)), 0, 1, graphY + graphHeight, graphY);
  } else if (activationFunction === "Binary Step") {
    liveY = map(z >= 0 ? 1 : 0, 0, 1, graphY + graphHeight, graphY);
  } else if (activationFunction === "Linear") {
    liveY = map(z, minRange, maxRange, graphY + graphHeight, graphY);
  } else if (activationFunction === "Leaky ReLU") {
    liveY = map(z > 0 ? z : 0.01 * z, minRange, maxRange, graphY + graphHeight, graphY);
  } else if (activationFunction === "Parametric ReLU") {
    liveY = map(z > 0 ? z : alpha * z, minRange, maxRange, graphY + graphHeight, graphY);
  } else if (activationFunction === "SELU") {
    liveY = map(z >= 0 ? lambdaSELU * z : lambdaSELU * alphaSELU * (exp(z) - 1), minRange, maxRange, graphY + graphHeight, graphY);
  } else if (activationFunction === "Swish") {
    liveY = map(z * (1 / (1 + exp(-z))), minRange, maxRange, graphY + graphHeight, graphY); // Swish activation function
  }
  fill(255, 0, 0);
  ellipse(liveX, liveY, 10, 10);
}
