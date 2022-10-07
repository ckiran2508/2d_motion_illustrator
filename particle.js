let Particle = function(x,y,radius,colour,mass){

    this.position = new Vector(x,y)
    this.velocity = null
    this.acceleration = null
    this.radius = radius
    this.colour = colour
    this.mass = mass
}

Particle.prototype.gravitateTo = function(particle){
   let mag = this.mass * particle.mass / this.position.diffMagSquared(particle.position)
   let dir = this.position.dirTo(particle.position)
   let acceleration = new Vector(0,0)
   acceleration.setMag(mag)
   acceleration.setDir(dir)
   this.acceleration.addTo(acceleration)
   this.velocity.addTo(this.acceleration);
   this.position.addTo(this.velocity)
}
