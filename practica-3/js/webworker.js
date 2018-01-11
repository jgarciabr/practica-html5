// Funcion para ejecutar el bucle de la suma usando webworker
function webworker_init(){
  var worker = new Worker("./js/webworker_bucle.js");

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