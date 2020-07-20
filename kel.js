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

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});