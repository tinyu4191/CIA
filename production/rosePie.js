const rosePieCQ1 = document.querySelector('#rosePieCQ1'),
    rosePieCQ2 = document.querySelector('#rosePieCQ2')

function paintRosePieChart_CQ(dom, data) {
    let myChart = echarts.init(dom)
    let option
    option = {
        title: {
            text: data.title,
            left: 'center',
            textStyle: {
                textBorderColor: 'white',
                textBorderWidth: 2,
            },
        },
        color: [
            '#335c67',
            '#277da1',
            '#577590',
            '#4d908e ',
            '#43aa8b ',
            '#90be6d ',
            '#fff3b0 ',
            '#f9c74f ',
            '#f9844a ',
            '#e09f3e ',
            '#f8961e ',
            '#f3722c ',
            '#f94144 ',
            '#9d8189 ',
            '#9e2a2b ',
            '#540b0e',
        ],
        series: [
            {
                name: '項目:',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                label: {
                    normal: {
                        show: true,
                        formatter: '{b} :\n{c}%',
                        position: 'outside',
                        textStyle: { fontSize: 13, fontWeight: 'bolder' },
                    },
                    emphasis: {
                        show: true,
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data: data.series,
            },
        ],
    }
    myChart.setOption(option)
}

function paintRosePieChart2_CQ(dom, series = {}) {
    let myChart = echarts.init(dom)
    let option
    series.data = [
        { value: 64, name: '競爭對手' },
        { value: 23, name: '群創品質預警' },
        { value: 9, name: '品牌營運' },
        { value: 4, name: '其他' },
    ]
    myChart = echarts.init(dom)
    option = {
        title: {
            text: '情報回報占比 (by類別)',
            left: 'center',
            textStyle: {
                textBorderColor: 'white',
                textBorderWidth: 2,
            },
        },
        color: [
            '#540b0e',
            '#9e2a2b ',
            '#9d8189 ',
            '#f94144 ',
            '#f3722c ',
            '#f8961e ',
            '#e09f3e ',
            '#f9844a ',
            '#f9c74f ',
            '#fff3b0 ',
            '#90be6d ',
            '#43aa8b ',
            '#4d908e ',
            '#577590',
            '#277da1',
            '#335c67',
        ],
        series: [
            {
                name: '項目:',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}\n{c}%',
                        position: 'outside',
                        textStyle: { fontSize: 13, fontWeight: 'bolder' },
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 600,
                        },
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data: series.data,
            },
        ],
    }
    myChart.setOption(option)
}

function getCIAPieData() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-Piechart_byBU001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}

function showpie() {
    console.log('Pie!')
    $.when(getCIAPieData()).then((res) => {
        let bu, brand, si
        bu = option.buSelected
        brand = option.brandSelected
        si = option.siSelected
        console.log(res)
        console.log(bu, bu === '')
        let inforTypeBU = res
            .filter((e) => e.APPLICATION !== null)
            .map((e) => {
                if (e.APPLICATION === 'AA-BD4' || e.APPLICATION === 'AUTO-BD5') return 'AA'
                else if (e.APPLICATION === 'TV' || e.APPLICATION === 'OPEN_CELL_TV') return 'TV+SET'
                else return e.APPLICATION
            })
            .reduce(function (allTypes, bu) {
                if (bu in allTypes) {
                    allTypes[bu]++
                } else {
                    allTypes[bu] = 1
                }
                return allTypes
            }, {})
        if (bu !== '') {
            console.log(bu)
            const buList = (() => {
                if (bu === 'aa') return ['AA-BD4', 'AUTO-BD5']
                else return [bu.toUpperCase()]
            })()
            console.log(buList)
            inforTypeBU = res
                .filter((e) => buList.includes(e.APPLICATION))
                .map((e) => e.CUSTOMER)
                .reduce(function (allTypes, bu) {
                    if (bu in allTypes) {
                        allTypes[bu]++
                    } else {
                        allTypes[bu] = 1
                    }
                    return allTypes
                }, {})
            console.log(inforTypeBU)
        }

        console.log(inforTypeBU)
        const option1 = {}
        const data2 = []
        const valueTotal = Object.values(inforTypeBU).reduce((a, b) => a + b)
        option1.series = Object.keys(inforTypeBU).map((data) => {
            let obj = {}
            obj.name = data
            obj.value = Math.floor((inforTypeBU[data] / valueTotal) * 10000) / 100
            return obj
        })
        /* Title */
        if (si !== '') option1.title = '情報回報占比 (by Provider)'
        else if (brand !== '') option1.title = '情報回報占比 (by SI_Location)'
        else if (bu !== '') option1.title = '情報回報占比 (by Brand)'
        else if (bu === '') option1.title = '情報回報占比 (by BU)'
        paintRosePieChart_CQ(rosePieCQ1, option1) //情資-Pie圖
        paintRosePieChart2_CQ(rosePieCQ2) //情資-Pie圖
    })
}
