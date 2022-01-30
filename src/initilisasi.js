
async function initilisasi(timerCooking){
  global.config.statusTimerCooking=false;
  clearInterval(timerCooking);
  return global.config.session;
}

export default initilisasi;