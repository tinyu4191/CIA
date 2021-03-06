/*處級專用元件*/
var urlRoot = "http://tnvqis03/JSONSERVICE_TEST/jsonQuery.do";
var themeOriginal;

function drawDataTablesExtendMQ(buttonsArrray, buttonsStyle) {
    /*
    drawDataTablesSTD('estimateMain','estimateButtons',buttonsArrray,buttonsStyle);
    */
}

function paintEchartExtendDQ(theme) {
    themeOriginal = theme;

    printEventStackBarChartHrzt('EventStackBar', theme)
    //calendar();	
}

function printEventStackBarChartHrzt(elementId, theme) {
	var legendDataArray = ["已過期", "當期", "未過期"];
	if ($('#' + elementId)) {
		$.ajax({
			url: 'http://sealsys.cminl.oa/hisqe/sqeData/loadAERBEvent',
			contentType: false,
			dataType: "json",
			type: 'GET',
			async: false,
			success: function(result){
				if(result != null){
					let caerb = result.filter(function(value) {
						return value.eventType === "CAERB";
					});
					let maerb = result.filter(function(value) {
						return value.eventType === "MAERB";
					});
					let xAxisDataArray = ['CAERB', "MAERB", "IMP"];
					let seriesDataArray = [[caerb.length, maerb.length, caerb.length]]
					paintStackBarChartHrzt(elementId,theme, "P", 0, 0, legendDataArray, xAxisDataArray, seriesDataArray, null, null);
				}
			},
			error: function (error){
				console.log(error)
			},
		})
	}
}

//課級主管 已開應開MCR
function MCR() {
 var myChart = echarts.init(document.getElementById('MCRChart'));

	var option = {
    xAxis: {    show : false,             

    },
    yAxis: {
        show : false,
        axisLine:{ //y轴
    	    show:false
        },
        data: ['a'],
        splitLine: {show: false}
    },
    animationDurationUpdate: 1200,
    series: [{
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#ddd'
            }
        },
        silent: true,
        barGap: '-95%', // Make series be overlap, bar之間距離
                label: {formatter: "應開"+"{c}",
                show: true,
                position: 'bottom',
            textStyle:{
			fontSize:16,
			color:'#000000'
		}
            },
         barWidth: 200,
        data: [5]
    }, {
        type: 'bar',
        z: 10,
                label: {formatter: "未開"+"{c}",
                show: true,
                position: 'right',
                textStyle:{
			fontSize:13,
			color:'	#000000'
		}
     },
       itemStyle:{  
                     normal:{  
                       color:'#9BBB59',  
                       }  
                },  
        barWidth: 20,
        data: [1]
    },]
};
myChart.setOption(option);
}
        
        
//新產品控管
function NewProduct() {
 var myChart = echarts.init(document.getElementById('NewProductchart'));
	var option = {
	tooltip:{
		trigger:'axis',		//lable显示所有数据
                textStyle:{
		    fontSize: '10',		//字体大小
		    fontWeight: 'bolder'		//字体加粗
		}
	},
            legend: {
                //selectedMode:false,
                data:['已結案','處理中','未處理'],
                left:'15%',  // 標籤顯示位置
                textStyle: { //图例文字的样式
                            fontSize: 11
                        },
            },
             grid: {
    left: "20%",top: "14%",bottom: "15%",right: "10%" // 圖顯示位置
  },
            yAxis: {
                data: ["IMP","MAIM","MAERB","CAERB"]
            },
            xAxis: {
        },
            series: [
                {
                name: '已結案',
                type: 'bar',
                stack:'DATA',
                itemStyle:{  
                     normal:{  
                       color:'#9BBB59',  
                       }  
                },  
                   label: {
                        show: true,
                        position: 'inside',
                        color:'#000000',
                        textStyle:{
		                fontSize: '15',		//字体大小
		                fontWeight: 'bolder'		//字体加粗
		                },
		                formatter: function(params) {
 	                    if (params.value > 0) {
		                   return params.value;
	                    } else {
		                return ' ';
	                     }
                        },		                
                    },
                data: [5, 2, 2,1]
            },
            {
                name: '處理中',
                type: 'bar',
                stack:'DATA',
                itemStyle:{  
                     normal:{  
                       color:'#FFC000',  
                       }  
                },  
                label: {
                        show: true,
                        position: 'inside',
                        color:'#000000', 
                        textStyle:{
		                fontSize: '15',		//字体大小
		                fontWeight: 'bolder'		//字体加粗
		                },
		                formatter: function(params) {
 	                    if (params.value > 0) {
		                   return params.value;
	                    } else {
		                return ' ';
	                     }
                        },		                
                    },
                data: [1, 2,5, 2]
               
            },
            {
                name: '未處理',
                type: 'bar',
                stack:'DATA',
                itemStyle:{  
                     normal:{  
                       color:'#FF0000',  
                       }  
                },  
                label: {
                        show: true,
                        position: 'inside',
                        color:'#FFFFFF', 
                        textStyle:{
		                fontSize: '15',		//字体大小
		                fontWeight: 'bolder'		//字体加粗
		                },
		                //數字0不回傳
		                formatter: function(params) { 
 	                    if (params.value > 0) {
		                   return params.value;
	                    } else {
		                return ' ';
	                     }
                        },
                    },
                data: [1,3, 2, 0]
            },
            ]
        };  
        myChart.setOption(option);
}

