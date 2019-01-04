// Convenience Declarations For Dependencies.
// 'Core' Is Configured In Libraries Section.
// Some of these may not be used by this example.
var Conversions = Core.Conversions;
var Debug = Core.Debug;
var Path2D = Core.Path2D;
var Point2D = Core.Point2D;
var Point3D = Core.Point3D;
var Matrix2D = Core.Matrix2D;
var Matrix3D = Core.Matrix3D;
var Mesh3D = Core.Mesh3D;
var Plugin = Core.Plugin;
var Tess = Core.Tess;
var Sketch2D = Core.Sketch2D;
var Solid = Core.Solid;
var Vector2D = Core.Vector2D;
var Vector3D = Core.Vector3D;

// Template Code:
params = [
    { "id": "numberOfPoints", "displayName": "# of points", "type": "int", "rangeMin": 3, "rangeMax": 30, "default": 5 },
    { "id": "radius", "displayName": "Radius", "type": "length", "rangeMin": 1, "rangeMax": 50, "default": 20 },
    { "id": "innerRadius", "displayName": "Inner radius (%)", "type": "float", "rangeMin": 0, "rangeMax": 1, "default": 0.5 },
    { "id": "centerHeight", "displayName": "Center height", "type": "length", "rangeMin": 1, "rangeMax": 30, "default": 10 },
   { "id": "centerDeep", "displayName": "Center deep", "type": "length", "rangeMin": 0, "rangeMax": -30, "default": -10 }
];

function process(params) {
    var h = params["centerHeight"] || 10;
    var z = params["centerDeep"] || -10;
    var r = params["radius"] || 20;
    var r2 = r * params["innerRadius"] || 0.5;
    var numPoints = params['numberOfPoints'] || 5;
    var ndivs = Math.max(3, numPoints) * 2;

    // Build star polygon.
    var deep = [0,0,z];
    var top = [0,0,h];
    var bot = [0,0,0];
    var star = [];
    for (var i = 0; i <= ndivs; i++) {
        var a = i/ndivs * Math.PI*2;
        var ri = (i % 2 == 1) ? r2 : r;
        var x = Math.sin(a) * ri;
        var y = Math.cos(a) * ri;
        star.push([x, y, 0]);
    }

    // Triangulate polygon.
    var mesh = new Mesh3D();
    for (var i = 0; i < ndivs; i++) {
        
       mesh.triangle(deep, star[i+1], star[i]);
       mesh.triangle(top, star[i+1], star[i]);
       mesh.triangle(bot, star[i], star[i+1]);
      
    }
    return Solid.make(mesh);
}