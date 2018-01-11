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

}