//處級主管 2020損失統計_1
function losschart1() {
 var myChart = echarts.init(document.getElementById('losschart1'));
 	var option = {
    //tooltip: {       },

    xAxis: {    //show : false,             
    max: 100,
    type: "value",
    splitNumber: 2,
    axisLabel:{
			interval:0,
			textStyle:{
				fontSize: '10',		//字体大小
				fontWeight: 'bolder'		//字体加粗
			}
		},
    },
    yAxis: {
        show : false,
        axisLine:{ //y轴
    	    show:false
        },
        data: ['a'],
        splitLine: {show: false}
    },
                 grid: {
    left: "10%",top: "14%",bottom: "30%",right: "10%" // 圖顯示位置
  },
    animationDurationUpdate: 1200,
    series: [{
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#ddd',
                barBorderRadius:[30, 30, 30, 30],
            }
        },
        silent: true,
        barGap: '-100%', // Make series be overlap, bar之間距離
                label: {//formatter: "應開"+"{c}",
                show: false,
                position: 'right',
            textStyle:{
			fontSize:5,
			color:'#000000'
		}
            },
         barWidth: 100,
        data: [100]
    }, {
        type: 'bar',
        z: 10,
                label: {//formatter: "已開"+"{c}",
                show: true,
                position: 'right',
                textStyle:{
			fontSize:20,
			fontWeight: 'bolder',
			color:'	#000000'
		}
     },
       itemStyle:{  
                     normal:{  
                   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#930000' //深色
                    }, {
         offset: 0.4, color: '	#CE0000' // 100% 处的颜色
     }, {
                        offset: 1,
                        color: '#FF7575' //淺色
                    }]),
                       barBorderRadius:[30, 30, 30, 30],//bar 有圓角  
                       }  
                },  
        barWidth: 100,
        data: [5000/100]
    },]
};
myChart.setOption(option);
}    
    
