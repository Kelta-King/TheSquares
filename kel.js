(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1000,
    height = 400,
    player = {
        x: width / 2,
        y: 200,
        width: 25,
        height: 25,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        color:'#00ffc5'
    },
    keys = [],
    friction = 0.8,
    gravity = 0.4,
    boxes = [],
    powerup = [];  

powerup.push({
    x: 810,
    y: 250,
    width: 20,
    height: 20,
    color: '#BF4D28',
    effect: 'shrink'
});

powerup.push({
    x: 400,
    y: 150,
    width: 20,
    height: 20,
    color: '#BF4D28',
    effect: 'gravity'
});

powerup.push({
    x: -15,
    y: 88,
    width: 20,
    height: 20,
    color: '#ffffff',
    effect: 'tele',
  	rotate: 20,
    px: 20,//where they get teleported
    py: 370,
    stay: true
});

powerup.push({
    x: 60,
    y: 365,
    width: 20,
    height: 20,
    color: '#35e706',
    effect: 'win',
    stay: true
});

// dimensions
boxes.push({//box on left
    x: 0,
    y: height/4+10,
    width: 10,
    height: height,
    color: 'green'
});
boxes.push({//box on left
    x: 0,
    y: 0,
    width: 10,
    height: height/4-15,
    color: 'green'
});
boxes.push({//box for the ground
    x: 0,
    y: height - 10,
    width: width,
    height: 50,
    color: 'orange'
});
boxes.push({//box on right
    x: width - 10,
    y: 0,
    width: 50,
    height: height,
    color: 'yellow'
});
boxes.push({
    x: 290,
    y: 200,
    width: 260,
    height: 10,
    color: 'blue'
});
boxes.push({
    x: 590,
    y: 200,
    width: 80,
    height: 10,
    color: 'blue'
});
boxes.push({
    x: 120,
    y: 250,
    width: 150,
    height: 10,
    color: 'red'
});
boxes.push({
    x: 220,
    y: 300,
    width: 80,
    height: 10,
    color: 'black'
});
boxes.push({
    x: 340,
    y: 350,
    width: 90,
    height: 10,
    color: '#655643'
});
boxes.push({
    x: 740,
    y: 300,
    width: 160,
    height: 10,
    color: '#655643'
});
boxes.push({
    x: 0,
    y: 350,
    width: 90,
    height: 10,
    color: '#655643'
});
boxes.push({
    x: 90,
    y: 350,
    width: 10,
    height: 50,
    color: '#655643'
});

canvas.width = width;
canvas.height = height;

document.body.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
});


window.addEventListener("load", function(){
    update();
});

function update() {
	
	// check keys
    if(keys[38] || keys[32] || keys[87]){
        // up arrow or space
        if(!player.jumping && player.grounded){
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2.5;//how high to jump
		}
    }
    
    if(keys[39] || keys[68]){
        // right arrow
        if(player.velX < player.speed){
            player.velX++;
        }
    }
    if(keys[37] || keys[65]){
        // left arrow
        if(player.velX > -player.speed){
            player.velX--;
        }
    }
	
	player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    
    player.grounded = false;
	for(var i = 0;i < boxes.length; i++){
		
		//print boxes
        ctx.fillStyle = boxes[i].color;
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if(dir === "l" || dir === "r"){
            player.velX = 0;
            player.jumping = false;
        } 
		else if(dir === "b"){
            player.grounded = true;
            player.jumping = false;
        } 
		else if(dir === "t"){
            player.velY *= -1;
        }

    }
		
	if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
  
    ctx.fill();//Drawing charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
	player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    
    player.grounded = false;
	
	
	
	if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
  
    ctx.fill();//Draw charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
	for(var j = 0;j < powerup.length; j++){
		
		ctx.save();
		var cx = powerup[j].x + 0.5 * powerup[j].width;
		var cy = powerup[j].y + 0.5 * powerup[j].height; 
		ctx.translate(cx, cy);  
		ctx.rotate( (Math.PI / 180) * 45);
		
		if(powerup[j].effect  === 'tele'){
			
			ctx.rotate( (Math.PI / 180) * powerup[j].rotate);
			powerup[j].rotate = (Math.PI / 180) * powerup[j].rotate;
			
		}
		
		ctx.translate(-cx, -cy);
		ctx.fillStyle = powerup[j].color;
		ctx.fillRect(powerup[j].x, powerup[j].y, powerup[j].width, powerup[j].height);
		ctx.restore();
		
		//powerup collision
		if(colCheck(player, powerup[j])!==null){
			
			if(powerup[j].effect==='gravity'){
				gravity= 0.4;//decrease gravity
				player.speed = 4;
				player.color = 'white';
			}
			else if(powerup[j].effect==='shrink'){
				player.width= 10;
				player.height= 10;
				player.speed = 5;
			}
			else if(powerup[j].effect==='tele'){
				player.x=powerup[j].px;
				player.y=powerup[j].py;
			}
			else if(powerup[j].effect==='win'){
				var r = confirm("You win! Play again?");
				if(r == false){
				    player.x=200;
				    player.y=200;
				} 
				else{
					window.location.href = window.location.href;
				}
			}
			//make power up go away
			if(powerup[j].stay!==true){
				powerup[j].width=0;
			}
		}
		
	}
	
}