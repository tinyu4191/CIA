// DOM
const thead = document.querySelector('.table-thead'),
    tbody = document.querySelector('.table-tbody'),
    btnSearch = document.querySelector('.button-search'),
    btnSearchAll = document.querySelector('.button-searchAll'),
    searchBox = document.querySelector('.search-box'),
    infoType = document.querySelector('#info-type'),
    ciType = document.querySelector('#ci-type'),
    inputDateFrom = document.querySelector('#input-date-from'),
    inputDateTo = document.querySelector('#input-date-to')

// select
let dateFrom = '',
    dateTo = '',
    infoTypeSelected = '',
    ciTypeSelected = ''

const getJson = () => {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-CI_List_all001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}
const renderResultTable = (res) => {
    const theadData = [
        '時間',
        'Application',
        '情資類型',
        '內容類別',
        '評分',
        '品牌',
        'SI Location',
        '標題',
        '內容',
        '提案人',
        '單號',
    ]
    let theadContent = '',
        tbodyContent = ''
    theadContent += '<tr>'
    theadContent += theadData.map((e) => `<th class="text-nowrap">${e}</th>`).join('')
    theadContent += '</tr>'
    thead.innerHTML = theadContent
    res.forEach((e) => {
        const d = new Date(e.UPDATE_DATE.time)
        const year = d.getFullYear()
        const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
        e.DATE = `${year}-${month}-${date}`
    })
    res.sort(function (a, b) {
        return b.UPDATE_DATE.time - a.UPDATE_DATE.time
    })
    res.forEach((e, idx) => {
        const tag = idx % 2 === 0 ? 'even' : 'odd'
        tbodyContent += `
          <tr>
            <td class="text-nowrap ${tag}">${e.DATE}</td>
            <td class="text-nowrap ${tag}">${e.APPLICATION}</td>
            <td class="text-nowrap ${tag}">${e.INFO_TYPE}</td>
            <td class="text-nowrap ${tag}">${e.CI_FORM_TYPE}</td>
            <td class="text-nowrap ${tag}">⭐⭐⭐⭐⭐</td>
            <td class="text-nowrap ${tag}">${e.CUSTOMER}</td>
            <td class="text-nowrap ${tag}">${e.SI}</td>
            <td class="${tag}">${e.CI_TITLE}</td>
            <td class="${tag}">${e.CI_DESC}</td>
            <td class="text-nowrap ${tag}">${e.PROVIDER}</td>
            <td class="text-nowrap ${tag}">${e.CI_NO}</td>
          </tr>
          `
    })
    tbody.innerHTML = tbodyContent
}

const queryPage = () => {
    $.when(getJson()).then((res) => {
        searchBox.classList.add('animation')
        // 情資類型
        const dataInfoType = Array.from(new Set(res.map((e) => e.INFO_TYPE)))
            .filter((e) => e !== null)
            .map((e, idx) => `<option value="${e}">${e}</option>`)
        infoType.innerHTML += dataInfoType
        // 內容類別
        const dataCiType = Array.from(new Set(res.map((e) => e.CI_FORM_TYPE))).map(
            (e, idx) => `<option value="${e}">${e}</option>`
        )
        ciType.innerHTML += dataCiType
        btnSearch.addEventListener('click', () => {
            dateFrom = inputDateFrom.value
            dateTo = inputDateTo.value
            infoTypeSelected = infoType.value
            ciTypeSelected = ciType.value
            let dataCopy = res.map((e) => Object.assign(e))
            if (dateFrom !== '') dataCopy = dataCopy.filter((e) => e.UPDATE_DATE.time >= new Date(dateFrom).getTime())
            if (dateTo !== '') dataCopy = dataCopy.filter((e) => e.UPDATE_DATE.time <= new Date(dateTo).getTime())
            if (infoTypeSelected !== '') dataCopy = dataCopy.filter((e) => e.INFO_TYPE === infoTypeSelected)
            if (ciTypeSelected !== '') dataCopy = dataCopy.filter((e) => e.CI_FORM_TYPE === ciTypeSelected)
            renderResultTable(dataCopy)
        })
        btnSearchAll.addEventListener('click', () => {
            renderResultTable(res)
        })
    })
}