//處級主管 2020損失統計_2
function losschart2() {
 var myChart = echarts.init(document.getElementById('losschart2'));
	var option = {
    tooltip: {
    	  //trigger: 'axis',
        //extraCssText: 'white-space: normal; word-break: break-all; z-index :9999;',
        extraCssText: 'z-index: 9',
				//axisPointer: { type: 'cross'},
				confine:true,        
        textStyle : {
            color: 'black',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 5,
            //fontStyle: 'italic',
            fontWeight: 'bold'
        },
        //enterable :true,//鼠标可以移入tooltip里
				formatter(params) {
        	
        return `
        				<div class="x_content"> 
                <table style="border:3px #cccccc solid;width: 500px; height: 100px;z-index:9999;position: relative;" cellpadding="10" border="1">
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                <tr><td>直接访问</td><td>所需天数</td><td>所需天数</td><td>所需天数</td></tr>
                </table>
                </div>

               `; },
               		position: function(point, params, dom, rect, size){
                	let chartid="losschart2";//圖表id
                	let paddingscreenleft = $('#'+losschart2).offset().left;//距離瀏覽器左側位置
									let paddingscreentop = $('#'+losschart2).offset().top;//距離瀏覽器左側位置
									$(dom).css("position","fixed");//設置position屬性為fix
									$(dom).html('<div>'+ formatter(params) +'</div>');//dom節點顯示html
									//滑鼠位置+圖距離左側+5
									//console.log("paddingScreenleft:"+paddingscreenleft);
									return [point[0]+ paddingscreenleft + 5, point[1]+ paddingscreentop];
 									}, },
    xAxis: {    //show : false,             
    max: 100,
    type: "value",
    splitNumber: 2,
    axisLabel:{
			interval:0,
			textStyle:{
				fontSize: '10',		//字体大小
				fontWeight: 'bolder'		//字体加粗
			}
		},
    },
    yAxis: {
        show : false,
        axisLine:{ //y轴
    	    show:false
        },
        data: ['a'],
        splitLine: {show: false}
    },
                 grid: {
    left: "10%",top: "14%",bottom: "30%",right: "10%" // 圖顯示位置
  },
    animationDurationUpdate: 1200,
    series: [{
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#ddd',
                barBorderRadius:[30, 30, 30, 30],
            }
        },
        silent: true,
        barGap: '-100%', // Make series be overlap, bar之間距離
                label: {//formatter: "應開"+"{c}",
                show: false,
                position: 'right',
            textStyle:{
			fontSize:5,
			color:'#000000'
		}
            },
         barWidth: 90,
        data: [100]
    }, {
        type: 'bar',
        z: 10,
                label: {//formatter: "已開"+"{c}",
                show: true,
                position: 'right',
                textStyle:{
			fontSize:20,
			fontWeight: 'bolder',
			color:'	#000000'
		}
     },
       itemStyle:{  
                     normal:{  
                   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                   color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{ 
                        offset: 0,
                        color: '#CA0000' //深色
                    }, {
                        offset: 1,
                        color: '#FF7575' //淺色
                    }]),
                       barBorderRadius:[30, 30, 30, 30],//bar 有圓角  
                       }  
                },  
        barWidth: 90,
        data: [30]
    },]
};
myChart.setOption(option);
}   

//處級主管 CAERB年度耗損率
function caerbannualloss() {
var myChart = echarts.init(document.getElementById('caerbannualloss')); 
var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
              },
               grid: {
        x: 100,
        y: 60,
        x2: 0,
        y2: 60,
        // width: {totalWidth} - x - x2,
        // height: {totalHeight} - y - y2,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: '#ccc'
    },
               color:['#0080FF','#ddd',],
            series: [
                {
                    name:'',
                    type: 'pie',
                    center: ['50%', '50%'], // 饼图的圆心坐标
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: { //  饼图图形上的文本标签
                         normal: { // normal 是图形在默认状态下的样式
                            show: true,
                            position: 'center',
                            color: '#66B3FF',
                            fontSize: 30,
                            fontWeight: 'bold',
                            //formatter: '{d}%\n{b}' // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                            formatter:function(data){ //設定百分比小數點
              console.log(data)
              return data.seriesName +  data.name+data.percent.toFixed(0)+"%";
                                  }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                                            {
                            value: 26,
                            name: "",
                            label: {
                                normal: {
                                    show: true
                                }
                            }
                        },{
                            value: 24.5,
                            name: '正常',
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        },]
                }
            ]
        };
myChart.setOption(option);
}

