var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')


function run(){

var objectArray =[]
var center


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
      objectArray.push(object)
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
    for(let i = 0 ; i < objectArray.length ; i++){
        objectArray[i].motionInAMagneticField(magneticField)
       // objectArray[i].handleBoundaries(canvas.width,canvas.height)
        objectArray[i].updatePosition()
    }
}

function drawObjects(){
    for(let i = 0 ; i < objectArray.length ; i++){
        draw(c,objectArray[i])
    }   
}

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    updateObjects()
    drawMagneticField()
    drawObjects()
   // c.drawImage(image,400,0,300,canvas.height)
    
    requestAnimationFrame(animate)
}

init()
animate()

}

run()