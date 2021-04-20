export const isNumeric = (e) => {
  const reg = /^[0-9\b]+$/
  const keyCode = e.keyCode || e.which
  const keyValue = String.fromCharCode(keyCode)
  if (!reg.test(keyValue)) e.preventDefault()
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isNumberKey = (e) => {
  let validate = false
  const reg = /^[0-9\b]+$/
  let keyCode = e.keyCode || e.which || e.charCode
  if (keyCode >= 96 && keyCode <= 105) {
    // Numpad keys
    keyCode -= 48
  }
  const keyValue = String.fromCharCode(keyCode)

  if (!reg.test(keyValue)) {
    e.preventDefault()
    validate = true
  }

  return validate
}