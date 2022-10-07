
let Vector = function(x,y){

    this.Two_PI = 2*Math.PI;
    this._x=x;
    this._y=y;
  }

Vector.prototype.getX= function(){
  return this._x;
}


Vector.prototype.getY= function(){
  return this._y;
}

Vector.prototype.setX = function(x){
  this._x=x;
}

Vector.prototype.setY =function(y){
  this._y=y;
}

Vector.prototype.getMag = function(){
  return Math.sqrt(this._x*this._x + this._y*this._y); 
}

Vector.prototype.getDir = function(){
  var a = Number(Math.atan2(this._y,this._x));
   return a;
}

Vector.prototype.setMag=function(mag){
  var dir = this.getDir();
  this._x = mag * Math.cos(dir);
  this._y = mag * Math.sin(dir);
}

Vector.prototype.setDir= function(dir){
  var mag = this.getMag();
  this._x = mag * Math.cos(dir);
  this._y = mag * Math.sin(dir);
}

Vector.prototype.scale= function(s){
 this._x*=s;
 this._y*=s;
}

Vector.prototype.addTo= function(vector){
  this._x+=vector._x;
  this._y+=vector._y;
}

Vector.prototype.subtractFrom = function(vector){
  this._x-=vector._x;
  this._y-=vector._y;
}

Vector.prototype.dirTo = function(vector){
  return Math.atan2(vector._y - this._y, vector._x - this._x).toFixed(1);
}

Vector.prototype.diffMag = function(vector){
  var dy = this._y - vector._y;
  var dx = this._x - vector._x;
return Math.sqrt(dy*dy + dx*dx).toFixed(0);
}

Vector.prototype.diffMagSquared = function(vector){
  var dy = this._y - vector._y;
  var dx = this._x - vector._x;
return (dy*dy + dx*dx).toFixed(1);
}

Vector.prototype.angleBetween = function(vector){
var umag = this.getMag();
var vmag = vector.getMag();
var udotv = this.getX()* vector.getX() +this.getY() * vector.getY();
var theta = Math.acos(udotv / (umag * vmag)).toFixed(1);                    
return theta;
}

Vector.prototype.angleBetween2 =  function(vector){
  var theta = vector.getDir() - this.getDir();
  return theta;
}

Vector.prototype.VectorSum = function(vector){
  var sum_vector = new Vector(1,0);
  sum_vector._x = this._x + vector._x;
  sum_vector._y = this._y + vector._y;
  return sum_vector; 
}

Vector.prototype.VectorDiff = function(vector){
  var sum_vector = new Vector(1,0);
  sum_vector._x = vector._x - this._x;
  sum_vector._y = vector._y - this._y;
  return sum_vector; 
}


Vector.prototype.LineVector = function(c,x,y,scale,color,thickness){
  var unit_vector = new Vector(1,0);
  unit_vector.setDir(this.getDir());
  unit_vector.setX(scale*this.getX());
  unit_vector.setY(scale*this.getY());
  let head_x=x+unit_vector.getX()
  let head_y=y+unit_vector.getY()
  c.beginPath();
  c.moveTo(x,y);
  c.lineTo(head_x,head_y);
  c.strokeStyle = color;
  c.lineWidth=thickness;
  c.stroke();
  c.closePath();
  c.strokeStyle = "black";
  c.lineWidth=1
}

Vector.prototype.arrowVector = function(c,x,y,scale,color,thickness){
  if(this.getMag() >0){
  this.LineVector(c,x,y,scale,color,thickness)
  let head_x = x+ (this.getX() * scale)
  let head_y = y+ (this.getY() * scale)
  let top_vector = new Vector(7,0)
  top_vector.setDir(this.getDir() - 2.35) 
  let bottom_vector = new Vector(7,0)
  bottom_vector.setDir(this.getDir() + 2.35)    
  top_vector.LineVector(c,head_x,head_y,1,color,thickness)
  bottom_vector.LineVector(c,head_x,head_y,1,color,thickness)
  }
}



