function onShowAlert(type,tulis,judul,fungsiTutup,setAlert) {
    setAlert({
      header: judul,
      type: type,
      text: tulis,
      show: true,
      onCloseAlert : fungsiTutup
    })
  }
export default onShowAlert;