//處級主管 異常統計CAERB
function abnormalcunt_aerb() {
var myChart = echarts.init(document.getElementById('abnormalcunt_aerb')); 
var option = {
	            grid: {
    left: "15%",top: "20%",bottom: "15%",right: "0%" // 圖顯示位置
  },
    xAxis: {
        type: 'category',
        data: ['W48', 'W49', 'W50', 'W51'],
                          axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'1'//y軸座標線的寬度
                       }
                   },
                                      axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'13'
                       }
                   },  
    },
    yAxis: {
        type: 'value',
                                   splitLine:{show: false},//去除x軸網格線
                   splitArea : {show : false},//去掉網格區域
                  axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'0'//y軸座標線的寬度
                       }
                   },
                   axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'15'
                       }
                   },  
            min: 40,
            max: 50,
            interval: 10,
    },
				//設定超過多少, 會變顏色
				visualMap: {
				show: false,
				type: 'piecewise',
				//seriesIndex:1,//控制series 对应的区域
				pieces: [{
				gt: 42,//設定折線點超過
				color: 'red',
				lineStyle:{
					color:'red'
				}
				}, {
				gt: 0,//設定另一個區間
				lte: 42,
				color: '#0080FF'
				}]	},
    series: [{
        				            itemStyle : {
        				            	normal : {                    
label: {  
                        show: true,  
                        position: 'top',  
                        formatter: '{c}',
                            color: "black",
                        fontSize:13,
                        //formatter: '{c}%' 
                    }  ,
								   						//color:'#0080FF', //改变折线点的颜色
															//lineStyle:{															color:'#0080FF'									}
								//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

								}
							},
		 grid: {  //設置圖標距離上下左右的距離 top一般默認
                   left: '2%',
                   right: '4%',
                   bottom: '3%',
                   containLabel: true
               },		            
        areaStyle: {
        	color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
      offset: 0, color: '#0066CC' // 0% 处的颜色
     }, {
         offset: 0.4, color: '#66B3FF' // 100% 处的颜色
     }, {
         offset: 1, color: '#fff' // 100% 处的颜色
     }]
 ), //背景渐变色 
        	},
        data: [42, 41, 45, 43,],
        type: 'line',
        symbol: 'circle',     //设定为实心点 
        symbolSize: 10,   //设定实心点的大小
        //显示一定区域内的最大值和最小值
        //markPoint: {  data: [  { type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]}
    }]
};
myChart.setOption(option);
}

//處級主管 異常統計MAERB
function abnormalcunt_maerb() {
var myChart = echarts.init(document.getElementById('abnormalcunt_maerb')); 
var option = {
	            grid: {
    left: "15%",top: "20%",bottom: "15%",right: "0%" // 圖顯示位置
  },
    xAxis: {
        type: 'category',
        data: ['W48', 'W49', 'W50', 'W51'],
                          axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'1'//y軸座標線的寬度
                       }
                   },
                                      axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'13'
                       }
                   },  
    },
    yAxis: {
        type: 'value',
                                   splitLine:{show: false},//去除x軸網格線
                   splitArea : {show : false},//去掉網格區域
                  axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'0'//y軸座標線的寬度
                       }
                   },
                   axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'15'
                       }
                   },  
            min: 40,
            max: 50,
            interval: 10,
    },
    series: [{
        				            itemStyle : {
        				            	normal : {
        				            							label: {  
                        show: true,  
                        position: 'top',  
                        formatter: '{c}',
                            color: "black",
                        fontSize:13,
                        //formatter: '{c}%' 
                    }  ,
								   						color:'#0080FF', //改变折线点的颜色
															lineStyle:{
															color:'#0080FF'
									}
								}
							},
		 grid: {  //設置圖標距離上下左右的距離 top一般默認
                   left: '2%',
                   right: '4%',
                   bottom: '3%',
                   containLabel: true
               },		            
        data: [42, 41, 45, 43,],
        type: 'line',
        symbol: 'circle',     //设定为实心点 
        symbolSize: 10,   //设定实心点的大小
        //显示一定区域内的最大值和最小值
        //markPoint: {  data: [  { type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]}
    }]
};
myChart.setOption(option);
}

