onmessage = function (oEvent) {
  sum = 0;
  for (i = 0; i < oEvent.data; i++){
  	sum = sum + i;
  }

  postMessage(sum);
};