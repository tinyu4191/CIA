// DOM
const navOpponents = document.querySelector('.nav-opponents'),
    infoOpponents = document.querySelector('.information-opponents'),
    infoTitle = document.querySelector('.information-title')

infoOpponents.classList.add('d-none')

// data
const dataOpponents = [
    'Sharp',
    'Samsung',
    'AUO 友達光電 友達光電 友達光電',
    'BOE 京東方',
    'HKC惠科',
    'CEC Panda 南京中電熊貓',
    'HKC惠科',
    'HKC惠科',
    'HKC惠科 HKC惠科',
    'HKC惠科',
    'HKC惠科',
]
const itemOpponents = [
    'ISSUE',
    '交貨/投入數',
    '產能',
    '其他',
    '公關與人力',
    'ISSUE',
    'ISSUE',
    'ISSUE',
    'ISSUE',
    '公關與人力',
    '公關與人力',
    '公關與人力',
]

const opponentsPage = () => {
    console.log('Opponents')
    const ul = navOpponents.querySelector('ul')
    dataOpponents.forEach((e) => {
        ul.innerHTML += `<li>${e}</li>`
    })
    navOpponents.addEventListener('click', (params) => {
        let target = params.target
        if (target.matches('li')) {
            infoOpponents.classList.remove('d-none')
            console.log(target.innerText.length)
            infoTitle.innerText = target.innerText
            marquee()
            const ul = infoOpponents.querySelector('ul')
            ul.innerHTML = ''
            itemOpponents.forEach((e) => {
                ul.innerHTML += `<li>${e}</li>`
            })
        }
    })
    window.addEventListener('click', (params) => {
        let target = params.target
        if (target.matches('div')) infoOpponents.classList.add('d-none')
    })
}
// 跑馬燈
function marquee() {
    const boxWidth = infoOpponents.offsetWidth
    const titleWidth = infoTitle.offsetWidth * 1.2
    console.log(titleWidth, boxWidth)
    if (titleWidth > boxWidth) {
        infoTitle.classList.add('animation')
        document.querySelector('.animation').style.animationDuration = (titleWidth - boxWidth) / boxWidth + 5 + 's'
        console.log(document.querySelector('.animation').style.animationDuration)
    } else infoTitle.classList.remove('animation')
}
