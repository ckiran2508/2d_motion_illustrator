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
    newParticle  = Particle.create(position.getX(),position.getY(),30,'lightgray',100)
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
      var randomMass = randomNumberRange(15,30)
      var object = Particle.create(70 * (i+1),100,randomMass,'lightgray',randomMass)
      object.velocity = Vector.create(randomNumberRange(-4,4), randomNumberRange(-4,4))
      entities.push(object)
    }
}

function updateentities(){
    for (let i = 0; i < entities.length; i++) {
        const object = entities[i];
        const rem = entities.slice(i + 1);
        for (let o of rem) {
          o.resolveIfCollision(object);
        }
      }
     
      for (let j = 0; j < entities.length; j++) {
        entities[j].handleBoundaries(canvas.width,canvas.height)
        entities[j].updatePosition()
      }
 }



function checkTopAndBottom(object){
  return (object.radius + object.position.getY() + object.velocity.getY() > canvas.height ) 
         || ( object.position.getY() - object.radius  < 0 ) 
        
}

function checkLaterals(object){
    return (object.position.getX() + object.velocity.getX() + object.radius > canvas.width ||
     object.position.getX() - object.radius < 0)
}

function drawentities(){
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
    updateentities()
    drawentities()
    requestAnimationFrame(animate)
}
init()
animate()
}
run()