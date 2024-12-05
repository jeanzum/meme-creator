const imageInput = document.getElementById('imageInput');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
let currentImage = null;

canvas.width = 500;
canvas.height = 500;

/**
 * @constant {FileReader} reader - An instance of the FileReader class used to read the contents of files asynchronously.
 */

imageInput.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = () => {
        currentImage  = new Image();
        currentImage.src = reader.result;
        currentImage.onload = () => {
            drawText();
        };
    };

    reader.readAsDataURL(imageInput.files[0]);
});

/**
 * Creates an anchor (`<a>`) element.
 */

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageInput.value = '';

});

/**
 * Draws text on the canvas, including top and bottom text, and handles image drawing and text input events.
 * 
 * This function clears the canvas, draws the current image if available, and then draws the top and bottom text
 * with specified styles. It also sets up event listeners for text input changes and the download button.
 * 
 * @function
 */
const drawText = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentImage) 
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    ctx.font = 'bold 40px Impact';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.textAlign = 'center';

    // Texto superior
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Texto inferior
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

    // Redibujar los textos
    topTextInput.addEventListener('input', drawText);
    bottomTextInput.addEventListener('input', drawText);
};


