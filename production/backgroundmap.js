// Observer
const ul = document.querySelector('.right-col')

// dom
const backgroundWorldmap = document.querySelector('#background-worldmap')
// echarts
const echartsWorldmap = (dom, data) => {
    let myChart = echarts.init(dom)
    let option = {
        title: {
            show: false,
            text: 'COVID19 Monitorboard [WorldWide]',
            left: 'center',
        },

        tooltip: {
            formatter: function (params) {
                let value = params.value
                return (
                    '<div style="width:500px;display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap">' +
                    '<b><i class="fa fa-star red " style="font-size:2em"></i>客戶/SI:' +
                    params.name +
                    '</b><br/>' +
                    '<b><i class="fa fa-paperclip blue" style="font-size:1em"></i>類型:' +
                    value[3] +
                    '</b><br/>' +
                    '<b style="word-wrap:break-word;"><i class="fa fa-list-ul green" style="font-size:1em"></i>說明:' +
                    value[4] +
                    '</b><br/></div>'
                )
            },
        },
        geo: {
            map: 'world',
            roam: true,
            zoom: 1.4, // 設定比例比sesies的大，出現外圍地圖疊加效果
            center: [0, 20],
            emphasis: {
                label: {
                    show: true,
                },
                itemStyle: {
                    areaColor: '#E0E0E0',
                },
            },
            itemStyle: {
                areaColor: '#46A3FF',
                borderWidth: 2,
                borderColor: '#FFFFFF',
            },
        },

        series: [
            {
                type: 'effectScatter',
                symbolSize: 10,
                symbol: 'circle',

                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'stroke', //渲染的形式，还可选fill
                    period: 5, //动画的时间。
                    scale: 3.5, //大小
                },
                itemStyle: {
                    color: function (params) {
                        let color = ''
                        let value = params.value
                        if (value[2] >= 3) {
                            color = 'red'
                        }
                        if (value[2] >= 2 && value[2] < 3) {
                            color = 'yellow'
                        }
                        if (value[2] < 2) {
                            color = 'green'
                        }
                        return color
                    },
                },
                data: [
                    { name: 'Hisense_江門', value: [113.04031, 22.39247, 2, 'EMS生產', '新增32"專用產線'] },
                    {
                        name: 'Hisense_江門',
                        value: [113.04031, 22.39247, 2, 'EMS生產', '產線檢驗畫面調整，取消按壓畫面'],
                    },
                    { name: 'Samsung_中山', value: [113.18495, 22.30502, 2, 'EMS生產', '產線新增LCM&整機線'] },
                    {
                        name: 'Boe_吴江',
                        value: [120.40337, 31.11294, 2, '競爭對手', 'BOE代工小米FR不良過高，談定判責規定'],
                    },
                    { name: 'Qisda_苏州', value: [120.32293, 31.19292, 2, '競爭對手', '保護膜氣泡'] },
                    {
                        name: 'Qisda_苏州',
                        value: [120.32293, 31.19292, 2, '競爭對手', 'LGD畫異 & BOE 偏光板亮印8D報告'],
                    },
                    { name: '昆山MSI', value: [121.08402, 31.17543, 2, 'EMS生產', '攔檢異物/異物亮點規格內NG'] },
                    { name: '聯寶_合肥', value: [117.11324, 31.43575, 2, '競爭對手', '投綫TP高不良啟動sorting'] },
                    { name: '聯寶_合肥', value: [117.11324, 31.43575, 1, '競爭對手', '白點異物高不良啟動sorting'] },
                    {
                        name: '聯寶_合肥',
                        value: [117.11324, 31.43575, 1, '競爭對手', 'S-LINE 異物高不良，自主啟動sorting'],
                    },
                    { name: 'Quanta_重慶', value: [106.21391, 29.50578, 1, '競爭對手', '搖晃異音'] },
                    { name: 'Quanta_重慶', value: [106.21391, 29.50578, 1, '競爭對手', '固定位置破片不良'] },
                    {
                        name: 'Wistron_重慶',
                        value: [106.33303, 29.39233, 1, 'EMS生產', 'Wistron for HP投入近況及未來走勢'],
                    },
                    {
                        name: '惠州TCL海外電子（SCBC）',
                        value: [114.20276, 23.0155, 3, '競爭對手', 'Acer出貨計畫各競爭對手占比'],
                    },
                ],
            },
        ],
    }
    myChart.setOption(option)

    let Observer = new MutationObserver(function () {
        myChart.resize()
    })

    Observer.observe(ul, {
        attributes: true,
    })

    setTimeout(function () {
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    }, 200)
    myChart.on('click', function (params) {
        if (params.data) {
            myChart.setOption({
                geo: {
                    center: params.data.value,
                    zoom: 6,
                },
            })
        } else {
            myChart.setOption({
                geo: {
                    center: [0, 0],
                    zoom: 1,
                },
            })
        }
        myChart.setOption(option)
    })
}

echartsWorldmap(backgroundWorldmap)
