var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

function run(){

    var center = Vector.create(canvas.width/2,canvas.height/2)
    var startRect = Vector.create(center.getX()-200,center.getY()-200)
    var midV = Vector.create(center.getX(),center.getY()-200)
    var maxDistance = startRect.diffMag(center)
    console.log('max distance: '+maxDistance)
    console.log('middistance: '+midV.diffMag(center))

    function animate(){
        c.clearRect(0,0,canvas.width,canvas.height)
             for(let i = 0;  i <= canvas.width; i+=5){
                for(let j = 0;  j <= canvas.height; j+=5){
                    var v = Vector.create(i,j)
                    d = v.diffMag(center)
                    var alpha = 50/(d)         
                    c.fillStyle = 'rgba(51, 153, 255,'+alpha+')'
                    c.fillRect(i, j, 5,5)
                }
             }
             requestAnimationFrame(animate)
            }

//init()
animate()
}
run()
