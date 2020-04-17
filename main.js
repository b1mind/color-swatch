const docStyles = document.documentElement.style
const pallet = document.querySelector('.pallet')
const copyBtn = document.getElementById('copy')
const html = document.getElementsByTagName("html")[0]
const style1 = '--color'
const style2 = '--color2'
let bgColor
let color

function findColors(ele, key, key2) {
  bgColor = window.getComputedStyle(ele).getPropertyValue(key)
  color = window.getComputedStyle(ele).getPropertyValue(key2)
}

function setColors(key, val, key2, val2) {
  docStyles.setProperty(key, val)
  docStyles.setProperty(key2, val2)
}

findColors(html, style1, style2)
setColors(style1, bgColor, style2, color)

// event delegation
pallet.addEventListener('click', e => {
  let btn = e.target.closest('button')
  //if (!btn) { return } //
  if (btn) { 
    findColors(btn, 'background-color', 'color')
    setColors(style1, bgColor, style2, color)
    // drink the cool aid to see Random Colors!
    if (btn.classList[0] === 'random') {
      let random = Math.floor(Math.random()*16777215).toString(16)
      let randomBg = Math.floor(Math.random()*16777215).toString(16)
      setColors('--randomBg', `#${randomBg}`, '--random', `#${random}`)
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


