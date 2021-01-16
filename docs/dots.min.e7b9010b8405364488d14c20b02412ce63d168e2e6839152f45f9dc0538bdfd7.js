var canvas=document.getElementById("canvas"),ctx=canvas.getContext('2d');canvas.width=window.innerWidth;canvas.height=window.innerHeight-150;var mobile=window.innerWidth<1000?true:false;var stars=[],FPS=40,x=mobile?10:40,affinity=150,mouse={x:0,y:0};var stop=false;var fpsInterval,now,then,elapsed;for(var i=0;i<x;i++){stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*1+1,vx:Math.floor(Math.random()*50)-25,vy:Math.floor(Math.random()*50)-25});}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.globalCompositeOperation="lighter";for(var i=0,x=stars.length;i<x;i++){var s=stars[i];ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s.x,s.y,s.radius,0,2*Math.PI);ctx.fill();ctx.fillStyle='black';ctx.stroke();}
ctx.beginPath();for(var i=0,x=stars.length;i<x;i++){var starI=stars[i];ctx.moveTo(starI.x,starI.y);if(distance(mouse,starI)<affinity)ctx.lineTo(mouse.x,mouse.y);for(var j=0,x=stars.length;j<x;j++){var starII=stars[j];if(distance(starI,starII)<affinity){ctx.lineTo(starII.x,starII.y);}}}
ctx.lineWidth=0.05;ctx.strokeStyle='white';ctx.stroke();}
function distance(point1,point2){var xs=0;var ys=0;xs=point2.x-point1.x;xs=xs*xs;ys=point2.y-point1.y;ys=ys*ys;return Math.sqrt(xs+ys);}
function update(){for(var i=0,x=stars.length;i<x;i++){var s=stars[i];s.x+=s.vx/FPS;s.y+=s.vy/FPS;if(s.x<0||s.x>canvas.width)s.vx=-s.vx;if(s.y<0||s.y>canvas.height)s.vy=-s.vy;}}
var processMouse=function(e){mouse.x=e.clientX;mouse.y=e.clientY;}
canvas.addEventListener('mousemove',processMouse);var stopAnimation=function(){stop=true;canvas.removeEventListener('mousemove',processMouse);}
function animate(){if(stop){return;}
now=Date.now();elapsed=now-then;if(elapsed>fpsInterval){then=now-(elapsed%fpsInterval);draw();update();}
requestAnimationFrame(animate);}
function startAnimating(fps){fpsInterval=1000/fps;then=Date.now();animate();setTimeout(stopAnimation,30000);}
startAnimating(30);