const oraganizationPage = (name) => {
    const pageMain = document.querySelector(`#page-${name}`)
    const divHeader = document.createElement('div')
    const divContent = document.createElement('div')
    const iframe = document.createElement('iframe')
    divHeader.className = 'page-header'
    divHeader.innerText = option.brandSelected.toUpperCase()
    divContent.className = 'page-content'
    iframe.src = 'http://tnvqis03/COMPONENT/orgChart.do?customer=' + option.brandSelected
    divContent.append(iframe)
    pageMain.innerHTML = ''
    pageMain.append(divHeader, divContent)
}
