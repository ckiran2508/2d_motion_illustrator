
const Vector = {
    _x: 0,
    _y: 0,

   create: function(x,y){
      var obj = Object.create(this)
      obj._x = x
      obj._y = y
      return obj
   },

   getX: function(){
     return this._x
   },

   getY: function(){
    return this._y
   },

   setX: function(x){
    this._x = x
   },

   setY: function(y){
    this._y = y
   },

   getMag: function(){
     return Math.sqrt(this._x*this._x + this._y*this._y)
   },

   getDir: function(){
    var a = Number(Math.atan2(this._y,this._x));
    return a;
   },

   setMag: function(mag){
    var dir = this.getDir();
    this._x = mag * Math.cos(dir)
    this._y = mag * Math.sin(dir)
  },

   setDir: function(dir){
    var mag = this.getMag();
    this._x = mag * Math.cos(dir);
    this._y = mag * Math.sin(dir);
  },

   scale: function(s){
     this._x*=s;
     this._y*=s;
   },

   addTo: function(vector){
    this._x+=vector._x;
    this._y+=vector._y;
  },

  subtractFrom: function(vector){
    this._x-=vector._x;
    this._y-=vector._y;
  },

  dirTo: function(vector){
    return Math.atan2(vector._y - this._y, vector._x - this._x)
  },

  diffMag : function(vector){
    var dy = this._y - vector._y;
    var dx = this._x - vector._x;
    return Math.sqrt(dy*dy + dx*dx)
  },

  diffMagSquared : function(vector){
    var dy = this._y - vector._y;
    var dx = this._x - vector._x;
    return (dy*dy + dx*dx).toFixed(1);
  },

  angleBetween : function(vector){
    var umag = this.getMag();
    var vmag = vector.getMag();
    var udotv = this.getX()* vector.getX() + this.getY() * vector.getY();
    var theta = Math.acos(udotv / (umag * vmag))                    
    return theta;
    },

  angleBetween2: function(vector){
      var theta = vector.getDir() - this.getDir();
      return theta;
    },

  VectorSum: function(v1,v2){
      return Vector.create(v1._x + v2._x,v1._y + v2._y)
    },

  VectorDiff: function(v1,v2){
     return Vector.create(v2._x - v1._x,v2._y - v1._y);
    },
  
  scaledVector: function(scale){
      return Vector.create(this._x*scale,this._y*scale)
    }, 

  multiply: function(s){
    return Vector.create(this._x*s,this._y*s)
  },  
  
  divide: function(s){
    return Vector.create(this._x/s,this._y/s)
  }, 
    
  unitVector: function(){
      var unit_vector = Vector.create(0,0)
      unit_vector.setMag(1)
      unit_vector.setDir(this.getDir())
      return unit_vector
    },

 normalVector: function(){
      return Vector.create(-this._y,this._x)
    },
 
 dotProduct: function(vector){
      return this._x * vector._x + this._y * vector._y
    },

   
    
}



