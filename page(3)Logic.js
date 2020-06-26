var ball;
var obstacles = [];

function startGame() {//invokes the myGameArea object start
  ball = new component(30, 30, "assets/b_ball.png", 90, 90, "image");//constructor initiating the basketball objct
   // Obstacles =  new component(10, 200, "red", 300, 120); //initiating the obstacles
  goal = new component(50, 50, "assets/hoop.jpg", 1100, 120, "image");  
  shot = new component(50, 150, "assets/shooter1.png", 15, 120,"image");
  myGameArea.start(); //Get the canvas going
}
//The "this" keyword refers to the current object
var myGameArea = {
    canvas : document.createElement("canvas"),//Canvas created
    start : function() {
        this.canvas.width = 1200;//The width of the canvas
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");//methods and properties for drawing
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);//The first childnode of the body element
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);//Run the update game area every 20th millisecond or 50 times per second. This is like fps in a game or movie (50fps)  
        
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
   
   window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
	 clear : function() {//This will draw the component or basketball
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
  
	this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;  
  
    this.x = x;
    this.y = y;  
	
    this.update = function() {
        ctx = myGameArea.context;
		
		 
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        
		}
		  
    }
    this.newPos = function() {
	  

        this.x += this.speedX;
        this.y += this.speedY;   


    }

this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function updateGameArea() {

if(ball.crashWith(goal)){
  myGameArea.stop();
  alert("BUCKETS!! YOU WIN! You're awesome!!");
}
      var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < obstacles.length; i += 1) {
        if (ball.crashWith(obstacles[i])) {
            myGameArea.stop();
			alert("YOU LOSE, Who got next? Reload the page to try again!");
            return;
        } 
    }
    myGameArea.clear();//Without a clear, you'll see the ball's movement from the last frame 
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        obstacles.push(new component(10, height, "black", x, 0));
        obstacles.push(new component(10, x - height - gap, "black", x, height + gap));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }

    
 
	  ball.speedX = 0;
      ball.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {ball.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {ball.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {ball.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {ball.speedY = 1; }

	ball.newPos();
    ball.update();//draw the component or basketball 50 times per second
    goal.update();
	shot.update();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
