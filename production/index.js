console.log('CIA')
const getUrlString = new URL(window.location.href)
// fullscreen
if (!getUrlString.searchParams.has('fullscreen')) {
    getUrlString.searchParams.set('fullscreen', 'y')
    location.href = getUrlString.href
}
// dom
const rightCol = document.querySelector('.right-col'),
    btnFullscreen = document.querySelector('#fullScreenURL'),
    btnFullscreenBig = document.querySelector('#fullScreenURL-big'),
    mainCotnet = document.querySelector('#main-content'),
    iconNav = document.querySelector('.icon-nav'),
    root = document.querySelector('#root'),
    chartOverall = document.querySelector('#chart-overall'),
    iconBox = document.querySelector('.icon-box'),
    downlistBU = document.querySelector('#downlist-bu'),
    downlistBrand = document.querySelector('#downlist-brand'),
    downlistSi = document.querySelector('#downlist-si')

// 判斷select
const bu = getUrlString.searchParams.get('bu')
const brand = getUrlString.searchParams.get('brand')
const si = getUrlString.searchParams.get('si')

// option
let option = {
    buSelected: bu === null ? '' : bu,
    brandSelected: brand === null ? '' : brand,
    siSelected: si === null ? '' : si,
}

// Proxy 代理
const handler = {
    set: (obj, prop, value) => {
        obj[prop] = value
        /* 初始化
         * Bu為空 => Brand, SI 為空
         * Brand為空 => SI為空
         */
        if (prop === 'buSelected' && value === '') {
            Object.keys(obj).forEach((e) => {
                obj[e] = ''
            })
        }
        showpie()
    },
    get: (obj, prop) => {
        return obj[prop]
    },
}

option = new Proxy(option, handler)

const iconChangeStatus = () => {
    const liList = document.querySelectorAll('.icon-box li')
    liList.forEach((li) => {
        const img = li.children[0]
        if (img.alt !== 'opponents') li.classList.remove('selected')
    })
    if (option.buSelected !== '') {
        liList.forEach((li) => {
            const img = li.children[0]
            if (img.alt === 'vacation') li.classList.add('selected')
        })
    }
    if (option.brandSelected !== '') {
        liList.forEach((li) => {
            const img = li.children[0]
            if (img.alt === 'organization') li.classList.add('selected')
        })
    }
}
//  VIP
let customerVIP
const buBrandVIP = []
async function getViP() {
    let storage = window.sessionStorage.getItem('EngCust')
    let res, loginUserID, loginEmpNo
    if (storage === null) {
        res = await $.ajax({
            url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-Eng-Or-Cust001',
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
        })
        window.sessionStorage.setItem('EngCust', JSON.stringify(res))
    } else res = JSON.parse(storage)

    function getUserInfo() {
        return new Promise((resolve, reject) => {
            let timer = window.setInterval(() => {
                if (userInfo.empNo !== undefined) {
                    loginEmpNo = userInfo.empNo
                    loginUserID = userInfo.userId
                    clearInterval(timer)
                    resolve()
                }
            }, 200)
        })
    }
    await getUserInfo()
    console.log('User Info:', loginUserID, loginEmpNo)
    const data = res.filter((e) => e.STRATEGIC_CUSTOMER === 'Y')
    const userData = data
        .filter((e) => {
            e.CS_ID === loginUserID
        })
        .concat(data.filter((e) => e.LEVEL1 === loginEmpNo))
        .concat(data.filter((e) => e.LEVEL2 === loginEmpNo))
        .concat(data.filter((e) => e.LEVEL3 === loginEmpNo))
    customerVIP = Array.from(new Set(userData.map((e) => e.CUST_GROUP)))

    getBrandOption(option.buSelected)
}
/* VIP EmpNo */
const VIPEmpNo = [
    '10002451',
    '10010106',
    '19000415',
    '10003967',
    '17019039',
    '10002829',
    '20032848',
    '10007255',
    '10007916',
    '03000172',
    '10004563',
    '21001059',
]

// function
const pageSwtich = (name) => {
    root.style.display = 'none'
    const pages = document.querySelectorAll('.page')
    const pageTo = document.querySelector(`#page-${name}`)
    pages.forEach((item) => (item.style.display = 'none'))
    pageTo.style.display = 'flex'
}

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

