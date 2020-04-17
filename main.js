const pallet = document.querySelector('.pallet')
const copyBtn = document.getElementById('copy')
const html = document.getElementsByTagName("html")[0]
const style1 = '--color'
const style2 = '--color2'
let bgColor
let color

// todo working on
// ?do I really need a one function solution?
function findCssVal(ele, ...keys) {
  const docStyles = document.documentElement.style
  let winStyles = window.getComputedStyle(ele)
  for( const key of keys) {
    const keyValue = winStyles.getPropertyValue(key)
    docStyles.setProperty(key, keyValue)
    console.log(key, keyValue)
  }
} 

findCssVal(html, style1, style2)

// this works but maybe needs refractor 
function findColors(ele, ...keys) {
  bgColor = window.getComputedStyle(ele).getPropertyValue(keys[0])
  color = window.getComputedStyle(ele).getPropertyValue(keys[1])
}

function setColors(key, val, key2, val2) {
  const docStyles = document.documentElement.style
  docStyles.setProperty(key, val)
  docStyles.setProperty(key2, val2)
}

// findColors(html, style1, style2)
// setColors(style1, bgColor, style2, color)

// event delegation
pallet.addEventListener('click', e => {
  let btn = e.target.closest('button')
  // if (!btn) { return } //? is this better to use?
  if (btn) { 
    //findCssVal(btn, 'background-color', 'color')
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
function copyClipBoard(value) {
    let tempInput = document.createElement('TEXTAREA')
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
}

function copyVars() {
  let stylesList = html.style.cssText
  let copyStyles = stylesList.split(';', 2)
  copyClipBoard(`  ${copyStyles[0]}; 
 ${copyStyles[1]};
  --darkOverlay:rgba(0, 0, 0, 0.55);`)
}

copyBtn.addEventListener('click', copyVars)

