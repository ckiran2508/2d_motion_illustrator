var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')


function run(){

var entities =[]
var center
var isMouseDown 
var newParticle=null
var floatingVector

canvas.addEventListener('mousedown',function(event){

    isMouseDown=true
    const rect = canvas.getBoundingClientRect()
    var position =  Vector.create(event.clientX - rect.left.toFixed(0),event.clientY - rect.top.toFixed(0))
    newParticle  = Particle.create(position.getX(),position.getY(),5,'lightgray',100)
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

    for(let i = 0; i < 10 ; i++){
      var object = Particle.create(100 + (i*10),100 + (i*10),5,'lightgray',100)
      object.velocity = Vector.create(0, 2)
      entities.push(object)
    }
   
    center = Particle.create(canvas.width/2,canvas.height/2,30,'lightgray',2000)

    
}

function updateObjects(){
    for(let i = 0 ; i < entities.length ; i++){
        if(entities[i].position.diffMag(center.position) < entities[i].radius + center.radius){
            entities.pop()
        }else{
        entities[i].gravitateTo(center)
        entities[i].updatePosition()
        }
    }
}

function drawObjects(){
    for(let i = 0 ; i < entities.length ; i++){
        draw(c,entities[i])
    }   
    draw(c,center)
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