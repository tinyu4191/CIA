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
            title: {
                text: '客戶排名',
            },
            legend: {
                data: ['Past', 'Current'],
            },
            grid: {
                top: '15%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                type: 'category',
                data: ['TV', 'Tablet', 'Monitor', 'IAVM', 'NB', 'CE', 'MP', 'AA'],
            },
            series: [
                {
                    name: 'Past',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    itemStyle: {
                        normal: {
                            color: '#003060',
                            barBorderColor: '#003060',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [6, 3, 6, 1, 1, 1, 2, 4],
                },
                {
                    name: 'Past1',
                    type: 'bar',
                    stack: 'total',
                    itemStyle: {
                        normal: {
                            color: '#ECF5FF',
                            barBorderColor: '#003060',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [3, 3, 1, 3, 2, 5, 1, 2],
                },
                {
                    name: 'Current',
                    type: 'bar',
                    stack: 'total1',
                    label: {
                        show: true,
                    },
                    itemStyle: {
                        normal: {
                            color: '#006030',
                            barBorderColor: '#006030',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [6, 4, 4, 2, 1, 2, 2, 3],
                },
                {
                    name: 'Current1',
                    type: 'bar',
                    stack: 'total1',
                    itemStyle: {
                        normal: {
                            color: '#E8FFF5',
                            barBorderColor: '#006030',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [3, 2, 3, 2, 2, 4, 1, 3],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCaerb = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            title: {
                text: 'CAERB',
            },
            grid: {
                top: '15%',
                bottom: '10%',
            },

            xAxis: [
                {
                    type: 'category',
                    data: ['APR', 'SEP', 'OCT', 'W41', 'W42', 'W43', 'W44', '03', '04', '05', '06', '07', '08', '09'],
                    axisPointer: {
                        type: 'shadow',
                    },
                    axisLine: { onZero: true },
                },
            ],
            yAxis: [
                {
                    margin: -300,
                    type: 'value',
                    min: 0,
                    max: 25,
                    interval: 5,
                },
                {
                    type: 'value',
                    splitLine: { show: false },
                    min: -15,
                    max: 15,
                    interval: 5,
                },
            ],
            series: [
                {
                    name: '紅',
                    type: 'bar',
                    stack: 'one',
                    color: 'red',
                    yAxisIndex: 1,
                    data: [7, 10, 6, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
                },
                {
                    name: '綠',
                    type: 'bar',
                    stack: 'one',
                    color: 'green',
                    yAxisIndex: 1,
                    data: [-7, -7, -7, -0, -0, -0, -1, -0, -0, -1, -0, -0, -0, -0],
                },
                {
                    name: '藍',
                    type: 'line',
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'blue',
                            fontSize: 15,
                        },
                    },
                    data: [7, 10, 9, 8, 8, 9, 8, 8, 9, 9, 9, 9, 9, 9],

                    markLine: {
                        lineStyle: {
                            color: 'red',
                        },
                        data: [{ name: '报警预测值', yAxis: 12 }],
                        symbol: [''],
                    },
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCopq = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            title: {
                text: 'CoPQ/m2',
            },
            legend: {
                x: 'right',
                data: ['R6 m2 CoPQ', 'CoPQ SUM USD'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '0%',
                top: '15%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'value',
                    show: false,
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: true,
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 10,
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 0.5,
                            color: ['white'],
                        },
                    },
                    data: ['AA', 'AUTO', 'NB', 'IAVM', 'MNT', 'TABLET', 'MP', 'CE', 'TV', 'TV (SET)'],
                },
            ],
            series: [
                {
                    name: 'CoPQ SUM USD',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'right',
                    },
                    data: [
                        '3368983',
                        '73256',
                        '316412',
                        '112474',
                        '273151',
                        '75428',
                        '90138',
                        '28308',
                        '792832',
                        '371924',
                    ],
                },
                {
                    name: 'R6 m2 CoPQ',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'left',
                        formatter: function (p) {
                            return (p.value / 100000) * -1
                        },
                    },
                    data: [
                        -16185800, -1022660, -107242, -240016, -98580.8, -63819, -75500.8, -33469.1, -61105, -245444,
                    ],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartVlrr = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            title: {
                text: 'VLRR達標率',
            },
            legend: {
                show: true,
                data: ['達標', '未達標'],
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
                    data: ['TV', 'Tablet', 'Monitor', 'IAVM', 'NB', 'CE', 'MP'],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: '達標',
                    type: 'bar',
                    stack: 'Past',
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#1A81FF',
                            barBorderColor: '#1A81FF',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [0, 6, 0, 3, 2, 8, 1, 4],
                },
                {
                    name: '未達標',
                    type: 'bar',
                    stack: 'Past',
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#ECF5FF',
                            barBorderColor: '#1A81FF',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [0, 0, 0, 0, 0, 1, 0, 1],
                },
                {
                    name: '達標1',
                    type: 'bar',
                    stack: 'Current',
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#003060',
                            barBorderColor: '#003060',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [0, 6, 0, 3, 1, 7, 2, 5],
                },
                {
                    name: '未達標1',
                    type: 'bar',
                    stack: 'Current',
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#E8FFF5',
                            barBorderColor: '#003060',
                            barBorderRadius: 0,
                            barBorderWidth: 1,
                        },
                    },
                    data: [0, 1, 0, 0, 0, 1, 0, 0],
                },
            ],
        }
        myChart.setOption(option)
    }
    const paintChartCustomerClaim = (dom, data) => {
        const myChart = echarts.init(dom)
        let option = {
            title: {
                text: '客責吸收',
            },
            grid: {
                top: '10%',
                left: '0%',
                bottom: '10%',
                right: '5%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    interval: 0,
                },
                data: ['TV', 'MD', 'Monitor', 'IAVM', 'NB', 'AA', 'X社'],
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
                        show: true,
                        position: 'inside',
                        textStyle: {
                            color: 'black',
                            fontSize: 10,
                        },
                        formatter: function (p) {
                            return p.value + 'dppm'
                        },
                    },
                    data: [
                        {
                            value: '4.7',
                            itemStyle: {
                                color: '#FF2945',
                            },
                        },
                        {
                            value: '210.2',
                            itemStyle: {
                                color: 'gray',
                            },
                        },
                        {
                            value: '7.0',
                            itemStyle: {
                                color: 'green',
                            },
                        },
                        {
                            value: '0.0',
                            itemStyle: {
                                color: '#FF801F',
                            },
                        },
                        {
                            value: '21.6',
                            itemStyle: {
                                color: '#1A81FF',
                            },
                        },
                        {
                            value: '0.0',
                            itemStyle: {
                                color: '#FFD633',
                            },
                        },
                        {
                            value: '353.2',
                            itemStyle: {
                                color: '#00B39E',
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
                            return p.value + 'dppm'
                        },
                    },
                    data: [
                        {
                            value: '30',
                            itemStyle: {
                                color: '#FF2945',
                            },
                        },
                        {
                            value: '330',
                            itemStyle: {
                                color: 'gray',
                            },
                        },
                        {
                            value: '40',
                            itemStyle: {
                                color: 'green',
                            },
                        },
                        {
                            value: '10',
                            itemStyle: {
                                color: '#FF801F',
                            },
                        },
                        {
                            value: '110',
                            itemStyle: {
                                color: '#1A81FF',
                            },
                        },
                        {
                            value: '30',
                            itemStyle: {
                                color: '#FFD633',
                            },
                        },
                        {
                            value: '450',
                            itemStyle: {
                                color: '#00B39E',
                            },
                        },
                    ],
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
