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
    if (location.protocol != 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
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