//處級主管 異常統計DOA
function abnormalcunt_doa() {
var myChart = echarts.init(document.getElementById('abnormalcunt_doa')); 
var option = {
	            grid: {
    left: "15%",top: "20%",bottom: "15%",right: "0%" // 圖顯示位置
  },
    xAxis: {
        type: 'category',
        data: ['W48', 'W49', 'W50', 'W51'],
                          axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'1'//y軸座標線的寬度
                       }
                   },
                                      axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'13'
                       }
                   },  
    },
    yAxis: {
        type: 'value',
              splitLine:{show: false},//去除x軸網格線
                   splitArea : {show : false},//去掉網格區域
                  axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'0'//y軸座標線的寬度
                       }
                   },
                   axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'15'
                       },
                        formatter: '{value} %'
                   },  
            min: 0,
            max: 30,
            interval: 30,
    },
    series: [{
         itemStyle : {
								normal : {
					label: {  
                        show: true,  
                        position: 'top',  
                        formatter: '{c}%',
                            color: "black",
                        fontSize:13,
                        //formatter: '{b}\n{c}%' 
                    }  ,
								    color:'#0080FF', //改变折线点的颜色
									lineStyle:{
										color:'#0080FF'
									},
									
								},
							},
							
		 grid: {  //設置圖標距離上下左右的距離 top一般默認
                   left: '2%',
                   right: '4%',
                   bottom: '3%',
                   containLabel: true
               },		  		            
        areaStyle: {
        	color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
      offset: 0, color: '#0066CC' // 0% 处的颜色
     }, {
         offset: 0.4, color: '#66B3FF' // 100% 处的颜色
     }, {
         offset: 1, color: '#fff' // 100% 处的颜色
     }]
 ), //背景渐变色 
        	},          
        data: [10, 15, 20, 13,],
        type: 'line',
        symbol: 'circle',     //设定为实心点 
        symbolSize: 10,   //设定实心点的大小
        //显示一定区域内的最大值和最小值
        //markPoint: {  data: [  { type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]}
    }]
};
myChart.setOption(option);
}
//處級主管 異常統計SVLRR
function abnormalcunt_svlrr() {
var myChart = echarts.init(document.getElementById('abnormalcunt_svlrr')); 
var option = {
	            grid: {
    left: "15%",top: "20%",bottom: "15%",right: "0%" // 圖顯示位置
  },
    xAxis: {
        type: 'category',
        data: ['W48', 'W49', 'W50', 'W51'],
                          axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'1'//y軸座標線的寬度
                       }
                   },
                                      axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'13'
                       }
                   },  
    },
    yAxis: {
        type: 'value',
              splitLine:{show: false},//去除x軸網格線
                   splitArea : {show : false},//去掉網格區域
                  axisLine: {  //設置y軸座標線的樣式
                       lineStyle: {
                           type: 'solid',
                           color: '#161616',//y軸座標線的顏色
                           width:'0'//y軸座標線的寬度
                       }
                   },
                   axisLabel: {  //x軸刻度數值顏色
                       //rotate: 10, //旋轉x軸的文字
                       interval:0, //x軸每個項的距離  修改數據顯示的個數
                       textStyle: {
                           color: '#1b1b1b',
                           fontSize:'15'
                       },
                        formatter: '{value} %'
                   },  
            min: 0,
            max: 30,
            interval: 30,
    },
    series: [{
         itemStyle : {
								normal : {
					label: {  
                        show: true,  
                        position: 'top',  
                        formatter: '{c}%',
                            color: "black",
                        fontSize:13,
                        //formatter: '{b}\n{c}%' 
                    }  ,
								    color:'#0080FF', //改变折线点的颜色
									lineStyle:{
										color:'#0080FF'
									},
									
								},
							},
		 grid: {  //設置圖標距離上下左右的距離 top一般默認
                   left: '2%',
                   right: '4%',
                   bottom: '3%',
                   containLabel: true
               },		    
                       areaStyle: {
        	color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
      offset: 0, color: '#0066CC' // 0% 处的颜色
     }, {
         offset: 0.4, color: '#66B3FF' // 100% 处的颜色
     }, {
         offset: 1, color: '#fff' // 100% 处的颜色
     }]
 ), //背景渐变色 
        	},          
        data: [10, 15, 20, 13,],
        type: 'line',
        symbol: 'circle',     //设定为实心点 
        symbolSize: 10,   //设定实心点的大小
        //显示一定区域内的最大值和最小值
        //markPoint: {  data: [  { type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]}
    }]
};
myChart.setOption(option);
}
           
