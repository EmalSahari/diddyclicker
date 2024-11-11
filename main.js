let diddyCount = 0;
let totalDiddysMined = 0; // Track total Diddys mined
let totalDiddysClicked = 0; // Track total Diddys clicked

let babyoilCount = 0;
let babyoilCost = 10;
let babyoilDPS = 1; // Diddys per second for Babyoil
let babyoilMined = 0; // Track Diddys mined by Babyoil
let babyoilUpgradeCost = 7500; // Cost for the upgrade

let dildoCount = 0;
let dildoCost = 100;
let dildoDPS = 5; // Diddys per second for Dildo
let dildoMined = 0; // Track Diddys mined by Dildo

let childCount = 0; // Count for Child
let childCost = 5000; // Cost for Child
let childDPS = 20; // Diddys per second for Child
let childMined = 0; // Track Diddys mined by Child

let diddysPerSecond = 0;
let diddysPerClick = 1;
let clickCount = 0; // Initialize clickCount as 0
let woodenCursorCost = 2000; // Cost of the Wooden Cursor

let slaveCount = 0; // Count for Sexslave
let slaveCost = 10000; // Initial cost for Sexslave
let slaveDPS = 50; // Diddys per second for Sexslave
let slaveMined = 0; // Track Diddys mined by Sexslave

let lastActiveTime = Date.now(); // Track last active time
let intervalID;

// Update the display of Diddys and stats
function updateDiddyDisplay() {
  document.getElementById("diddyCount").innerText = `Diddy's: ${Math.floor(diddyCount)}`;
  document.getElementById("totalDiddysMined").innerText = `All Time Diddys: ${Math.floor(totalDiddysMined)}`;
  document.getElementById("totalDiddysClicked").innerText = `Total Diddys Clicked: ${totalDiddysClicked}`;
  document.getElementById("diddysPerSecond").innerText = Math.floor(diddysPerSecond);
  document.getElementById("diddysPerClick").innerText = Math.floor(diddysPerClick);

  // Left sidebar: Show counts and DPS (mining rate)
  document.getElementById("babyoilCount").innerText = babyoilCount;
  document.getElementById("babyoilDPSDisplay").innerText = Math.floor(babyoilCount * babyoilDPS); // Display Babyoil mining rate

  document.getElementById("dildoCount").innerText = dildoCount;
  document.getElementById("dildoDPSDisplay").innerText = Math.floor(dildoCount * dildoDPS); // Display Dildo mining rate

  document.getElementById("childCount").innerText = childCount;
  document.getElementById("childDPSDisplay").innerText = Math.floor(childCount * childDPS); // Display Child mining rate

  // Right stats bar: Show mined amounts
  document.getElementById("babyoilMined").innerText = Math.floor(babyoilMined); // Display Babyoil mined
  document.getElementById("dildoMined").innerText = Math.floor(dildoMined); // Display Dildo mined
  document.getElementById("childMined").innerText = Math.floor(childMined); // Display Child mined
}

// Generate Diddys gradually based on the current Diddys per second
function generateDiddysGradually() {
  const increment = diddysPerSecond / 10;
  if (diddysPerSecond > 0) {
    diddyCount += increment;
    totalDiddysMined += increment; // Increment total Diddys mined

    // Increment mined totals for each item based on their respective counts
    babyoilMined += babyoilCount * babyoilDPS * (increment / diddysPerSecond); // Increment for Babyoil
    dildoMined += dildoCount * dildoDPS * (increment / diddysPerSecond); // Increment for Dildo
    childMined += childCount * childDPS * (increment / diddysPerSecond); // Increment for Child

    updateDiddyDisplay();
  }
}

// Buy Child
function buyChild() {
  if (diddyCount >= childCost) {
    diddyCount -= childCost;
    childCount += 1; // Increment Child count
    diddysPerSecond += childDPS; // Update total Diddys per second
    childMined += childDPS; // Increment mined Diddys for Child
    childCost = Math.floor(childCost * 1.5); // Increase the cost for next purchase
    document.getElementById("childCost").innerText = childCost; // Update display for child cost
    updateDiddyDisplay();
  } else {
    alert("Not enough Diddys to buy Child!");
  }
}

// Handle visibility changes
function onVisibilityChange() {
  if (document.hidden) {
    lastActiveTime = Date.now();
  } else {
    const now = Date.now();
    const timeDifference = (now - lastActiveTime) / 1000; // Time difference in seconds
    const diddysGained = (diddysPerSecond * timeDifference);
    totalDiddysMined += diddysGained;
    diddyCount += diddysGained;
    updateDiddyDisplay(); // Update the display
  }
}

// Set an interval to generate Diddys every 100 milliseconds
intervalID = setInterval(generateDiddysGradually, 100);

// Functions for buying upgrades and handling game mechanics
function buyWoodenCursor() {
  if (diddyCount >= woodenCursorCost) {
    diddyCount -= woodenCursorCost;
    diddysPerClick = 2; // Upgrade Diddys per click to 2
    const woodenCursorIcon = document.getElementById("woodenCursorImage");
    woodenCursorIcon.style.display = "none"; // Hide the icon
    const upgradesPurchased = document.getElementById("upgradesPurchased");
    const upgradeItem = document.createElement("div");
    upgradeItem.innerHTML = `<img src="woodencursor.png" alt="Wooden Cursor" style="width: 30px; height: 30px; margin: 5px;"/>`;
    upgradesPurchased.appendChild(upgradeItem);
    alert("Wooden Cursor purchased! Diddys per click increased to 2.");
    updateDiddyDisplay();
  } else {
    alert("Not enough Diddys to buy Wooden Cursor!");
  }
}

