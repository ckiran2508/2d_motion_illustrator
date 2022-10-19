function draw(c,particle){
    c.beginPath()
    c.arc(particle.position.getX(),particle.position.getY(),particle.radius,0,2 * Math.PI)
    c.fillStyle = particle.colour
    c.fill()
    c.stroke()
    c.closePath()
}

function randomNumberRange(min, max) {
    return min + Math.random() * (max - min);
  }