const Particle ={

    position : null,
    velocity : null,
    acceleration : null,
    radius : 0,
    colour : null,
    mass : 0,
    charge:0,
    theta:0,
    omega:0,
    alpha:0,

    create: function(x,y,radius,colour,mass){
        var obj = Object.create(this)
        obj.position = Vector.create(x,y)
        obj.velocity = Vector.create(0,0)
        obj.acceleration = Vector.create(0,0)
        obj.radius = radius
        obj.colour = colour
        obj.mass   = mass
        obj.theta  = 0
        obj.omega  = 0
        obj.alpha  = 0
        return obj
    },

    updatePosition: function(){
        this.position.addTo(this.velocity)
    },

    gravitateTo : function(particle){
        var acceleration_due_to_gravity = particle.mass / this.position.diffMagSquared(particle.position)
        var direction_due_to_gravity = this.position.dirTo(particle.position)
        this.acceleration.setMag(acceleration_due_to_gravity)
        this.acceleration.setDir(direction_due_to_gravity)
        this.velocity.addTo(this.acceleration)
     },

     coulombRepulsiveFrom: function(particle){
        var acceleration_due_to_charge = particle.mass / this.position.diffMagSquared(particle.position)
        var direction_due_to_charge = -this.position.dirTo(particle.position)
        this.acceleration.setMag(acceleration_due_to_charge)
        this.acceleration.setDir(direction_due_to_charge)
        this.velocity.addTo(this.acceleration)
     },

     resolveIfCollision: function(particle){
        a = this
        b = particle
        var aTob  = Vector.VectorDiff(a.position,b.position)
        if(aTob.getMag() !== 0 && aTob.getMag() <= (a.radius + b.radius)){ 
                  const unitNormal = aTob.divide(aTob.getMag())
                  const unitTangent = unitNormal.normalVector()    
                  const a_u_l = a.velocity.dotProduct(unitNormal)
                  const b_u_l = b.velocity.dotProduct(unitNormal)
                  const a_u_t = a.velocity.dotProduct(unitTangent)
                  const b_u_t = b.velocity.dotProduct(unitTangent)
                  const a_v_l = (a_u_l * (a.radius - b.radius) +
                    2 * b.radius*b_u_l) / (a.radius + b.radius)
                  const b_v_l = (b_u_l * (b.radius - a.radius) + 
                    2 * a.radius * a_u_l) / (a.radius + b.radius)
                    a.velocity = Vector.VectorSum(unitNormal.multiply(a_v_l), unitTangent.multiply(a_u_t))
                    b.velocity = Vector.VectorSum(unitNormal.multiply(b_v_l), unitTangent.multiply(b_u_t))
                }
              },

      moveAround: function(hinge){
        var directionVector = Vector.VectorDiff(this.position,hinge.position)
        var unitDirectionVector = directionVector.divide(directionVector.getMag())
        var tangentialVector = unitDirectionVector.normalVector()
        var tangentialVelocityVector = tangentialVector.multiply(tangentialVector.dotProduct(this.velocity))
        var centripetalAcceleration  = tangentialVelocityVector.getMag() * tangentialVelocityVector.getMag() / directionVector.getMag() 
        var centripetalAccelerationVector = unitDirectionVector.multiply(centripetalAcceleration)
        this.velocity = Vector.VectorSum(centripetalAccelerationVector,tangentialVelocityVector)
        this.velocity.addTo(this.acceleration)
        var tempPosition = Vector.VectorSum(directionVector,this.velocity)
        tempPosition.setMag(directionVector.getMag())
        this.position= Vector.VectorDiff(tempPosition,hinge.position)
      },

      motionInAMagneticField: function(magneticField){
        if(this.position.getX() >  magneticField.x1  && this.position.getY() > magneticField.y1 
        && this.position.getX() <  magneticField.x2  && this.position.getY() < magneticField.y2){
        var forceDueToMagneticField = magneticField.strength * this.charge * this.velocity.getMag()
        var radialVector = Vector.create(0,0)
        radialVector.setMag(1)
        radialVector.setDir(this.velocity.getDir() + Math.PI/2)
        var centripetalAccelerationVector = radialVector.multiply(forceDueToMagneticField)
        this.velocity.addTo(centripetalAccelerationVector)
        }
      },


   handleBoundaries: function(width, height) {
     if (this.position._x - this.radius <= 0 || this.position._x + this.radius >= width) {
            this.velocity._x = -this.velocity._x
     } else if (this.position._y - this.radius <= 0 || this.position._y + this.radius >= height) {
            this.velocity._y = -this.velocity._y
     }
    }
 }