// Buy Babyoil
function buyBabyoil() {
  if (diddyCount >= babyoilCost) {
    diddyCount -= babyoilCost;
    babyoilCount += 1;
    diddysPerSecond += babyoilDPS; // Update total Diddys per second
    babyoilMined += babyoilDPS; // Increment mined Diddys for Babyoil
    babyoilCost = Math.floor(babyoilCost * 1.5);
    document.getElementById("babyoilCost").innerText = babyoilCost;
    updateDiddyDisplay();
  } else {
    alert("Not enough Diddys to buy Babyoil!");
  }
}

function buyBabyoilUpgrade() {
  if (diddyCount >= babyoilUpgradeCost) {
    diddyCount -= babyoilUpgradeCost;
    babyoilDPS *= 2; // Double Babyoil DPS
    diddysPerSecond += babyoilDPS; // Update total Diddys per second
    document.getElementById("babyoilDPSDisplay").innerText = babyoilDPS; // Update display
    alert("Babyoil Upgrade purchased! Diddys per second doubled.");
    const babyoilUpgradeIcon = document.getElementById("babyoilUpgradeImage");
    babyoilUpgradeIcon.style.display = "none";
    const upgradesPurchased = document.getElementById("upgradesPurchased");
    const upgradeItem = document.createElement("div");
    upgradeItem.innerHTML = `<img src="babyoil.png" alt="Babyoil Upgrade" style="width: 30px; height: 30px; margin: 5px;"/>`; // Add only the icon
    upgradesPurchased.appendChild(upgradeItem);
    updateDiddyDisplay(); // Update overall display
  } else {
    alert("Not enough Diddys to buy Babyoil Upgrade!");
  }
}

// Buy Dildo
function buyDildo() {
  if (diddyCount >= dildoCost) {
    diddyCount -= dildoCost;
    dildoCount += 1;
    diddysPerSecond += dildoDPS; // Update total Diddys per second
    dildoMined += dildoDPS; // Increment mined Diddys for Dildo
    dildoCost = Math.floor(dildoCost * 1.5);
    document.getElementById("dildoCost").innerText = dildoCost;
    updateDiddyDisplay();
  } else {
    alert("Not enough Diddys to buy Dildo!");
  }
}

// Increase Diddy on click
function increaseDiddy() {
  diddyCount += diddysPerClick;
  totalDiddysMined += diddysPerClick; // Increment total Diddys mined on click
  clickCount += 1; //
  totalDiddysClicked += diddysPerClick; // Increment total Diddys clicked

  // Update the display of total clicks
  document.getElementById("clickCount").innerText = ` ${clickCount}`; // Update total clicks display
  updateDiddyDisplay();

  // Play the click sound
  const clickSound = document.getElementById("clickSound");
  if (clickSound) {
    clickSound.currentTime = 0; // Rewind to start
    clickSound.play(); // Play the sound
  }


  // Trigger the bounce animation
  const diddyImage = document.getElementById("clickImage");
  diddyImage.classList.add("bounce");

  // Remove the bounce class after the animation duration
  setTimeout(() => {
    diddyImage.classList.remove("bounce");
  }, 200); // Match this duration to the CSS animation duration
}

function buySlave() {
  if (diddyCount >= slaveCost) {
    diddyCount -= slaveCost;
    slaveCount += 1; // Increment Slave count
    diddysPerSecond += slaveDPS; // Update total Diddys per second
    slaveMined += slaveDPS; // Increment mined Diddys for Slave
    slaveCost = Math.floor(slaveCost * 1.5); // Increase cost for next purchase
    document.getElementById("slaveCost").innerText = slaveCost; // Update display
    updateDiddyDisplay();
  } else {
    alert("Not enough Diddys to buy Sexslave!");
  }
}

// Event listeners
document.getElementById("babyoilUpgradeImage").addEventListener("click", buyBabyoilUpgrade);
document.getElementById("clickImage").addEventListener("click", increaseDiddy);
document.getElementById("buyBabyoil").addEventListener("click", buyBabyoil);
document.getElementById("buyDildo").addEventListener("click", buyDildo);
document.getElementById("buyChild").addEventListener("click", buyChild);

// Event listener for keydown to allow spacebar to increase Diddys
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (like scrolling down the page)
    increaseDiddy(); // Call the function to increase Diddys
  }
});

// Initial display update
updateDiddyDisplay();

// Event listener for the wooden cursor image click
document.getElementById("woodenCursorImage").addEventListener("click", buyWoodenCursor);

// Event listener for the upgrade button
document.getElementById("upgradeButton").addEventListener("click", function() {
  console.log("Upgrade button clicked!"); // Debugging line
  const popup = document.getElementById("upgradePopup");
  popup.style.display = "block"; // Show the popup
  console.log("Popup display set to:", popup.style.display); // Check display status
});

// Event listener for closing the popup
document.getElementById("closePopup").addEventListener("click", function() {
  console.log("Close button clicked!"); // Debugging line
  document.getElementById("upgradePopup").style.display = "none"; // Hide the popup
});

// Handle visibility change for the document
document.addEventListener("visibilitychange", onVisibilityChange);

document.getElementById("buySlave").addEventListener("click", buySlave);
document.getElementById("slaveCount").innerText = slaveCount; // Display Slave count
document.getElementById("slaveDPSDisplay").innerText = Math.floor(slaveCount * slaveDPS); // Display Slave mining rate


