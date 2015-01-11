			if ( ! Detector.webgl ) {
				Detector.addGetWebGLMessage();
				document.getElementById( 'container' ).innerHTML = "";
			}

			var container, stats;
			var camera, scene, renderer;

			var parameters = {
				width: 2000,
				height: 2000,
				widthSegments: 250,
				heightSegments: 250,
				depth: 1500,
				param: 4,
				filterparam: 1
			}
			
			var waterNormals;

			function init() {
				container = document.getElementById( 'stage' );

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );

				camera.position.set( 0, Math.max( parameters.width * 1.5, parameters.height ) / 8, parameters.height );
				camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.userPan = false;
				controls.userPanSpeed = 0.0;
				controls.maxDistance = 5000.0;
				controls.maxPolarAngle = Math.PI * 0.495;

				directionalLight = new THREE.DirectionalLight( 0xffff55, 1 );
				directionalLight.position.set( - 1, 0.4, - 1 );
				scene.add( directionalLight );
				
				waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
				waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

				water = new THREE.Water( renderer, camera, scene, {
					textureWidth: 512, 
					textureHeight: 512,
					waterNormals: waterNormals,
					alpha: 	1.0,
					sunDirection: directionalLight.position.normalize(),
					sunColor: 0xffffff,
					waterColor: 0x001e0f,
					distortionScale: 50.0,
				} );

				mirrorMesh = new THREE.Mesh(
					new THREE.PlaneGeometry( parameters.width * 500, parameters.height * 500, 50, 50 ), 
					water.material
				);
				
				mirrorMesh.add( water );
				mirrorMesh.rotation.x = - Math.PI * 0.5;
				scene.add( mirrorMesh );

				// load skybox

				var cubeMap = new THREE.Texture( [] );
				cubeMap.format = THREE.RGBFormat;
				cubeMap.flipY = false;

				var loader = new THREE.ImageLoader();
				loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {

					var getSide = function ( x, y ) {

						var size = 1024;

						var canvas = document.createElement( 'canvas' );
						canvas.width = size;
						canvas.height = size;

						var context = canvas.getContext( '2d' );
						context.drawImage( image, - x * size, - y * size );

						return canvas;
					};

					cubeMap.image[ 0 ] = getSide( 2, 1 ); // px
					cubeMap.image[ 1 ] = getSide( 0, 1 ); // nx
					cubeMap.image[ 2 ] = getSide( 1, 0 ); // py
					cubeMap.image[ 3 ] = getSide( 1, 2 ); // ny
					cubeMap.image[ 4 ] = getSide( 1, 1 ); // pz
					cubeMap.image[ 5 ] = getSide( 3, 1 ); // nz
					cubeMap.needsUpdate = true;
				} );

				var cubeShader = THREE.ShaderLib['cube'];
				cubeShader.uniforms['tCube'].value = cubeMap;

				var skyBoxMaterial = new THREE.ShaderMaterial( {
					fragmentShader: cubeShader.fragmentShader,
					vertexShader: cubeShader.vertexShader,
					uniforms: cubeShader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
				});

				var skyBox = new THREE.Mesh(
					new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
					skyBoxMaterial
				);
				
				scene.add( skyBox );
				animate();
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
			}

			function render() {
				water.material.uniforms.time.value += 1.0 / 60.0;
				controls.update();
				water.render();
				renderer.render( scene, camera );
			}

			window.addEventListener( 'load', init, false );
