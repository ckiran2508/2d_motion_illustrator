var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

var swings = []
var acceleration_due_to_gravity = Vector.create(0,0.2);
var isMouseDown = false
var line


canvas.addEventListener('mousedown',function(event){

    isMouseDown=true
    const rect = canvas.getBoundingClientRect()
    var v = Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))

    for(let i = 0 ; i < swings.length ; i++){
        if(swings[i].weight.position.diffMag(v) < swings[i].weight.radius){
            swings[i].latched = true
            break
        }
    }
  })
  
  
  canvas.addEventListener('mousemove',function(event){
        var latchedSwing
        const rect = canvas.getBoundingClientRect();
        if(isMouseDown){
         for(let i = 0 ; i < swings.length; i++){
            if(swings[i].latched !== undefined && swings[i].latched == true){
                latchedSwing = swings[i]
                break
            }
         }
        if(latchedSwing !== undefined){
              console.log(latchedSwing)
               var mousePositionVector = Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
               var tempPosition = Vector.VectorDiff(latchedSwing.hinge.position,mousePositionVector)
               tempPosition.setMag(latchedSwing.hinge.position.diffMag(latchedSwing.weight.position))
               latchedSwing.weight.position = Vector.VectorSum(latchedSwing.hinge.position,tempPosition)
         }
        }
  })
  
  canvas.addEventListener('mouseup',function(event){
    isMouseDown = false
    for(let i = 0 ; i < swings.length; i++){
        if(swings[i].latched !== undefined && swings[i].latched == true){
            latchedSwing = swings[i]
            latchedSwing.latched = false
            break
        }
     }

  })


function init(){

    for(let i = 0; i < 10 ; i++){ 
      var swing = {
          weight : Particle.create(250 + (i*42), 300, 20,'lightgray',100),
          hinge  :  Particle.create(250 + (i*42), 150, 5, 'black'),
          latched: false
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