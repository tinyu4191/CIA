const pieData = []
function paintRosePieChart_CQ(elementId, theme, phase, xValue, yValue, legendDataX, xAxisDataX, seriesDataX, targetX) {
    var legendDataArray = ['Tablet', 'TV+SET', 'NB', 'AA', 'MNT', 'CE', 'MP', 'IAVM']
    var xAxisDataArray = []
    var seriesDataArray = [
        { value: 4, name: 'Tablet' },
        { value: 17, name: 'TV+SET' },
        { value: 24, name: 'NB' },
        { value: 11, name: 'AA' },
        { value: 9, name: 'MNT' },
        { value: 15, name: 'CE' },
        { value: 7, name: 'MP' },
        { value: 13, name: 'IAVM' },
    ]
    var targetArray = [300]

    if (phase == 'P') {
        legendDataArray = []
        xAxisDataArray = []
        seriesDataArray = []
        targetArray = []
        if (legendDataX) legendDataArray = legendDataX
        if (xAxisDataX) xAxisDataArray = xAxisDataX
        if (seriesDataX) seriesDataArray = seriesDataX
        if (targetX) targetArray = targetX
    }
    var option
    var seriesArray = []

    var myObject = document.getElementById(elementId)
    var myChart
    if (myObject) {
        myChart = echarts.init(myObject, theme)
        var option = {
            title: {
                text: '情報回報占比 (by BU)',
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
                            formatter: '{b} : {c}%',
                            position: 'outside',
                            textStyle: { fontSize: 13, fontWeight: 'bolder' },
                        },
                        emphasis: {
                            //文本样式
                            show: true, //展示
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 700,
                            },
                        },
                    },
                    emphasis: {
                        label: {
                            show: true,
                        },
                    },
                    data: seriesDataArray,
                },
            ],
        }
        myChart.setOption(option)
    }

    return myChart
}

function paintRosePieChart2_CQ(elementId, theme, phase, xValue, yValue, legendDataX, xAxisDataX, seriesDataX, targetX) {
    var legendDataArray = ['競爭對手', '群創品質預警', '品牌營運', '其他']
    var xAxisDataArray = []
    var seriesDataArray = [
        { value: 64, name: '競爭對手' },
        { value: 23, name: '群創品質預警' },
        { value: 9, name: '品牌營運' },
        { value: 4, name: '其他' },
    ]
    var targetArray = [300]

    if (phase == 'P') {
        legendDataArray = []
        xAxisDataArray = []
        seriesDataArray = []
        targetArray = []
        if (legendDataX) legendDataArray = legendDataX
        if (xAxisDataX) xAxisDataArray = xAxisDataX
        if (seriesDataX) seriesDataArray = seriesDataX
        if (targetX) targetArray = targetX
    }
    var option
    var seriesArray = []

    var myObject = document.getElementById(elementId)
    var myChart
    if (myObject) {
        myChart = echarts.init(myObject, theme)
        var option = {
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
                    data: seriesDataArray,
                },
            ],
        }
        myChart.setOption(option)
    }

    return myChart
}

paintRosePieChart_CQ('rosePieCQ1') //情資-Pie圖
paintRosePieChart2_CQ('rosePieCQ2') //情資-Pie圖

function getCIAPieData() {
    return $.ajax({
        url: jsonPath + '/jsonQuery.do?dataRequestName=cq-CIA-PROD-Piechart_byBU001',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
    })
}
console.log('when')
$.when(getCIAPieData()).then((res) => {
    pieData.push(...res)
})

function showpie() {
    console.log('Pie !!')
    console.log(option)
}
