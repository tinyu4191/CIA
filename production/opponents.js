// DOM
const navOpponents = document.querySelector('.nav-opponents'),
    infoOpponents = document.querySelector('.information-opponents'),
    infoTitle = document.querySelector('.information-title')

infoOpponents.classList.add('d-none')

const opponentsPage = () => {
    console.log('Opponents')
    navOpponents.addEventListener('click', (params) => {
        let target = params.target
        if (target.matches('li')) {
            infoOpponents.classList.remove('d-none')
            infoTitle.innerText = target.innerText
        }
    })
    window.addEventListener('click', (params) => {
        let target = params.target
        console.log(target)
        // if (!(target.matches('li') || target.matches('i') || target.matches('select'))) {
        //     infoOpponents.classList.add('d-none')
        // }
        if (target.matches('div')) infoOpponents.classList.add('d-none')
    })
}
