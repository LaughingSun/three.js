import { LineSegments } from '../../objects/LineSegments';
import { VertexColors } from '../../constants';
import { LineBasicMaterial } from '../../materials/LineBasicMaterial';
import { Float32BufferAttribute } from '../../core/BufferAttribute';
import { BufferGeometry } from '../../core/BufferGeometry';
import { Color } from '../../math/Color';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function GridHelper( size, divisions, color1, color2 ) {
	var geometry = new THREE.Geometry()
		, vertices = geometry.vertices
		, center, step, color, i
		;
	if ( size instanceof Object ) {
		i = size;
		size = i.size || 10;
		'step' in i && (step = i.step);
		'divisions' in i && (divisions = i.divisions);
		'color' in i && (color2 = i.color);
		color1 = 'center' in i ? i.center : color2;
	} else {
		size = size || 10;
	}
	
	step ? (divisions = size * 2 / step) : (step = size * 2 / (divisions || (divisions = 10)));
	(color1 || (color1 = 0x444444)) instanceof Color || (color1 = new Color(color1));
	(color2 || (color2 = 0x888888)) instanceof Color || (color2 = new Color(color2));
	center = step * (divisions / 2 | 0);
	vertices = [], colors = [];

	for ( i = -size; i <= size; i += step ) {
		if ( i === center ) continue;
		geometry.vertices.push( new THREE.Vector3( -size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(  size, 0, i ) );

		geometry.vertices.push( new THREE.Vector3( i, 0, -size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,  size ) );
	}
	LineSegments.call( this, geometry, new LineBasicMaterial( { color: color2 } ) );
	
	geometry = new THREE.Geometry();
	vertices = geometry.vertices;
	geometry.vertices.push( new THREE.Vector3( -size, 0, center ) );
	geometry.vertices.push( new THREE.Vector3(  size, 0, center ) );

	geometry.vertices.push( new THREE.Vector3( center, 0, -size ) );
	geometry.vertices.push( new THREE.Vector3( center, 0,  size ) );
	LineSegments.call( this, geometry, new LineBasicMaterial( { color: color1 } ) );

	geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

}

GridHelper.prototype = Object.create( LineSegments.prototype );
GridHelper.prototype.constructor = GridHelper;

export { GridHelper };
