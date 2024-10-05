function rotatePlanet(planetClass, orbitTime, offsetX = 0, offsetY = 0) {
    const planet = document.querySelector(planetClass);
    let angle = 0;
  
    function updatePosition() {
      angle = (angle + 3.6 / orbitTime) % 360;
      const radians = (angle * Math.PI) / 180;
      const radius = planet.parentElement.offsetWidth / 2;
      const x = Math.cos(-radians) * radius + offsetX;
      const y = Math.sin(-radians) * radius + offsetY;
  
      planet.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(updatePosition);
    }
  
    updatePosition();
}
  
rotatePlanet('.mercury', 88);  // Mercury orbit time (in Earth days)
rotatePlanet('.venus', 225);   // Venus orbit time
rotatePlanet('.earth', 365);   // Earth orbit time
rotatePlanet('.mars', 687);    // Mars orbit time

rotatePlanet('.bennu', 438, -20, -26); 
rotatePlanet('.didymos', 771, -35, -52);
rotatePlanet('.ryugu', 475, -25, -30);

let scale = 1;
let lastX = 0, lastY = 0;
let posX = 0, posY = 0;
let isDragging = false;

const container = document.getElementById('container');
const content = document.getElementById('content');

// Function to apply zoom
function zoom(e) {
  e.preventDefault();
  
  // Determine the scale factor (zoom in/out based on scroll direction)
  const zoomSpeed = 0.05;
  const zoomIn = e.deltaY < 0;
  const newScale = zoomIn ? scale + zoomSpeed : scale - zoomSpeed;

  // Limit the scale
  scale = Math.min(Math.max(0.17, newScale), 5);

  // Apply the scaling
  content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

// Function to start dragging
function startDrag(e) {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  container.style.cursor = "grabbing";
}

// Function to stop dragging
function stopDrag() {
  isDragging = false;
  container.style.cursor = "grab";
}

// Function to handle dragging (panning)
function drag(e) {
  if (isDragging) {
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    // Update position
    posX += deltaX;
    posY += deltaY;

    // Apply new position and scaling
    content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;

    // Update last mouse position
    lastX = e.clientX;
    lastY = e.clientY;
  }
}

// Attach event listeners
container.addEventListener('wheel', zoom);
container.addEventListener('mousedown', startDrag);
container.addEventListener('mousemove', drag);
container.addEventListener('mouseup', stopDrag);
container.addEventListener('mouseleave', stopDrag);


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 400
let result = ""
for(let i = 0; i < STAR_COUNT; i++){
    result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 1)}px ${randomNumber(0, 1)}px #fff,`
}
console.log(result.substring(0, result.length - 1))