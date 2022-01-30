function onCloseAlert(setAlert) {
  setAlert({
    header: '',
    type: '',
    text: '',
    show: false,
    onCloseAlert:onCloseAlert
  })
}
export default onCloseAlert;