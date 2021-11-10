function overallPage() {
    console.log('overall')
    /* DOM */
    const sortingRateChart = document.querySelector('#overall-sorting-rate'),
        customerRankingChart = document.querySelector('#overall-customer-ranking'),
        caerbChart = document.querySelector('#overall-caerb'),
        copqChart = document.querySelector('#overall-copq'),
        vlrrChart = document.querySelector('#overall-vlrr'),
        customerClaimChart = document.querySelector('#overall-customer-claim')
    /* Data */

    /* echarts function */
    const paintChartSortingRate = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            title: {
                text: 'OBA Sorting Cost',
            },
            grid: {
                top: '10%',
                left: '5%',
                bottom: '10%',
                right: '5%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    interval: 0,
                },
                data: ['TV', 'Tablet', 'Monitor', 'IAVM', 'NB', 'CE', 'MP', 'AA'],
            },
            yAxis: {
                nameLocation: 'center',
                nameRotate: 90,
                nameTextStyle: {
                    padding: [0, 0, 20, 0],
                },
                type: 'value',
                min: 0,
                interval: 200,
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 25,
                    z: '-1',
                    barGap: '-119%',
                    label: {
                        show: true, //开启显示
                        position: 'inside', //在上方显示
                        textStyle: {
                            //数值样式
                            color: 'black',
                            fontSize: 10,
                        },
                        formatter: function (p) {
                            return (p.value / 1000000).toFixed(2) + 'M'
                        },
                    },
                    data: [
                        {
                            value: 388737,
                            itemStyle: {
                                color: '#FF2945',
                            },
                        },
                        {
                            value: 0,
                            itemStyle: {
                                color: 'gray',
                            },
                        },
                        {
                            value: 318637,
                            itemStyle: {
                                color: 'green',
                            },
                        },
                        {
                            value: 65377,
                            itemStyle: {
                                color: '#FF801F',
                            },
                        },
                        {
                            value: 1700009,
                            itemStyle: {
                                color: '#1A81FF',
                            },
                        },
                        {
                            value: 0,
                            itemStyle: {
                                color: '#FFD633',
                            },
                        },
                        {
                            value: 1181878,
                            itemStyle: {
                                color: '#00B39E',
                            },
                        },
                        {
                            value: 2916000,
                            itemStyle: {
                                color: '#D26900',
                            },
                            label: {
                                color: 'red',
                                fontSize: 12,
                                fontWeight: 'bold',
                                opacity: 1,
                                position: 'top',
                            },
                        },
                    ],
                },
                {
                    name: 'target',
                    type: 'bar',
                    barWidth: 35,
                    itemStyle: {
                        normal: {
                            opacity: 0.3,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'blue',
                            fontSize: 10,
                        },
                        formatter: function (p) {
                            return (p.value / 1000000).toFixed(2) + 'M'
                        },
                    },
                    data: [
                        {
                            value: 1354705,
                            itemStyle: {
                                color: '#FF2945',
                            },
                        },
                        {
                            value: 720595,
                            itemStyle: {
                                color: 'gray',
                            },
                        },
                        {
                            value: 316220,
                            itemStyle: {
                                color: 'green',
                            },
                        },
                        {
                            value: 26638,
                            itemStyle: {
                                color: '#FF801F',
                            },
                        },
                        {
                            value: 2613199,
                            itemStyle: {
                                color: '#1A81FF',
                            },
                        },
                        {
                            value: 95664,
                            itemStyle: {
                                color: '#FFD633',
                            },
                        },
                        {
                            value: 1930427,
                            itemStyle: {
                                color: '#00B39E',
                            },
                        },
                        {
                            value: 2431578,
                            itemStyle: {
                                color: '#D26900',
                            },
                        },
                    ],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCustomerRanking = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            legend: {
                data: ['利润', '支出', '收入'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'value',
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
            ],
            series: [
                {
                    name: '利润',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside',
                    },
                    data: [200, 170, 240, 244, 200, 220, 210],
                },
                {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                    },
                    data: [320, 302, 341, 374, 390, 450, 420],
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'left',
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCaerb = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            grid: {
                bottom: 20,
            },
            legend: {
                data: ['蒸发量', '降水量', '平均温度'],
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow',
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml',
                    },
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C',
                    },
                },
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCopq = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [320, 332, 301, 334, 390, 330, 320],
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '广告',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '广告',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '广告',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    emphasis: {
                        focus: 'series',
                    },
                    markLine: {
                        lineStyle: {
                            type: 'dashed',
                        },
                        data: [[{ type: 'min' }, { type: 'max' }]],
                    },
                },
                {
                    name: '百度',
                    type: 'bar',
                    barWidth: 5,
                    stack: '搜索引擎',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [620, 732, 701, 734, 1090, 1130, 1120],
                },
                {
                    name: '谷歌',
                    type: 'bar',
                    stack: '搜索引擎',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [120, 132, 101, 134, 290, 230, 220],
                },
                {
                    name: '必应',
                    type: 'bar',
                    stack: '搜索引擎',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [60, 72, 71, 74, 190, 130, 110],
                },
                {
                    name: '其他',
                    type: 'bar',
                    stack: '搜索引擎',
                    emphasis: {
                        focus: 'series',
                    },
                    data: [62, 82, 91, 84, 109, 110, 120],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartVlrr = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            legend: {
                data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [320, 302, 301, 334, 390, 330, 320],
                },
                {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [150, 212, 201, 154, 190, 330, 410],
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCustomerClaim = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            legend: {
                data: ['蒸发量', '降水量'],
            },
            grid: {
                bottom: 20,
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' },
                        ],
                    },
                    markLine: {
                        data: [{ type: 'average', name: '平均值' }],
                    },
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 },
                        ],
                    },
                    markLine: {
                        data: [{ type: 'average', name: '平均值' }],
                    },
                },
            ],
        }
        myChart.setOption(option)
    }

    /* render */
    paintChartSortingRate(sortingRateChart)
    paintChartCustomerRanking(customerRankingChart)
    paintChartCaerb(caerbChart)
    paintChartCopq(copqChart)
    paintChartVlrr(vlrrChart)
    paintChartCustomerClaim(customerClaimChart)
}