//異常統計2
function abnormal2() {    
	 var myChart = echarts.init(document.getElementById('abnormal2'));    
    var abnormal={
        'SVLRR未達成':'#FF5151',
        'DOA未達成':'#FF9797',
        'WAFFER-馬鞍山':'#2828FF',
        '旭成-上海':'#9D9D9D',
        '鴻海-蘇州':'#2828FF'
    }
    var population=[
        {source: "SVLRR未達成", target: "WAFFER-馬鞍山", value: 10},
        {source: "SVLRR未達成", target: "旭成-上海", value: 2},
        {source: "SVLRR未達成", target: "鴻海-蘇州", value: 4},
        {source: "DOA未達成", target: "WAFFER-馬鞍山", value: 1},
        {source: "DOA未達成", target: "旭成-上", value: 7},
        {source: "DOA未達成", target: "鴻海-蘇州", value: 3}];
    var data=[];
    var abnormallist=[];
    for(var key in abnormal){
        abnormallist.push(
            {name: key,itemStyle: {color:abnormal[key]}}
        )
    }
    for(var i=0;i<population.length;i++){
        var color=new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: abnormal[population[i].source]
            },{
                offset: 1,
                color: abnormal[population[i].target]
            }]
        )
        data.push(
            {source: population[i].source,
            target: population[i].target,
            value: population[i].value,
                lineStyle: {
                color:color
                }
            }
        )
    }
        
    option = {
        title: {
            //text: '桑基图之城市移民人口统计',
            //subtext: 'By 佯佯DESIGNER',
            top: 'top',
            left: '35%'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'sankey',
                data: abnormallist,
                links: data,
                focusNodeAdjacency: 'allEdges',//鼠标悬停到节点或边上，相邻接的节点和边高亮显示
                itemStyle: {
                    borderWidth: 1,
                    color:'#1b6199',
                    borderColor: '#fff'
                },
                lineStyle: {
                    curveness: 0.5,
                    opacity:0.5
                },
                label: {
                    position: "inside"
                },
                nodeWidth: 100
            }
        ]
    };
            myChart.setOption(option);
}


