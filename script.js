const orbitalPeriods = {
  mercury: 88,
  venus: 225,
  earth: 365,
  mars: 687,
  bennu: 448,
  didymos: 771,
  ryugu: 475
};

// Function to calculate and update the planet's position over time
function movePlanet(planetClass, semiMajorAxisAU, orbitalPeriod, orbitCenterX = 0, orbitCenterY = 0) {
  const planet = document.querySelector(planetClass);
  let angle = 0;  // Initial angle

  function updatePosition() {

      // Calculate the current time in days (scaled for faster simulation)
      const time = (Date.now() / 10000) % orbitalPeriod;
    
      // Calculate the angle of the planet along its orbit
      angle = (time / orbitalPeriod) * 2 * Math.PI;

      // Calculate the X and Y positions in AU
      const xAU = Math.cos(-angle) * semiMajorAxisAU;
      const yAU = Math.sin(-angle) * semiMajorAxisAU ;
    
      // Scale factor to convert AU to pixels
      const scaleFactor = 1500
      const xPos = xAU * scaleFactor + orbitCenterX;
      const yPos = yAU * scaleFactor + orbitCenterY;

      // Apply the new position to the planet
      planet.style.transform = `translate(${xPos}px, ${yPos}px)`;
      
      // Request the next frame for smooth animation
      requestAnimationFrame(updatePosition);
  }

  // Start the animation
  updatePosition()
  }


// Move each planet using its orbital period and distance (semi-major axis in AU)
movePlanet('.mercury', 0.387, orbitalPeriods.mercury);
movePlanet('.venus', 0.723, orbitalPeriods.venus);
movePlanet('.earth', 1.000, orbitalPeriods.earth);
movePlanet('.mars', 1.524, orbitalPeriods.mars);

movePlanet('.bennu', 1.066, orbitalPeriods.bennu);
movePlanet('.didymos', 1.400, orbitalPeriods.didymos);
movePlanet('.ryugu', 1.133, orbitalPeriods.ryugu);

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
  selectedPlanet = "None"
  sunButton.classList.remove('active');
  mercuryButton.classList.remove('active');
  venusButton.classList.remove('active');
  earthButton.classList.remove('active');
  marsButton.classList.remove('active');
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
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 400
let result = ""
for(let i = 0; i < STAR_COUNT; i++){
  result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 1)}px ${randomNumber(0, 1)}px #fff,`
}
console.log(result.substring(0, result.length - 1))
// Attach event listeners
container.addEventListener('wheel', zoom);
container.addEventListener('mousedown', startDrag);
container.addEventListener('mousemove', drag);
container.addEventListener('mouseup', stopDrag);
container.addEventListener('mouseleave', stopDrag);
const mainContainer = document.getElementById("container");
const sun_div = document.getElementById("sun");
sun_div.addEventListener("mouseenter", function() {
  shouldStop = true;
  if (!hasRun) {
    console.log("Function is called for the first time.");
    console.log("Mouse is hovering over the div");
    typer(sun_element, sun_text, 50);
    hasRun = true; 
  } else {
    console.log("This function called twice");
    sun_element.textContent = '';
    typer(sun_element, sun_text, 50);
  }
});
sun_div.addEventListener("mouseleave", function() {
    console.log("Mouse left the div");
});
let hasRun = false;
let shouldStop = false;
const sun_element = document.getElementById("info");
const sun_text = "Sun is the star at the center of the Solar System. It is a massive, nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy from its surface mainly as visible light and infrared radiation with 10% at ultraviolet energies..";
function typer(element, text, speed = 50, cursorBlink = true) {
  let i = 0;
  if (shouldStop) {
    console.log('Function stopped');
    return; // Exits the function
}
  const typef = () => {
      if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typef, speed); // Control typing speed
      } else {
          // Optional: Stop cursor blinking after typing finishes
          if (!cursorBlink) {
              element.style.borderRight = "none";
          }
      }
  };
  typef();
}
let selectedPlanet = "None";
const sunButton = document.getElementById("sun_btn");
const mercuryButton = document.getElementById("mercury_btn");
const venusButton = document.getElementById("venus_btn");
const earthButton = document.getElementById("earth_btn");
const marsButton = document.getElementById("mars_btn");
sunButton.addEventListener("click", function() {
  sunButton.classList.add('active');
  mercuryButton.classList.remove('active');
  venusButton.classList.remove('active');
  earthButton.classList.remove('active');
  marsButton.classList.remove('active');
  shouldStop = false;
  selectedPlanet = ".sun";
  view_updater();
  sun_element.textContent = '';
  typer(sun_element, sun_text, 50);
});
mercuryButton.addEventListener("click", function() {
  mercuryButton.classList.add('active');
  sunButton.classList.remove('active');
  venusButton.classList.remove('active');
  earthButton.classList.remove('active');
  marsButton.classList.remove('active');
  selectedPlanet = ".mercury";
  view_updater();
  
});
venusButton.addEventListener("click", function() {
  venusButton.classList.add('active');
  sunButton.classList.remove('active');
  mercuryButton.classList.remove('active');
  earthButton.classList.remove('active');
  marsButton.classList.remove('active');
  selectedPlanet = ".venus";
  view_updater();
});
earthButton.addEventListener("click", function() {
  earthButton.classList.add('active');
  sunButton.classList.remove('active');
  mercuryButton.classList.remove('active');
  venusButton.classList.remove('active');
  marsButton.classList.remove('active');
  selectedPlanet = ".earth";
  view_updater();
});
marsButton.addEventListener("click", function() {
  marsButton.classList.add('active');
  sunButton.classList.remove('active');
  mercuryButton.classList.remove('active');
  earthButton.classList.remove('active');
  venusButton.classList.remove('active');
  selectedPlanet = ".mars";
  view_updater();
});
view_updater();
function view_updater(){
  console.log("LOOP");
  if (selectedPlanet != "None"){
    const planet = document.querySelector(selectedPlanet);
    const rect = planet.getBoundingClientRect(); // Get the planet's position

    // Center the view on the selected planet
    const targetX = -rect.left + window.innerWidth / 10 - rect.width / 1; // Center the planet horizontally
    const targetY = -rect.top + window.innerHeight / 10 - rect.height / 1; // Center the planet vertically

    // Apply the new translation
    content.style.transition = 'transform 0.5s ease'; // Ensure the transition is smooth
    content.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;

    // Reset transition for future movements
    setTimeout(() => {
        content.style.transition = '';
    }, 500);
    requestAnimationFrame(view_updater);
  }
}