const renderRanking = (data) => {
    const past = document.querySelector('#RankingPast'),
        performance = document.querySelector('#RankingPerformance img'),
        current = document.querySelector('#RankingCurrent')
    let valuePast = data.filter((e) => e.DATA_CATE === 'Past' && e.VALUE === '0').length
    let valueCurrent = data.filter((e) => e.DATA_CATE === 'Current' && e.VALUE === '0').length
    let total = data.filter((e) => e.DATA_CATE === 'Past').length
    past.innerHTML = `${((valuePast / total) * 100).toFixed(0)}%`
    current.innerHTML = `${((valueCurrent / total) * 100).toFixed(0)}%`
    let imgName = ''
    if ((valueCurrent / total) * 100 > 75) {
        imgName += '達標'
    } else {
        imgName += '不達標'
    }
    if (valuePast > valueCurrent) {
        imgName += '爛'
    } else if (valuePast === valueCurrent) {
        imgName += '持平'
    } else {
        imgName += '好'
    }
    performance.src = `./images/${imgName}.png`
}

const renderCopq = (data) => {
    const past = document.querySelector('#pastCOPQ'),
        performance = document.querySelector('#COPQPerformance img'),
        current = document.querySelector('#currentCOPQ')
    data = data.filter((e) => e.APPLICATION_LVL_1 === 'All' && e.DATA_CATE === 'm2CoPQ')
    data.sort((a, b) => {
        return Number(a.MONTH) > Number(b.MONTH) ? 1 : -1
    })
    const preM2COPQ = Number(data[0].VALUE).toFixed(2)
    const m2COPQ = Number(data[1].VALUE).toFixed(2)
    past.innerHTML = `${preM2COPQ}<br>USD`
    current.innerHTML = `${m2COPQ}<br>USD`
    let imgName = ''
    if (m2COPQ > preM2COPQ) {
        imgName += '爛'
    } else if (m2COPQ === preM2COPQ) {
        imgName += '持平'
    } else {
        imgName += '好'
    }
    performance.src = `./images/無target${imgName}.png`
}

const renderCaerb = (data) => {
    const past = document.querySelector('#CAERB_total'),
        performance = document.querySelector('#CAERBPerformance img'),
        current = document.querySelector('#CAERB_target')
    const obj = {
        preMonth: 0,
        thisMonth: 0,
        caerbTarget: 0,
        remainQty: 0,
    }
    data = data.filter((e) => e.APPLICATION === '所有應用')
    data.sort((a, b) => {
        return a.TIMES < b.TIMES ? -1 : 1
    })
    const dataPre = data.filter((e) => e.BOARDTITLE === null),
        dataThis = data.filter((e) => e.BOARDTITLE !== null)

    obj.preMonth = Number(
        dataPre
            .filter((e) => !e.TIMES.includes('W'))
            .map((e) => e.NEWQTY)
            .slice(-1)
            .join()
    )
    obj.thisMonth =
        dataPre
            .filter((e) => e.TIMES.includes('W'))
            .map((e) => e.NEWQTY)
            .reduce((a, b) => a + b) + dataThis.map((e) => e.NEWQTY).reduce((a, b) => a + b)
    obj.caerbTarget = Number(
        dataPre
            .map((e) => e.TARGET)
            .slice(-1)
            .join()
    )
    obj.remainQty = Number(
        dataThis
            .map((e) => e.REMOVEQTY)
            .slice(-1)
            .join()
    )
    past.innerHTML = `${obj.preMonth}件`
    current.innerHTML = `${obj.thisMonth}件`
    let imgName = ''
    imgName += obj.remainQty < obj.caerbTarget ? '達標' : '不達標'
    if (obj.thisMonth > obj.preMonth) {
        imgName += '爛'
    } else if (obj.thisMonth === obj.preMonth) {
        imgName += '持平'
    } else {
        imgName += '好'
    }
    performance.src = `./images/${imgName}.png`
}

const renderCost = (data) => {
    const past = document.querySelector('#OBA_Estimate'),
        performance = document.querySelector('#OBAPerformance img'),
        current = document.querySelector('#OBA_Cost_Target')

    const year = Math.max(...Array.from(new Set(data.map((e) => e.YEAR))))
    const month = Math.max(...Array.from(new Set(data.map((e) => e.MONTH))))
    const thisYM = new Date(`${year} ${month}`)
    const lastYM = new Date(thisYM)
    lastYM.setMonth(lastYM.getMonth() - 1)
    const thisyear = year
    const thisMonth = month
    const lastyear = lastYM.getFullYear()
    const lastMonth = lastYM.getMonth() + 1
    const dataLast = data
        .filter((e) => e.YEAR === String(lastyear) && e.MONTH === String(lastMonth))
        .map((e) => Number(e.VALUE))
        .reduce((a, b) => a + b)
    const dataThis = data
        .filter((e) => e.YEAR === String(thisyear) && e.MONTH === String(thisMonth))
        .map((e) => Number(e.VALUE))
        .reduce((a, b) => a + b)

    const valueCondition = (value) => {
        if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M'
        else if (value >= 1000) return (value / 1000).toFixed(2) + 'K'
        else return value.toFixed(0)
    }
    past.innerHTML = valueCondition(dataLast)
    current.innerHTML = valueCondition(dataThis)

    let imgName = ''
    if (dataThis > dataLast) {
        imgName += '爛'
    } else if (dataThis === dataLast) {
        imgName += '持平'
    } else {
        imgName += '好'
    }
    performance.src = `./images/無target${imgName}.png`
}

