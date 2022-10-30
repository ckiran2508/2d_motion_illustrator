var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')


function run(){

var entities =[]
var isMouseDown 
var newParticle=null
var floatingVector = Vector.create(0,0)

canvas.addEventListener('mousedown',function(event){

    isMouseDown=true
    const rect = canvas.getBoundingClientRect()
    var position =  Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
    newParticle  = Particle.create(position.getX(),position.getY(),5,'lightgray',100)
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
     newParticle.charge = 1
     entities.push(newParticle)
     newParticle = null
     floatingVector = null
   })


var magneticField = {
    x1: 400,
    y1: 0,
    x2: 700,
    y2: canvas.height,
    strength:0.01
}

function init(){
  
   
    for(let i = 0; i < 10 ; i++){
      var object = Particle.create(50,20+ (i*20),5,'lightgray',1)
      object.charge = 1
      object.velocity = Vector.create(randomNumberRange(1,5), 0)
      entities.push(object)
    }  
}

function drawMagneticField(){
    c.beginPath()
    c.moveTo(magneticField.x1,0)
    c.lineTo(magneticField.x1,canvas.height)
    c.stroke();
    for(let i = 50 ;  i < canvas.height ; i+=50){
    for(let j = magneticField.x1 + 50 ; j < 700 ; j+=50){
         c.fillText('x',j,i)
    }
}
    c.beginPath()
    c.moveTo(magneticField.x2,0)
    c.lineTo(magneticField.x2,canvas.height)
    c.stroke();
}


function updateObjects(){
    for(let i = 0 ; i < entities.length ; i++){
        entities[i].motionInAMagneticField(magneticField)
        entities[i].updatePosition()
    }
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
    drawMagneticField()
    drawObjects()
    
    requestAnimationFrame(animate)
}

init()
animate()

}

run()