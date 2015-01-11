         var imgCanvas;
         var imgContext; // context for drawing on canvas
         var redRange; // % of original red pixel value
         var greenRange; // % of original green pixel value
         var blueRange; // % of original blue pixel value
         var alphaRange; // alpha amount value

         var canvas_width;
         var canvas_height;

         var image1 = new Image(); // image object to store loaded image
         image1.src = "redflowers.png"; // set the image source

         function initImage() 
         {
            imgCanvas = document.getElementById( "thecanvas" );
            imgContext = imgCanvas.getContext("2d")
            
            imgContext.drawImage(image1, 0, 0); // original image  

            // configure GUI events
            redRange = document.getElementById( "redRange" );
            redRange.addEventListener( "change", 
               function() { processImage( this.value, greenRange.value, 
                  blueRange.value ); }, false );
            greenRange = document.getElementById( "greenRange" );
            greenRange.addEventListener( "change",  
               function() { processImage( redRange.value, this.value, 
                  blueRange.value ); }, false )
            blueRange = document.getElementById( "blueRange" );
            blueRange.addEventListener( "change",  
               function() { processImage( redRange.value, 
                  greenRange.value, this.value ); }, false )

            canvas_width = imgContext.canvas.width;
            canvas_height = imgContext.canvas.height;

        } // end function start

         // sets the alpha value for every pixel
         function processAlpha( newValue )
         {
            // get the ImageData object representing canvas's content
            var imageData = imgContext.getImageData(0, 0, canvas_width, canvas_height);
            var pixels = imageData.data; // pixel info from ImageData

            // convert every pixel to grayscale
            for ( var i = 3; i < pixels.length; i += 4 )
            {
               pixels[ i ] = newValue;
            } // end for

            imgContext.putImageData( imageData, 0, 0 );
         } // end function processImage

         // sets the RGB values for every pixel
         function processImage( redPercent, greenPercent, bluePercent )
         {
            // get the ImageData object representing canvas's content
            imgContext.drawImage(image1, 0, 0);   
            var imageData = imgContext.getImageData(0, 0, canvas_width, canvas_height);
            var pixels = imageData.data; // pixel info from ImageData

            // set percentages of red, green and blue in each pixel 
            for ( var i = 0; i < pixels.length; i += 4 )
            {
               pixels[ i ] *= redPercent / 100; 
               pixels[ i + 1 ] *= greenPercent / 100;
               pixels[ i + 2 ] *= bluePercent / 100;
            } // end for

            imgContext.putImageData( imageData, 0, 0 );
         } // end function processImage

         // resets the user manipulated image and the sliders
         function resetImage()
         {
            imgContext.drawImage(image1, 0, 0);   
            redRange.value = 100; 
            greenRange.value = 100; 
            blueRange.value = 100; 
            alphaRange.value = 255; 
         } // end function resetImage

         window.addEventListener( "load", initImage, false );
