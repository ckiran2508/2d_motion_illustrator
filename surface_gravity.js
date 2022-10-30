var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

var entities =[]
var acceleration_due_to_gravity = Vector.create(0,0.2)
var isMouseDown 
var newParticle=null
var floatingVector

canvas.addEventListener('mousedown',function(event){

    isMouseDown=true
    const rect = canvas.getBoundingClientRect()
    var position =  Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
    newParticle  = Particle.create(position.getX(),position.getY(),30,'lightgray',100)
    floatingVector = position
  })


  canvas.addEventListener('mousemove',function(event){

   if(isMouseDown){
    const rect = canvas.getBoundingClientRect()
    floatingVector = Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
   }
  })

  canvas.addEventListener('mouseup',function(event){

     isMouseDown = false
     const rect = canvas.getBoundingClientRect()
     var v = Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
     newParticle.velocity = Vector.VectorDiff(v,newParticle.position)
     newParticle.velocity.setMag(newParticle.velocity.getMag() / 10)
     entities.push(newParticle)
     newParticle = null
     floatingVector = null
   })


function init(){

    for(let i = 0; i < 1 ; i++){
      var object = Particle.create(canvas.width/2,100,30,'lightgray',100)
      object.velocity = Vector.create(0, Math.random() *2)
      entities.push(object)
    }
    
}

function updateObjects(){
    for(let i = 0 ; i < entities.length ; i++){
        var object = entities[i]
    if(checkSurface(object)) {
        object.velocity.setDir(-object.velocity.getDir())
        object.velocity.setY(object.velocity.getY() * 0.9)
    }else{
       object.velocity.addTo(acceleration_due_to_gravity)
    }
    if(checkLaterals(object)) object.velocity.setX(-object.velocity.getX() * 0.9)
    object.position.addTo(entities[i].velocity)
 }
}


function checkSurface(object){
  return (object.radius + object.position.getY() + object.velocity.getY() > canvas.height )
        
}

function checkLaterals(object){
    return (object.position.getX() + object.velocity.getX() + object.radius > canvas.width ||
     object.position.getX() - object.radius < 0)
}

function drawObjects(){
    for(let i = 0 ; i < entities.length ; i++){
        draw(c,entities[i])
    }   
}

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    if(newParticle !== null && floatingVector !== null){
        draw(c,newParticle)
        c.beginPath()
        c.moveTo(newParticle.position.getX(),newParticle.position.getY())
        c.lineTo(floatingVector.getX(),floatingVector.getY())
        c.stroke()
    }
    updateObjects()
    drawObjects()
    requestAnimationFrame(animate)
}
init()
animate()
}
run()