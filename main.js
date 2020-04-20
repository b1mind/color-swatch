const pallet = document.querySelector('.pallet')
const copyBtn = document.getElementById('copy')
const html = document.getElementsByTagName("html")[0]
const style1 = '--color'
const style2 = '--color2'
const styles = [style1, style2]
let bgColor
let color

// todo refactoring find/set colors
// ?do I really need a one function solution?

function findCssVal(ele, ...keys) {
  const winStyles = window.getComputedStyle(ele)
  const keyValues = []
  for( const key of keys) {
    let keyValue = winStyles.getPropertyValue(key)
    keyValues.push(keyValue)
    //console.log(keyValues);
  }
  setColors(styles, ...keyValues)
}

//this works but maybe needs refractor 
function setColors(keys, ...keyValues) {
  const docStyles = document.documentElement.style
  docStyles.setProperty(keys[0], keyValues[0])
  docStyles.setProperty(keys[1], keyValues[1])
}

// event delegation
pallet.addEventListener('click', e => {
  let btn = e.target.closest('button')
  // if (!btn) { return } //? is this better to use?
  if (btn) {   
    findCssVal(btn, 'background-color', 'color')
    // drink the cool aid to see Random Colors!
    if (btn.classList[0] === 'random') {
      let random = Math.floor(Math.random()*16777215).toString(16)
      let randomBg = Math.floor(Math.random()*16777215).toString(16)
      let randomStyle = ['--randomBg', '--random']
      setColors(randomStyle, `#${randomBg}`, `#${random}`)
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

