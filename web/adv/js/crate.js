			const SCALE_WIN = 1.0;
			var camera, scene, renderer;
			var mesh;

			function init() {
				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth*SCALE_WIN, window.innerHeight*SCALE_WIN );
				document.getElementById("stage").appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

				var geometry = new THREE.BoxGeometry( 200, 200, 200 );

				var texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );
				texture.anisotropy = renderer.getMaxAnisotropy();

				var material = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				window.addEventListener( 'resize', onWindowResize, false );
				animate();
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth*SCALE_WIN, window.innerHeight*SCALE_WIN );
			}

			function animate() {
				requestAnimationFrame( animate );
	
				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;
	
				renderer.render( scene, camera );
			}
			
			window.addEventListener( 'load', init, false );
