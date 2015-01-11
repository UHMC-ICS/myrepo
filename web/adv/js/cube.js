			const SCALE_WIN = 1.0;
			var container;
			var camera, scene, renderer;
			var cube, plane;

			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;

			var mouseX = 0;
			var mouseXOnMouseDown = 0;

			var windowHalfX = window.innerWidth * SCALE_WIN;
			var windowHalfY = window.innerHeight * SCALE_WIN;

			function init() {
				container = document.getElementById( 'stage' );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.y = 150;
				camera.position.z = 700;

				scene = new THREE.Scene();

				// Cube

				var geometry = new THREE.CubeGeometry( 400, 400, 400 );

				for ( var i = 0; i < geometry.faces.length; i += 2 ) {

					var hex = Math.random() * 0xffffff;
					geometry.faces[ i ].color.setHex( hex );
					geometry.faces[ i + 1 ].color.setHex( hex );

				}

				var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

				cube = new THREE.Mesh( geometry, material );
				cube.position.y = 150;
				scene.add( cube );

				// Plane

				var geometry = new THREE.PlaneGeometry( 200, 200 );
				geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

				var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

				plane = new THREE.Mesh( geometry, material );
				scene.add( plane );

				renderer = new THREE.CanvasRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( windowHalfX, windowHalfY );

				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				window.addEventListener( 'resize', onWindowResize, false );
				animate();
			}

			function onWindowResize() {
				windowHalfX = window.innerWidth * SCALE_WIN;
				windowHalfY = window.innerHeight * SCALE_WIN;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( windowHalfX, windowHalfY );
			}

			//

			function onDocumentMouseDown( event ) {
				event.preventDefault();

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mouseout', onDocumentMouseOut, false );

				mouseXOnMouseDown = event.clientX - windowHalfX;
				targetRotationOnMouseDown = targetRotation;
			}

			function onDocumentMouseMove( event ) {
				mouseX = event.clientX - windowHalfX;
				targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
			}

			function onDocumentMouseUp( event ) {
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

			function onDocumentMouseOut( event ) {
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

			function onDocumentTouchStart( event ) {
				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;

				}
			}

			function onDocumentTouchMove( event ) {
				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

				}
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
			}

			function render() {
				plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
				renderer.render( scene, camera );
			}
			
			window.addEventListener( 'load', init, false );
