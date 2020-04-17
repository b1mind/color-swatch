const docStyles = document.documentElement.style
const pallet = document.querySelector('.pallet')
const copyBtn = document.getElementById('copy')
const html = document.getElementsByTagName("html")[0]

function setColors(ele, x, y) {
  let bgColor = window.getComputedStyle(html).getPropertyValue('--color')
  let color = window.getComputedStyle(html).getPropertyValue('--color2')
  docStyles.setProperty('--color', bgColor)
  docStyles.setProperty('--color2', color)
}
let bgColor = window.getComputedStyle(html).getPropertyValue('--color')
let color = window.getComputedStyle(html).getPropertyValue('--color2')
docStyles.setProperty('--color', bgColor)
docStyles.setProperty('--color2', color)

// event delegation
pallet.addEventListener('click', e => {
  let btn = e.target.closest('button')
  //if (!btn) { return } //
  if (btn) { 
    bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
    color = window.getComputedStyle(btn).getPropertyValue('color')
    docStyles.setProperty('--color', bgColor)
    docStyles.setProperty('--color2', color)
    // drink the coolaid to see Random Colors!
    if (btn.classList[0] === 'random') {
      let random = Math.floor(Math.random()*16777215).toString(16)
      let randomBg = Math.floor(Math.random()*16777215).toString(16)
      docStyles.setProperty('--random', `#${random}`)
      docStyles.setProperty('--randomBg', `#${randomBg}`)
    } 
  } 
})

// clipboard those trippy colors for use else where.
function copyVars(value) {
    let tempInput = document.createElement('TEXTAREA')
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
}

function copyNow() {
  let stylesList = html.style.cssText
  let copyStyles = stylesList.split(';', 2)
  copyVars(`  ${copyStyles[0]}; 
 ${copyStyles[1]};`)
}

copyBtn.addEventListener('click', copyNow)


