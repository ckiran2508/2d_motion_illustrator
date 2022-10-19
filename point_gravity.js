var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')


function run(){

var objectArray =[]
var center

function init(){

    for(let i = 0; i < 10 ; i++){
      var object = Particle.create(100 + (i*10),100 + (i*10),5,'lightgray',100)
      object.velocity = Vector.create(0, 2)
      objectArray.push(object)
    }
   
    center = Particle.create(canvas.width/2,canvas.height/2,30,'lightgray',2000)
    
}

function updateObjects(){
    for(let i = 0 ; i < objectArray.length ; i++){
        objectArray[i].gravitateTo(center)
        objectArray[i].updatePosition()
    }
}

function drawObjects(){
    for(let i = 0 ; i < objectArray.length ; i++){
        draw(c,objectArray[i])
    }   
    draw(c,center)
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