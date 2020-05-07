const pallet = document.querySelector('.pallet')
const copyBtn = document.getElementById('copy')
const html = document.getElementsByTagName('html')[0]

// todo re-evaluate
function setColors(keys, ...keyValues) {
	const docStyles = document.documentElement.style
	let result = {}
	keys.forEach((key, i) => {
		result[key] = keyValues[i]
	})
	for (const [style, value] of Object.entries(result)) {
		docStyles.setProperty(style, value)
	}
}

function findColors(ele, ...keys) {
	const winStyles = window.getComputedStyle(ele)
	const keyValues = []
	for (const key of keys) {
		let keyValue = winStyles.getPropertyValue(key)
		keyValues.push(keyValue)
	}
	return keyValues
}

// event delegation
pallet.addEventListener('click', e => {
	let btn = e.target.closest('button')
	if (btn) {
		const styles = ['--color', '--color2']
		let keyValues = findColors(btn, 'background-color', 'color')
		setColors(styles, ...keyValues)
		// drink the cool-aid to see Random Colors!
		if (btn.classList[0] === 'random') {
			const randomStyles = ['--randomBg', '--random']
			let random = Math.floor(Math.random() * 16777215).toString(16)
			let randomBg = Math.floor(Math.random() * 16777215).toString(16)
			setColors(randomStyles, `#${randomBg}`, `#${random}`)
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
	//console.log([...stylesList])
	let copyStyles = stylesList.split(';', 2)
	copyClipBoard(`  ${copyStyles[0]};
 ${copyStyles[1]};
  --darkOverlay:rgba(0, 0, 0, 0.55);`)
}

copyBtn.addEventListener('click', copyVars)
