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
        color:'#E6AC27'
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
        color: '#222',
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
        color: '#2A5D77',
        effect: 'win',
        stay: true
    });