const renderVlrr = (data) => {
    const past = document.querySelector('#VLRR_Past .value'),
        performance = document.querySelector('#VLRR_Performance img'),
        current = document.querySelector('#VLRR_Current .value')

    const ym = Array.from(new Set(data.map((e) => e.MONTH)))

    let vlrrPast, vlrrCurrent
    ym.forEach((yearmonth, index) => {
        const overTarget = data.filter((e) => e.MONTH === yearmonth && e.CONTROL === 'OVER').length
        const underTarget = data.filter((e) => e.MONTH === yearmonth && e.CONTROL === 'UNDER').length

        if (index === 0) vlrrPast = Math.floor((underTarget / (underTarget + overTarget)) * 1000) / 10
        else vlrrCurrent = Math.floor((underTarget / (underTarget + overTarget)) * 1000) / 10
    })

    past.innerHTML = vlrrPast
    current.innerHTML = vlrrCurrent
    let imgName = ''
    if (vlrrCurrent >= 80) imgName += '達標'
    else imgName += '不達標'

    if (vlrrCurrent > vlrrPast) {
        imgName += '好'
    } else if (vlrrCurrent === vlrrPast) {
        imgName += '持平'
    } else {
        imgName += '爛'
    }
    performance.src = `./images/${imgName}.png`
}

const renderCid = (data) => {
    const past = document.querySelector('#CID_dppm .value'),
        performance = document.querySelector('#CID_Gain .value'),
        current = document.querySelector('#CID_Effect .value')
    const dataAll = data.filter((e) => e.APPLICATION_LVL_1 === 'All')
    dataAll.sort((a, b) => {
        return a.DATA_CATE > b.DATA_CATE ? 1 : -1
    })
    const [cidDppm, cidGain, cidEffect] = dataAll.map((e) => e.VALUE)
    past.innerHTML = Number(cidDppm).toFixed(1)
    performance.innerHTML = cidGain
    current.innerHTML = (cidEffect * 100).toFixed(0)
}

const renderBuOption = (data) => {
    downlistBU.innerHTML = '<option value="">---請選擇---</option>'
    let isSelected
    data.forEach((e) => {
        isSelected = e.toLowerCase() === option.buSelected ? 'selected' : ''
        downlistBU.innerHTML += `<option value="${e.toLowerCase()}" ${isSelected}>${e}</option>`
    })
}

const renderBrandOption = (data) => {
    downlistBrand.innerHTML = '<option value="">---請選擇---</option>'
    let isSelected
    data.forEach((e) => {
        isSelected = e.toLowerCase() === option.brandSelected ? 'selected' : ''
        downlistBrand.innerHTML += `<option value="${e.toLowerCase()}" ${isSelected}>${e}</option>`
    })
    if (option.buSelected !== '' && data.length > 0) downlistBrand.disabled = false
    else downlistBrand.disabled = true
}

const getBrandOption = (bu) => {
    bu = bu.toUpperCase()
    if (bu === 'AA') bu = [getBrandApplication('AA-BD4'), getBrandApplication('AUTO-BD5')]
    else if (bu === 'IAVM') bu = [getBrandApplication('IAV'), getBrandApplication('MEDICAL')]
    else bu = [getBrandApplication(bu)]
    $.when(...bu).then((res) => {
        const data = res
            .filter((e) => customerVIP.includes(e.CUSTOMER))
            .map((e) => e.CUSTOMER)
            .sort()
        renderBrandOption(data)
    })
}

const getVIPBUBrand = (data) => {
    console.table(data)
    const bus = Array.from(new Set(data.map((e) => e.APPLICATION_LVL_1)))
    buBrandVIP.push(...bus)
    renderBuOption(bus)
}

const renderLightBox = (json) => {
    // 客戶排名達標率
    const valueRanking = json.filter((e) => e.BOARD_CATE === '客戶情資_排名達標率' && e.APPLICATION_LVL_2 !== 'All')
    renderRanking(valueRanking)

    // CoPQ/m²
    const valueCopq = json.filter((e) => e.BOARD_CATE === '客戶情資_m2CoPQ')
    renderCopq(valueCopq)

    // OBA Cost
    const valueObaCost = json
        .filter((e) => e.BOARD_CATE === '客戶情資_OBACost')
        .filter((e) => !['AA', 'SET_TV'].includes(e.APPLICATION_LVL_1))
    renderCost(valueObaCost)

    // CID
    const valueCID = json.filter((e) => e.BOARD_CATE === '客戶情資_客責吸收')
    renderCid(valueCID)

    // getVIPBUBrand
    const valueVIP = json.filter((e) => e.BOARD_CATE == '客戶情資_VIP')
    getVIPBUBrand(valueVIP)
}

