
async function initilisasi(timerCooking){
  global.config.statusTimerCooking=false;
  clearInterval(global.config.timersku);
  return global.config.session;
}

export default initilisasi;