//日曆-工程師
function calendar() {    
	 var myChart = echarts.init(document.getElementById('calendar'));    
var dateList = [
    ['2020-12-1', ''],
    ['2020-12-2', ''],
    ['2020-12-3', ''],
    ['2020-12-4', ''],
    ['2020-12-5', ''],
    ['2020-12-6', ''],
    ['2020-12-7', '', ],
    //  ['2020-12-7', '', 'CAERB'],
    ['2020-12-8', ''],
    ['2020-12-9', ''],
    ['2020-12-10', ''],
    ['2020-12-11', ''],
    ['2020-12-12', ''],
    ['2020-12-13', ''],
    ['2020-12-14', ''],
    ['2020-12-15', ''],
    ['2020-12-16', ''],
    ['2020-12-17', ''],
    ['2020-12-18', ''],
    ['2020-12-19', ''],
    ['2020-12-20', ''],
    ['2020-12-21', ''],
    ['2020-12-22', '', 'MAERB'],
    ['2020-12-23', ''],
    ['2020-12-24', ''],
    ['2020-12-25', ''],
    ['2020-12-26', ''],
    ['2020-12-27', ''],
    ['2020-12-28', ''],
    ['2020-12-29', ''],
    ['2020-12-30', ''],
    ['2020-12-31', ''],
    ['2021-1-1', ''],
    ['2021-1-2', ''],
    ['2021-1-3', ''],
    ['2021-1-4', ''],
    ['2021-1-5', ''],
    ['2021-1-6', ''],
    ['2021-1-7', ''],
    ['2021-1-8', ''],
    ['2021-1-9', ''],
    ['2021-1-10', ''],
    ['2021-1-11', ''],
    ['2021-1-12', ''],
    ['2021-1-13', ''],
    ['2021-1-14', '',],
    ['2021-1-15', ''],
    ['2021-1-16', ''],
    ['2021-1-17', ''],
    ['2021-1-18', '',],
    ['2021-1-19', ''],
    ['2021-1-20', ''],
    ['2021-1-21', ''],
    ['2021-1-22', ''],
    ['2021-1-23', ''],
    ['2021-1-24', ''],
    ['2021-1-25', ''],
    ['2021-1-26', '','','●'],
    ['2021-1-27', ''],
    ['2021-1-28', '',],
    ['2021-1-29', '',,],
    //['2021-1-29', '','▲',],
    ['2021-1-30', ''],
    ['2021-1-31', ''],
];

var heatmapData = [];
var lunarData = [];
for (var i = 0; i < dateList.length; i++) {
    lunarData.push([
        dateList[i][0],
        1,
        dateList[i][1],
        dateList[i][2],
        dateList[i][3],
    ]);
}


option = {
    tooltip: {
        formatter: function (params) {
            //return '降雨量: ' + params.value[1].toFixed(2);
        }
    },

    visualMap: {
        show: false,
        min: 0,
        max: 300,
        calculable: true,
        seriesIndex: [2],
        orient: 'horizontal',
        left: 'center',
        bottom: 20,
        inRange: {
            color: ['#e0ffff'],
            opacity: 0.3
        },
        controller: {
            inRange: {
                opacity: 0.5
            }
        }
    },
    calendar: [{
        //left: 'center',
        //top: 'middle',
        top:"20%",left:'center',orient:'vertical',
        cellSize: [20, 20], //日曆單格大小
        yearLabel: {show: false},
        orient: 'vertical',
        dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
        },
        monthLabel: {
            show: false
        },
        range: '2021-1',
              itemStyle: {
      borderWidth: 0.5,// 日曆內框線
      color: '#FFFFFF', // 日曆內顏色
    },
    }],

    series: [
        {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            offset:[0,20],//日期文字位置
            formatter: function (params) {
                var d = echarts.number.parseDate(params.value[0]);
                return d.getDate() + '\n\n' + params.value[2] + '\n\n';
            },
            color: '#000',
            "fontSize":10
        },
        data: lunarData
    }, {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            formatter: function (params) {
                return '\n\n\n' + (params.value[3] || '');
            },
            fontSize: 20,//日曆內容字體大小
            offset:[0,-25],
            fontWeight: 700,
            color: '#FF0000'
        },
        data: lunarData
    }, {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            formatter: function (params) {
                return '\n\n\n' + (params.value[4] || '');
            },
            fontSize: 20,//日曆內容字體大小
            offset:[0,-25],
            fontWeight: 700,
            color: '#F9F900'
        },
        data: lunarData
    }],
        textStyle: {
        fontSize: 10//星期的字體大小
    },
        backgroundColor: '#ECF5FF'
};
            myChart.setOption(option);
}

