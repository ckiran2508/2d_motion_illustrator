var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

var swings = []
var acceleration_due_to_gravity = Vector.create(0,0.2);

function init(){

    for(let i = 0; i < 10 ; i++){ 
      var swing = {
          weight : Particle.create(250 + (i*42), 300, 20,'lightgray',100),
          hinge :  Particle.create(250 + (i*42), 150, 5, 'black')
      }
      swing.weight.acceleration = Vector.create(0,-1)
      swings.push(swing) 
}
   var dirVec1 = Vector.VectorDiff(swings[0].hinge.position,swings[0].weight.position)
   dirVec1.setDir(5*Math.PI/6)
   swings[0].weight.position = Vector.VectorSum(swings[0].hinge.position,dirVec1)
}

function updateObjects(){
      
    for(let i =0 ; i < swings.length ; i++){
         var swing = swings[i]
         swing.weight.moveAround(swing.hinge)
    }

    for (let i = 0; i < swings.length; i++) {
        const swing = swings[i];
        const rem = swings.slice(i + 1);
        for (let s of rem) {
          s.weight.resolveIfCollision(swing.weight);
        }
      }
    
 }

function drawObjects(){
    for(let i = 0 ; i < swings.length ; i++){
        draw(c,swings[i].weight)
        draw(c,swings[i].hinge)
        c.beginPath()
        c.moveTo(swings[i].hinge.position._x,swings[i].hinge.position._y)
        c.lineTo(swings[i].weight.position._x,swings[i].weight.position._y)
        c.stroke();
    }   
}

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    updateObjects()
    drawObjects()
    requestAnimationFrame(animate)
}
init()
animate()
}
run()