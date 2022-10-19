var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

var objectArray =[]
var acceleration_due_to_gravity = Vector.create(0,0.2);

function init(){

    for(let i = 0; i < 1 ; i++){
      var object = Particle.create(canvas.width/2,100,30,'lightgray',100)
      object.velocity = Vector.create(0, Math.random() *2)
      objectArray.push(object)
    }
    
}

function updateObjects(){
    for(let i = 0 ; i < objectArray.length ; i++){
        var object = objectArray[i]
    if(checkSurface(object)) {
        object.velocity.setDir(-object.velocity.getDir())
        object.velocity.setY(object.velocity.getY() * 0.9)
    }else{
       object.velocity.addTo(acceleration_due_to_gravity)
    }
    if(checkLaterals(object)) object.velocity.setX(-object.velocity.getX() * 0.9)
    object.position.addTo(objectArray[i].velocity)
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
    for(let i = 0 ; i < objectArray.length ; i++){
        draw(c,objectArray[i])
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