const urlStateChange = () => {
    const getUrlString = new URL(window.location.href)
    const isFullscreen = getUrlString.searchParams.get('fullscreen')

    if (isFullscreen === 'y') {
        rightCol.style.width = '100vw'
        rightCol.style.height = '100vh'
        btnFullscreen.style.fontSize = '12px'
        btnFullscreenBig.style.display = ''
    } else {
        btnFullscreenBig.style.display = 'none'
    }
    //  判斷page
    const page = getUrlString.searchParams.get('page')
    if (page !== null) {
        pageSwtich(page)
        if (page === 'organization') oraganizationPage(page)
    }
}

// initSearchparams
const initSearchparams = () => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('bu')) {
        url.searchParams.set('bu', option.buSelected)
    } else {
        url.searchParams.append('bu', option.buSelected)
    }
    if (url.searchParams.has('brand')) {
        url.searchParams.set('brand', option.brandSelected)
    } else {
        url.searchParams.append('brand', option.brandSelected)
    }
    if (url.searchParams.has('si')) {
        url.searchParams.set('si', option.siSelected)
    } else {
        url.searchParams.append('si', option.siSelected)
    }
    history.pushState({}, '', url)
}

// refreshLightBox
const refreshLightBox = () => {
    $.when(getLightStatus()).then((res) => {
        renderLightBox(res)
    })
    $.when(getDataCaerb()).then((res) => {
        renderCaerb(res)
    })
    $.when(getDataVlrrAll()).then((res) => {
        renderVlrr(res)
    })
}

// ajax
function getLightStatus() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-KPI_Board001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}
$.when(getLightStatus()).then((res) => {
    renderLightBox(res)
})

function getDataCaerb() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-CAERB-BarByApp001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}
$.when(getDataCaerb()).then((res) => {
    renderCaerb(res)
})

/* getEngSICustomer */
function getEngSICustomer() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-Eng-Or-Cust001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}

/* getBrand */
function getBrandApplication(bu) {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=CI_CUSTOMERS001&APPLICATION=' + bu,
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}

function getDataVlrrAll() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-VLRR-ALLBU001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}

$.when(getDataVlrrAll()).then((res) => {
    renderVlrr(res)
})

// render
getViP()
showpie()
iconChangeStatus()
urlStateChange()

// event
iconNav.addEventListener('click', (params) => {
    let target = params.target
    if (target.matches('.fa-eye')) {
        target.classList.replace('fa-eye', 'fa-eye-slash')
        mainCotnet.style.display = 'none'
    } else if (target.matches('.fa-eye-slash')) {
        target.classList.replace('fa-eye-slash', 'fa-eye')
        mainCotnet.style.display = ''
    } else if (target.matches('.fa-home')) {
        const linkHome = document.querySelector('.link-home')
        linkHome.href = (() => {
            const urlCopy = new URL(window.location.href)
            urlCopy.searchParams.delete('page')
            return urlCopy.href
        })()
    } else if (target.matches('.fa-search-plus')) {
        iconBox.style.display = 'none'
        let url = new URL(window.location.href)
        let pageName = 'overall'
        if (url.searchParams.has('page')) {
            url.searchParams.set('page', pageName)
        } else {
            url.searchParams.append('page', pageName)
        }
        history.pushState({}, pageName, url)
        pageSwtich('overall')
    } else if (target.matches('.fa-cog')) {
        iconNav.classList.toggle('active')
        const liList = document.querySelectorAll('.icon-nav li')
        liList.forEach((item, index) => {
            if (!iconNav.classList.contains('active')) {
                if (index !== 0) {
                    item.classList.toggle('d-none')
                }
            } else {
                if (index !== 0) {
                    setTimeout(() => {
                        item.classList.toggle('d-none')
                    }, 50 * index)
                }
            }
        })
    }
})

iconBox.addEventListener('click', (params) => {
    let target = params.target
    if (target.matches('img')) {
        let url = new URL(window.location.href)
        let pageName = target.alt
        if (url.searchParams.has('page')) {
            url.searchParams.set('page', pageName)
        } else {
            url.searchParams.append('page', pageName)
        }
        history.pushState({}, pageName, url)
        window.location = url
        urlStateChange()
    }
})

downlistBU.addEventListener('change', () => {
    option.buSelected = downlistBU.value

    iconChangeStatus()
    initSearchparams()
    getBrandOption(option.buSelected)
})

downlistBrand.addEventListener('change', () => {
    option.brandSelected = downlistBrand.value
    if (option.brandSelected === '') siSelected = ''
    initSearchparams()
    iconChangeStatus()
})
