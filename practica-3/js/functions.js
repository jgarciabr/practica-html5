// Funciones y cositas que hacemos cuando esta todo cargado
window.onload = function() {

  // Comprobando el estado de la conexion de forma recurrente
  var conexion = document.getElementById('conexion')
  setInterval(function () {
    if (navigator.onLine){
      conexion.innerHTML = 'Conectado';
      conexion.classList.add('online');
    } else {
      conexion.innerHTML = 'Desconectado';
      conexion.classList.remove('online');
    }
    
  }, 250);


  // Si existe el mapa, verificamos si es https, en caso contrario se redirigira a https
  // Esto lo hacemos por que los metodos de posicionamiento ya no se pueden ejecutar sobre sitios no seguros
  if(typeof document.getElementById("map_geolocation")!=="undefined"){ 
    if (location.protocol != 'http:') {
      location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
    }
  }  

}

// Funcion para ejecutar el bucle de la suma usando webworker
function webworker_init(){
  var worker = new Worker("./js/webworker.js");

  // Mensaje que recibimos del worker
  worker.onmessage = function(event) {
    document.getElementById("result").value = event.data;
  };

  // En caso de producirse un error en el worker mostramos un alert con el error
  worker.onerror = function(error) {
    alert("Se ha producido un error: " + error.message + "\n");
    throw error;
  };

  worker.postMessage(document.getElementById("value").value);
}


//función
document.addEventListener("DOMContentLoaded", function(event) { 

var fileInput = document.getElementById("upload-image");
var divIMG = document.getElementById("imagen");

//Creamos listener que se accciona al resgistrar un cambio en el upload
fileInput.addEventListener("change",function(e){
  var files = this.files
  showImg(files)
},false)

//Mostramos la imagen en la capa habilitado para ello
//Recogemso las imagenes del documento y mostramos preview con FileReader 
function showImg(files){
  //Al permitir subida multiple recorremos y hacemos preview de todos los ficheros cargados
  for(var i=0;i<files.length;i++){
    //Recuperamos elemento
    var file = files[i]

    var imageType = /image.*/


    var image = document.createElement("img");
    image.style.width = "100%";
    var imgDiv = document.getElementById("imagen");
    imgDiv.style.paddingTop = "0";
    if(!file.type.match(imageType)){
      var text = document.createTextNode("El archivo no es una imagen");
      imgDiv.appendChild(text);
      continue;
    }

    image.file = file;
    imgDiv.appendChild(image)

//Mostramos la previsualizacion con FileReader
    var reader = new FileReader()
    reader.onload = (function(aImg){
      return function(e){
        aImg.src = e.target.result;
      };
    }(image))
    reader.readAsDataURL(file);
  
  }
}
});

