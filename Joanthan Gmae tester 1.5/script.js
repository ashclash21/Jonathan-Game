// Initial values
let score = parseInt(localStorage.getItem("score")) || 0;  
let autoClickerLevel = parseInt(localStorage.getItem("autoClickerLevel")) || 0;  
let autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 100; 
let clicksPerSecond = autoClickerLevel;  
let potatoAutoClickerLevel = parseInt(localStorage.getItem("potatoAutoClickerLevel")) || 0;  
let potatoAutoClickerCost = parseInt(localStorage.getItem("potatoAutoClickerCost")) || 3;
let potato = parseInt(localStorage.getItem("potato")) || 0;
let autoClickerInterval = null;
let rebirthNum = parseInt(localStorage.getItem("rebirthNum")) || 0;
let allClicks = parseInt(localStorage.getItem("allClicks")) || 0;



const jonathanButton = document.getElementById("jonathanButton");
const scoreDisplay = document.getElementById("score");
const shopButton = document.getElementById("shopButton");
const shopPanel = document.getElementById("shopPanel");
const closeShopButton = document.getElementById("closeShopButton");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const autoClickerLevelDisplay = document.getElementById("autoClickerLevel");
const autoClickerCostDisplay = document.getElementById("autoClickerCost");
const potatoAutoClickerLevelDisplay = document.getElementById("potatoAutoClickerLevel");
const potatoAutoClickerCostDisplay = document.getElementById("potatoAutoClickerCost");
const buyPotatoAutoClickerButton = document.getElementById("buyPotatoAutoClicker");
const potatoDisplay = document.getElementById("potatoScore");
const rebirthButton = document.getElementById("rebirthButton");
const rebirthDisplay = document.getElementById("rebirthNum");
const allClicksDisplay = document.getElementById("allClicks");


// Update UI elements for game and shop
function updateUI() {
    allClicksDisplay.textContent = "ALL TIME CLICKS: " + allClicks;
    scoreDisplay.textContent = "Score: " + score;
    autoClickerLevelDisplay.textContent = autoClickerLevel;
    autoClickerCostDisplay.textContent = autoClickerCost;
    potatoDisplay.textContent = "🥔Potatoes🥔: " + potato;
    potatoAutoClickerCostDisplay.textContent = potatoAutoClickerCost;
    rebirthDisplay.textContent = "Rebirths: " + rebirthNum;
}

// Game Click Function
jonathanButton.addEventListener("click", function() {
    let previousScore = score;
    score++;
    let previousClicks = allClicks;
    allClicks++;
    updateUI();

    // Speech synthesis for "Jonathan"
    const speech = new SpeechSynthesisUtterance("Jonathan");
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);

    // Prevent Enter key from triggering the click event
    document.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    // Ensure potatoes are granted **every 25000 clicks**, even with auto-clickers
    if (Math.floor(score / 25000) > Math.floor(previousScore / 25000)) {
        potato++;
        showPotatoImage();
    }

    // Save to localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("potato", potato);
    localStorage.setItem("allClicks",allClicks);
});


// Function to show the image and pause everything for 10 seconds
function showPotatoImage() {
    const image = document.createElement('img');
    image.src = './Potato.png';  
    image.id = 'randomImage';
    image.style.position = 'absolute';
    image.style.top = '50%';
    image.style.left = '50%';
    image.style.transform = 'translate(-50%, -50%)';
    image.style.zIndex = '5'; 

    image.onload = function() {
        document.body.appendChild(image);
    };

    image.onerror = function() {
        console.error("Image failed to load.");
    };

    jonathanButton.disabled = true;

    setTimeout(function() {
        image.remove();
        jonathanButton.disabled = false;
    }, 5000);
}

//rebirth button
rebirthButton.addEventListener("click",function() {
    if (score > 200000) {
        let confirmation = confirm("By clicking \"yes\", you will restart all your progress and earn a rebirth");
        if (confirmation){
            rebirth();
        }
        else{

        }
    } else {
        alert("You need have at least 200,000 thousand clicks!");
    }
    updateUI();
});

//rebirth function
function rebirth(){
    rebirthNum += 1;
    localStorage.setItem("rebirthNum", rebirthNum);
    clicksPerSecond = 2;
    potatoAutoClickerLevel = 0;
    autoClickerCost = 100;
    autoClickerLevel = 3;
    score = 0;
    updateUI();
}

// Open shop panel
shopButton.addEventListener("click", function() {
    shopPanel.style.display = "block";
    updateUI();
});

// Close shop panel
closeShopButton.addEventListener("click", function() {
    shopPanel.style.display = "none";
});

// Buying the auto-clicker upgrade
buyAutoClickerButton.addEventListener("click", function() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerLevel++;  
        clicksPerSecond = autoClickerLevel;  
        autoClickerCost = Math.floor(autoClickerCost * 1.5);  

        localStorage.setItem("score", score);
        localStorage.setItem("autoClickerLevel", autoClickerLevel);
        localStorage.setItem("autoClickerCost", autoClickerCost);

        startAutoClicker();
        updateUI();
    } else {
        alert("Not enough clicks!");
    }
});

// Buying the Potato auto-clicker upgrade
buyPotatoAutoClickerButton.addEventListener("click", function() {
    if (potato >= potatoAutoClickerCost) {
        potato -= potatoAutoClickerCost;
        autoClickerLevel += 10;  
        clicksPerSecond = autoClickerLevel;  

        localStorage.setItem("potato", potato);
        localStorage.setItem("score", score);
        localStorage.setItem("autoClickerLevel", autoClickerLevel);

        startAutoClicker();
        updateUI();
    } else {
        alert("Not enough potatoes!");
    }
});

// Start auto-clicker effect
function startAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
    }

    autoClickerInterval = setInterval(() => {
        let previousScore = score;
        score += clicksPerSecond;
        allClicks += clicksPerSecond;

        // Check potato milestone
        if (Math.floor(score / 25000) > Math.floor(previousScore / 25000)) {
            potato++;
            showPotatoImage();
        }

        localStorage.setItem("allClicks",allClicks)
        localStorage.setItem("score", score);
        localStorage.setItem("potato", potato);
        updateUI();
    }, 1000);
}


// Automatically start the auto-clicker if the player has upgrades
if (autoClickerLevel > 0) {
    clicksPerSecond = autoClickerLevel;
    startAutoClicker();
}

updateUI(); // Initial UI update

console.log("%cStop!","color: red; font-size: 30px; font-weight: bold;");
console.log("This is a game. Don’t put any code here unless you want to ruin everything! That includes you Lincoln...");