//日曆-課長
function calendar_sec() {    
	 var myChart = echarts.init(document.getElementById('calendar_sec'));    
var dateList = [
    ['2020-12-1', ''],
    ['2020-12-2', ''],
    ['2020-12-3', ''],
    ['2020-12-4', ''],
    ['2020-12-5', ''],
    ['2020-12-6', ''],
    ['2020-12-7', '', ],
    //  ['2020-12-7', '', 'CAERB'],
    ['2020-12-8', ''],
    ['2020-12-9', ''],
    ['2020-12-10', ''],
    ['2020-12-11', ''],
    ['2020-12-12', ''],
    ['2020-12-13', ''],
    ['2020-12-14', ''],
    ['2020-12-15', ''],
    ['2020-12-16', ''],
    ['2020-12-17', ''],
    ['2020-12-18', ''],
    ['2020-12-19', ''],
    ['2020-12-20', ''],
    ['2020-12-21', ''],
    ['2020-12-22', '', 'MAERB'],
    ['2020-12-23', ''],
    ['2020-12-24', ''],
    ['2020-12-25', ''],
    ['2020-12-26', ''],
    ['2020-12-27', ''],
    ['2020-12-28', ''],
    ['2020-12-29', ''],
    ['2020-12-30', ''],
    ['2020-12-31', ''],
    ['2021-1-1', ''],
    ['2021-1-2', ''],
    ['2021-1-3', ''],
    ['2021-1-4', ''],
    ['2021-1-5', ''],
    ['2021-1-6', ''],
    ['2021-1-7', ''],
    ['2021-1-8', ''],
    ['2021-1-9', ''],
    ['2021-1-10', ''],
    ['2021-1-11', ''],
    ['2021-1-12', ''],
    ['2021-1-13', '','','●'],
    ['2021-1-14', ''],
    ['2021-1-15', '','','●'],
    ['2021-1-16', ''],
    ['2021-1-17', ''],
    ['2021-1-18', ''],
    ['2021-1-19', ''],
    ['2021-1-20', ''],
    ['2021-1-21', ''],
    ['2021-1-22', ''],
    ['2021-1-23', ''],
    ['2021-1-24', ''],
    ['2021-1-25', ''],
    ['2021-1-26', '','','●'],
    ['2021-1-27', ''],
    ['2021-1-28', '',''],
    ['2021-1-29', '',],
    ['2021-1-30', ''],
    ['2021-1-31', ''],
];

var heatmapData = [];
var lunarData = [];
for (var i = 0; i < dateList.length; i++) {
    lunarData.push([
        dateList[i][0],
        1,
        dateList[i][1],
        dateList[i][2],
        dateList[i][3],
    ]);
}


option = {
    tooltip: {
        formatter: function (params) {
            //return '降雨量: ' + params.value[1].toFixed(2);
        }
    },

    visualMap: {
        show: false,
        min: 0,
        max: 300,
        calculable: true,
        seriesIndex: [2],
        orient: 'horizontal',
        left: 'center',
        bottom: 20,
        inRange: {
            color: ['#e0ffff'],
            opacity: 0.3
        },
        controller: {
            inRange: {
                opacity: 0.5
            }
        }
    },
    calendar: [{
        //left: 'center',
        //top: 'middle',
        top:"20%",left:'center',orient:'vertical',
        cellSize: [20, 20], //日曆單格大小
        yearLabel: {show: false},
        orient: 'vertical',
        dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
        },
        monthLabel: {
            show: false
        },
        range: '2021-1',
              itemStyle: {
      borderWidth: 0.5,// 日曆內框線
      color: '#FFFFFF', // 日曆內顏色
    },
    }],

    series: [
        {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            offset:[0,20],//日期文字位置
            formatter: function (params) {
                var d = echarts.number.parseDate(params.value[0]);
                return d.getDate() + '\n\n' + params.value[2] + '\n\n';
            },
            color: '#000',
            "fontSize":10
        },
        data: lunarData
    }, {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            formatter: function (params) {
                return '\n\n\n' + (params.value[3] || '');
            },
            fontSize: 20,//日曆內容字體大小
            offset:[0,-25],
            fontWeight: 700,
            color: '#FF0000'
        },
        data: lunarData
    }, {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            formatter: function (params) {
                return '\n\n\n' + (params.value[4] || '');
            },
            fontSize: 20,//日曆內容字體大小
            offset:[0,-25],
            fontWeight: 700,
            color: '#F9F900'
        },
        data: lunarData
    }],
        textStyle: {
        fontSize: 10//星期的字體大小
    },
        backgroundColor: '#ECF5FF'
};
            myChart.setOption(option);
}