let rules = {
    X: [
      // Original rule chance 50 %
      { rule: "F[+X][-X]FX",  prob: 0.5 },
      
      // Fewer limbs
      { rule: "F[-X]FX",      prob: 0.05 },
      { rule: "F[+X]FX",      prob: 0.05 },
      
      // Extra rotation
      { rule: "F[++X][-X]FX", prob: 0.1 },
      { rule: "F[+X][--X]FX", prob: 0.1 },
      
      // Berries/fruits
      { rule: "F[+X][-X]FA",  prob: 0.1 },
      { rule: "F[+X][-X]FB",  prob: 0.1 }
    ],
    F: [
      // Original rule
      { rule: "FF",  prob: 0.85 },
      
      // Extra growth
      { rule: "FFF", prob: 0.05 },
      
      // Stunted growth
      { rule: "F",   prob: 0.1 },
    ]
  };
  
  const len = 4;
  const ang = 25;
  const numGens = 6;
  
  let drawRules;
  
  let word = "X";
  
  function setup() {
    createCanvas(600, 600);
    
    strokeWeight(2);
    
    drawRules = {
      "A": () => {
        // Draw circle at current location
        noStroke();
        fill("#E5CEDC");
        circle(0, 0, len*2);
      },  
      "B": () => {
        // Draw circle at current location
        noStroke();
        fill("#FCA17D");
        circle(0, 0, len*2);
      },
      "F": () => {
        // Draw line forward, then move to end of line
        stroke("#9ea93f");
        line(0, 0, 0, -len);
        translate(0, -len);
      },
      "+": () => {
        // Rotate right
        rotate(PI/180 * -ang);
      },
      "-": () => {
        // Rotate right
        rotate(PI/180 * ang);
      },
      // Save current location
      "[": push,
      // Restore last location
      "]": pop,
    };
    
    noLoop();
  }
  
  function draw() {
    background(28);
    
    // Generate our L-System from the start
    word = "X";
    
    for(let i = 0; i < numGens; i ++) {
      word = generate();
      console.log(word);
    }
    
    // Draw L-System
    push();
    translate(width/2, height);
    for(let i = 0; i < word.length; i ++) {
      let c = word[i];
      if(c in drawRules) {
        drawRules[c]();
      }  
    }
    pop();
  }
  
  function mouseReleased() {
    draw();
  }
  
  function generate() {
    let next = ""
    
    //looping over all characters inside L-System, check if rule exist 
    for(let i = 0; i < word.length; i ++) {
      let c = word[i];
      if(c in rules) {
        let rule = rules[c];
        
        // Check if we're using an array or not
        if(Array.isArray(rule)) {
          next += chooseOne(rule); // If we are, choose one of the options
        } else {
          next += rules[c]; // Otherwise use the rule directly
        }
      } else {
        next += c;
      }
    }
    
    return next;
  }
  
  function chooseOne(ruleSet) {
    let n = random(); // Random number between 0-1
    let t = 0;
    for(let i = 0; i < ruleSet.length; i++) {
      t += ruleSet[i].prob; // Keep adding the probability of the options to total
      if(t > n) { // If the total is more than the random value
        return ruleSet[i].rule; // Choose that option
      }
    }
    return "";
  }
  
  
  
  
  
  
  