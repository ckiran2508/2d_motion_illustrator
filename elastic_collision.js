var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

var objects =[]



function init(){
    for(let i = 0; i < 10 ; i++){
      var randomMass = randomNumberRange(15,30)
      var object = Particle.create(70 * (i+1),100,randomMass,'lightgray',randomMass)
      object.velocity = Vector.create(randomNumberRange(-4,4), randomNumberRange(-4,4))
      objects.push(object)
    }
}

function updateObjects(){
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const rem = objects.slice(i + 1);
        for (let o of rem) {
          o.resolveIfCollision(object);
        }
      }
     
      for (let j = 0; j < objects.length; j++) {
        objects[j].handleBoundaries(canvas.width,canvas.height)
        objects[j].updatePosition()
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

function drawObjects(){
    for(let i = 0 ; i < objects.length ; i++){
        draw(c,objects[i])
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