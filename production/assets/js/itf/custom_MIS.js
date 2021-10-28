/*全域變數*/
var colorGreen = 'rgba(95, 175, 95, 1.0)';  //綠色
var colorDeepGreen = 'rgba(0, 102, 102, 1.0)';  //深綠色
var colorLightGreen = 'rgba(0, 255, 0, 1.0)';  //深綠色
var colorYellow = 'rgba(255, 204, 102, 1.0)';//黃色
var colorRed ='rgba(230, 88, 85, 1)';   //紅色
var colorBlue ='rgba(21, 173, 255, 1)';   //藍色
var extendDQ = "1"; // 是否啟動DQ的延伸應用
var themeMIS ;
var charts = new Array();//裝載所有eChart 物件容器


function wakeUpModal(elementIdModal,funcNames, iDs, criterias){
	$('#'+ elementIdModal).modal();
	window[funcNames[0]](iDs[0], themeMIS  ,'D'); //呼叫實做function
	window[funcNames[1]](iDs[1], themeMIS  ,'D'); //呼叫實做function
	
}


function customToolTips(params,option){
	       //alert(params[0].axisValue);
           var result = '<table style="width:100%; " class="toolTips001"><tr ><td style=" color: rgba(0, 0, 0, 0.8);backgroundColor: rgba(255,255,255,0.8)">'+params[0].axisValue+'</td><td></td></tr>';
　　         for(i=0;i<params.length;i++){
	         if(option.legend.data.indexOf(params[i].seriesName)>-1 ) {
				    result+='<tr ><td style="font-size:10px; color: rgba(0, 0, 0, 0.8);backgroundColor: rgba(255,255,255,0.8)">'+params[i].marker+params[i].seriesName+'</td><td style="font-size:14px;text-align:right; color: rgba(0, 0, 0, 0.8);backgroundColor: rgba(255,255,255,0.8)"><b>&nbsp;&nbsp;&nbsp;'+params[i].data+'</b></td></tr>';
				 }else{	
				    result+='';			 
				 }　　           
　　         }
           result+='</table>';
　　        return result ;    

}


function paintLiquidFull(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX){
  var legendDataArray = ['負載率'];
  var xAxisDataArray = ['%'];
  var seriesDataArray = [0.6];
  var targetArray = [];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];
  
  var colorLiquid = colorGreen;

  if(seriesDataArray[0]<0.6)  colorLiquid = colorRed;
  
  var myObject = document.getElementById(elementId);
  var myChart;
  
  if (myObject)	{	
    myChart  = echarts.init(myObject);
    var option = {
    
    backgroundColor:'white',
    color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'], 
    series: [{
        type: 'liquidFill',
        name: legendDataArray[0],
        radius:'60%',
        //shape:"path://M18.98 5.7c-.24-2.36-2.24-4.2-4.66-4.2-1.95 0-3.6 1.18-4.32 2.87-.7-1.7-2.37-2.87-4.32-2.87-2.42 0-4.42 1.84-4.66 4.2L1 6.18c0 5.7 6.98 8.38 9 12.17 2.02-3.8 9-6.48 9-12.17 0-.16 0-.32-.02-.48z",
        data: seriesDataArray,  //datat
        
		outline: {
			width:'350',
			show: true,    //是否顯示外圈線
			borderDistance: 5,   //與外圈距離
			itemStyle: {
				color: 'none',
				borderColor: '#294D99',  //線的顏色，粗細，模糊程度，模糊顏色
				borderWidth:8,
				shadowBlur: 20,
				shadowColor: 'rgba(0, 0, 0, 0.01)'
			}
		},  
        backgroundStyle: {
            borderColor: '#294D99',
            //borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
            shadowBlur: 20
        },
        
        label:{

            normal:{
                position:['50%','50%'],
                formatter: function(){return legendDataArray[0]+'\n'+option.series[0].data[0]*100+xAxisDataArray[0] } ,
                textStyle:{
                    fontSize:30,
                    
                }
            }
        }
    }]
};
   
  myChart.setOption(option);
  myChart.resize();
  }
  return myChart;
}



function paintSankeyChartBasic(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX,lengendColorX){
  var rightItemColor = [];
  for(i=0;i<lengendColorX.length;i++){
	  rightItemColor.push(lengendColorX[i].toString());
	  }

  var legendDataArray = [];
  var xAxisDataArray = [];
  var seriesDataArray = {
  nodes:[{'name':'DAERB','itemStyle':{color:rightItemColor[0]}},{'name':'NPQM','itemStyle':{color:rightItemColor[2]}},{'name':'CRN','itemStyle':{color:rightItemColor[1]}},{'name':'TV'},{'name':'MONITOR'},{'name':'NB'}],
  links:[{'source':'TV','target':'DAERB',value:20},{'source':'TV','target':'NPQM',value:7},{'source':'TV','target':'CRN',value:6},
  {'source':'MONITOR','target':'DAERB',value:5},{'source':'MONITOR','target':'NPQM',value:12},{'source':'MONITOR','target':'CRN',value:8},
  {'source':'NB','target':'DAERB',value:4},{'source':'NB','target':'NPQM',value:2},{'source':'NB','target':'CRN',value:1}
  ]
  };
  var targetArray = [];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];
  
  
 

  var myObject = document.getElementById(elementId);
  var myChart;
  if (myObject)	{	
    myChart  = echarts.init(myObject, theme);
    //myChart  = echarts.init(myObject); 
	var option = {
			tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove',
				},
			series: {
				type: 'sankey',
				layout: 'none',
				focusNodeAdjacency: 'allEdges',
				data : seriesDataArray.nodes,
				itemStyle: {
							//color: ,
							curveness: 0.8,
						},
				label: {
								show: true,
								position: 'right',	
								textBorderWidth:0.01,			
								formatter:function(params){
									var len =option.series.links.length;
									var sum = 0;
									for(i=0;i<len;i++){
						              if (params.name == option.series.links[i].target) sum = sum + option.series.links[i].value;
						              if (params.name == option.series.links[i].source) sum = sum + option.series.links[i].value;
						            
						            }
						        
							        //return params.name+'\n'+sum+"件";
									return params.name+'/'+sum+"件";
								}
							},
				links: seriesDataArray.links,			
				lineStyle: {
							color: 'source',
							curveness: 0.5,
							opacity:1.0,
							
							
						},
				emphasis: {
						   lineStyle: {
							opacity: 1.0
						  }
				}
			}
		};

		myChart.setOption(option);
		
		
		  /*展現下一階*/  		
		 // if($('#'+elementId+'-001-myModal')){				  		
			myChart.on('click', function (params) {			
			    //callDrillDownHandler(elementId,theme,params.name, params.value,'paintRoundProgess')	;
			  });
		  
		  //}
		/*展現下一階*/ 
  }
  return myChart;
}

function paintStackBarChartHrzt(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX, lengendColorX){
  var legendDataArray = ['CRN不同意', 'DAERB', 'NPQM', ];
  var xAxisDataArray = ['TV', 'MONITOR', 'NB', 'AA', 'MP', 'CP', 'IAVM'];
  var seriesDataArray = [[320, 332, 301, 334, 390, 330, 320],[120, 132, 101, 134, 90, 230, 210],[220, 182, 191, 234, 290, 330, 310]];
  var targetArray = [300];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];

  var customColor;
  for(i=0;i<legendDataArray.length;i++){
	if(lengendColorX) {customColor=lengendColorX[i].toString(); }else{ customColor=''};  
    seriesArray.push(
	{ name: legendDataArray[i],
			type: 'bar',
			stack: 'ISSUE',
			emphasis: {
                focus: 'series'
            },
			color:customColor,
			data: seriesDataArray[i],
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'inside',						
						formatter:function(params){
							if(params.value>0) {
							   return params.seriesName+'\n'+params.value+"件";
							}else{
							  return '';
							} 
						}
					}
				}
			}
		});
  }//for
  
 
  
  var myObject = document.getElementById(elementId);
  var myChart;
  if (myObject)	{	
    myChart  = echarts.init(myObject, theme); 
	//myChart  = echarts.init(myObject); 
	var option = {
    tooltip: {
        trigger: 'axis',
		//trigger: 'item',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow',        // 'shadow' as default; can also be 'line' or 'shadow'
			
        },
		formatter: function(params) {
			//console.log(params);
            return customToolTips(params,option);
		}
    },
	legend: {
		data: legendDataArray,
	},
	grid: {
		left: '0%',
		right: '0%',
		bottom: '0%',
		containLabel: true
	},
	yAxis: [
		{
			type: 'category',
			data: xAxisDataArray,
			axisTick: {
                alignWithLabel: true
            }
		}
	],
	xAxis: [
		{
			type: 'value',
			axisTick: {
                alignWithLabel: true
            }
		}
	],
	series: seriesArray
	};
	 
	 /*畫目標線*/
	 if(targetArray[0]) addControlLine(option, '改善目標', targetArray[0], colorRed,'Hrzt');
		
	 /*置頂合計*/	
	 option.series.push(
	  {
		  name: '',
		  type: 'bar',
		  stack: 'ISSUE',
		  //data: getDynamicArray(option.xAxis[0].data.length),
		  data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  itemStyle: {
			  normal: {
				  label: {
					  show: true,
					  position: 'top',
					  formatter:function(params){
						  var sum = 0;
						  for (var i = 0, l = option.series.length; i < l; i++) {
						  sum += option.series[i].data[params.dataIndex]
						  }
						  return sum;
					  }
				  }
			  }
		  }
		  
	  }
	 );		
		
		/*第一次畫圖*/
		myChart.setOption(option);	

		
		/*動態置頂合計*/
		var series = option["series"];
        //legend點選事件，根據傳過來的obj.selected得到狀態是true的legend對應的series的下標，再去計算總和
        myChart.on("legendselectchanged", function(obj) {
                var b = obj.selected, d = [];
                  //alert(JSON.stringify(b))
                  for(var key in b){
                    if(b[key]){
                        //alert(key)
                        for(var i=0,l=series.length;i<l;i++){  
                            var changename = series[i]["name"]; 
                            if(changename == key){ 
                                d.push(i);//得到狀態是true的legend對應的series的下標
                            }
                        }
                    }
                 }   
                var fun1 = function (params) { 
                    var data3 =0;
                    for(var i=0,l=d.length;i<l;i++){
                        for(var j=0,h=series.length;j<h;j++){ 
                            if(d[i] == j){
                                data3 += series[j].data[params.dataIndex]; //重新計算總和
                            }
                        }
                    }
                    return data3;
                }
                series[series.length-1]["itemStyle"]["normal"]["label"]["formatter"] = fun1;
                myChart.setOption(option);

          });
		
		
		
		  /*展現下一階*/  		
		 // if($('#'+elementId+'-001-myModal')){				  		
			myChart.on('click', function (params) {			
			    //callDrillDownHandler(elementId,theme,params.name, params.value,'paintRoundProgess')	;
			});
		  
		  //}
		/*展現下一階*/ 
  }
  
  return myChart;
}



function paintStackBarChart(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX,lengendColorX){
  var legendDataArray = ['CRN不同意', 'DAERB', 'NPQM', ];
  var xAxisDataArray = ['TV', 'MONITOR', 'NB', 'AA', 'MP', 'CP', 'IAVM'];
  var seriesDataArray = [[320, 332, 301, 334, 390, 330, 320],[120, 132, 101, 134, 90, 230, 210],[220, 182, 191, 234, 290, 330, 310]];
  var targetArray = [300];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];

  for(i=0;i<legendDataArray.length;i++){
	var customColor = "";  
	if(lengendColorX) {customColor=lengendColorX[i].toString(); }else{ customColor=''}; 
    seriesArray.push(
	{ name: legendDataArray[i],
			type: 'bar',
			stack: 'ISSUE',
			emphasis: {
                focus: 'series'
            },
			color : customColor,
			data: seriesDataArray[i],
			itemStyle: {
				
				normal: {
			
					label: {
						show: true,
						position: 'inside',						
						formatter:function(params){
							if(params.value>0) {
							   return params.seriesName+'\n'+params.value+"件";
							}else{
							  return '';
							} 
						}
					}
					
				}
			}
		});
  }//for
  
  console.log(seriesArray);

  
  
  var myObject = document.getElementById(elementId);
  var myChart;
  if (myObject)	{	
    myChart  = echarts.init(myObject, theme); 
	//myChart  = echarts.init(myObject); 
	option = {
	tooltip: {
		trigger: 'axis',
		//trigger: 'item',
		axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
			animation : true
		},
		confine: true,
/*		formatter:function(params) {
			var str;
			var strSName = params.seriesName+'';
			var legenIdx = legendData.indexOf(strSName);
			if(params.name&&params.seriesName&&legenIdx>0) str = params.name+'<br>'+ params.marker + params.seriesName+'  :  <B>'+params.value+'</B>';
			return (str);
            console.log(params);
		}*/
		
		formatter: function(params){
			
			return customToolTips(params,option)
		},

		
	},
	legend: {
		data: legendDataArray,
	},
	grid: {
		left: '0%',
		right: '0%',
		bottom: '0%',
		containLabel: true
	},
	
	xAxis: [
		{
			type: 'category',
			data: xAxisDataArray,
			axisTick: {
                alignWithLabel: true
            },
			axisPointer: {
			show: true,
			type: 'line',
			label: {
			  show: false ,

			}
			},
			axisLabel: {
               rotate: 30,
            }
		}
	],
	yAxis: [
		{
			type: 'value',
			axisTick: {
                alignWithLabel: true
            }
		}
	],
	series:   seriesArray
	};
	  /*畫目標線*/
	  if(targetArray[0]) addControlLine(option, '改善目標', targetArray[0], colorRed);
	  /*第一次畫圖*/
		
	  option.series.push(
	  {
		  name: '',
		  type: 'bar',
		  stack: 'ISSUE',
		  //data: getDynamicArray(option.xAxis[0].data.length),
		  data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		  itemStyle: {
			  normal: {
				  label: {
					  show: true,
					  position: 'top',
					  formatter:function(params){
						  var sum = 0;
						  for (var i = 0, l = option.series.length; i < l; i++) {
						  sum += option.series[i].data[params.dataIndex]
						  }
						  return sum;
					  }
				  }
			  }
		  }
		  
	  }
	 );
		
		myChart.setOption(option);	
		
		
		/*置頂合計*/
		var series = option["series"];
        //legend點選事件，根據傳過來的obj.selected得到狀態是true的legend對應的series的下標，再去計算總和
        myChart.on("legendselectchanged", function(obj) {
                var b = obj.selected, d = [];
                  //alert(JSON.stringify(b))
                  for(var key in b){
                    if(b[key]){
                        //alert(key)
                        for(var i=0,l=series.length;i<l;i++){  
                            var changename = series[i]["name"]; 
                            if(changename == key){ 
                                d.push(i);//得到狀態是true的legend對應的series的下標
                            }
                        }
                    }
                 }   
                var fun1 = function (params) { 
                    var data3 =0;
                    for(var i=0,l=d.length;i<l;i++){
                        for(var j=0,h=series.length;j<h;j++){ 
                            if(d[i] == j){
                                data3 += series[j].data[params.dataIndex]; //重新計算總和
                            }
                        }
                    }
                    return data3;
                }
                series[series.length-1]["itemStyle"]["normal"]["label"]["formatter"] = fun1;
                myChart.setOption(option);

          });
		
		
		
		  /*展現下一階*/  		
		 // if($('#'+elementId+'-001-myModal')){				  		
			myChart.on('click', function (params) {			
			    //callDrillDownHandler(elementId,theme,params.name, params.value,'paintRoundProgess')	;
			});
		  
		  //}
		/*展現下一階*/ 
  }
return myChart;
}



function paintRosePieChart(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX){
  var legendDataArray = ['POWER', 'INVERTER', 'MAINBOARD', '冷媒', '加熱管', '壓縮機', '其他'];
  var xAxisDataArray = [];
  var seriesDataArray = [
						{value: 10, name: 'POWER'},
						{value: 5, name: 'INVERTER'},
						{value: 15, name: 'MAINBOARD'},
						{value: 25, name: '冷媒'},
						{value: 20, name: '加熱管'},
						{value: 35, name: '壓縮機'},
						{value: 30, name: '其他'},
					];
  var targetArray = [300];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];
  
  var myObject = document.getElementById(elementId);
  var myChart;
  if (myObject)	{	
     myChart  = echarts.init(myObject, theme); 
	 //myChart  = echarts.init(myObject ); 
		var option = {
			title: {
				//text: '維修部材佔比',
				//subtext: '纯属虚构',
				//left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				left: 'center',
				top: 'bottom',
				bottom: '0%',
                textStyle: {fontSize : 13, fontWeight: 'bold',},
				//type: 'scroll',
                orient: 'horizontal',
				data: legendDataArray
			},
			grid: {
				top: '-10%',
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: false
			},
			toolbox: {
				show: true,
				fontSize : 14,
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			series: [
				{
					name: '項目:',
					type: 'pie',
					//radius: [20, 200],
					center : ['50%','45%'],
					//roseType: 'radius',
					label: {
						show: true,
						fontSize : '14',					    
						position: 'inside',
						formatter:function(params){ 
						   //str = ''
						   //pTg = (parseInt(params.value)/175)*100
						   //if(pTg>=8) str =  params.name
						   //str =  params.name+": "+Math.round(pTg)+"%"
                           
						   //return str
						 },
					},
					emphasis: {
						label: {
							show: true
						}
					},
					data: seriesDataArray
				},
		
			]
		};
		myChart.setOption(option);
		charts.push(myChart);
		
		  /*展現下一階*/  		
		 // if($('#'+elementId+'-001-myModal')){				  		
			myChart.on('click', function (params) {			
			    if(phase!='P') callDrillDownHandler(elementId,theme,params.name, params.value,'paintRoundProgess')	;
			  });
		  
		  //}
		/*展現下一階*/ 
  }
  
return myChart;
}




function paintHZBarChart(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX){
  var legendDataArray = ['2020年','天數','green'];
  var xAxisDataArray = ['ESP-001', 'ESP-002', 'ESP-003', 'ESP-004', 'ESP-005', 'ESP-006'];
  var seriesDataArray = [3, 5, 7, 9, 11, 12];
  var targetArray = [];
  
  if(phase=='P') {
	   legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];
	   if(legendDataX) legendDataArray = legendDataX;
	   if(xAxisDataX) xAxisDataArray  = xAxisDataX;
	   if(seriesDataX) seriesDataArray = seriesDataX;
	   if(targetX) targetArray = targetX;
  }
  var option;
  var seriesArray = [];

  var colorCus = colorRed
  if(legendDataArray[2]=='green') 	colorCus = 	colorGreen;	
  if(legendDataArray[2]=='yellow') 	colorCus = 	colorYellow;

  var myChart;	
  var myObject = document.getElementById(elementId);
  if (myObject)	{	
	 myChart  = echarts.init(myObject, theme); 
	 option = {
		title: {
			show : false,

		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show : false,
			data: legendDataArray[0]
		},
		grid: {
			top: '0%',
			left: '0%',
			right: '0%',
			bottom: '1%',
			//containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
		},
		yAxis: {
			type: 'category',
			data: xAxisDataArray,
			axisLabel: {
				  show: false
			}, 
		},
		series: [
			{
				name: legendDataArray[1],
				type: 'bar',
				show: false,
				data: seriesDataArray,
				color: colorCus,
				label: {
					show: true,
					position: 'insideLeft',
					fontSize : '15',
					fontWeight: 'bold',
					//color : 'white',					
					 formatter:function(params){ 
					   str =  params.value+"天/"+params.name
					   return str
					 },
				},
	
			},	
		 ]
	 };
	 
	
		myChart.setOption(option);
		  
		/*展現下一階*/  		
		 // if($('#'+elementId+'-001-myModal')){				  		
			myChart.on('click', function (params) {
				/*套用公版Function,  傳入被點擊圖的ID, 主題, 下階的搜尋條件, 下階繪圖的function name*/			
			    if(phase!='P')  callDrillDownHandler(elementId,theme,params.name, params.value,'paintSmmmothLineArea')	;
			  });
		  
		  //}
		/*展現下一階*/ 
		  
		  
	}
return myChart;	
}

/*動態實做Drill Down階*/
function callDrillDownHandler(elementId, theme, xValue, yValue,functionName){
	/*重要修改: 增加點圖Drilldown Handler, 協助開發者自動控制Modal堆疊~
     作者: 彭彥維
     時間: 2020/11/30
     判定母ID, 即elementId 來Create虛擬ID實做下一階
	 xValue, yValue 就是用來篩選下階資料的篩選條件 X Y 值
	 functionName 就是接xValue, yValue實做下階繪圖或製表的功能
	 */
	var innerHTMLCode = ($('#virtualID').html());
	var innertHTMLText = ""+innerHTMLCode;
	innertHTMLText= innertHTMLText.replace('replaceIDHead', elementId+'_head');
	innertHTMLText= innertHTMLText.replace('replaceIDBody', elementId+'_body');
	$('#virtualIDAppend').append(innertHTMLText);//製作虛擬DIV  
	$('#'+ elementId+'_head').modal(); //虛擬DIV 打開
	window[functionName](elementId+'_body', theme  ,'D', xValue, yValue); //呼叫實做function
	
};




/*Phase : P = production, D=Demo*/
function paintSmoothLineArea(elementId,theme, phase, xValue, yValue,legendDataX,xAxisDataX,seriesDataX,targetX,lengendColorX){
	//alert(lengendColorX);
	var legendDataArray =  ['ESP_001', 'ESP_002', 'ESP_003', 'ESP_004' , 'ESP_005'];
	var xAxisDataArray = ['11/7', '11/8', '11/9', '11/10', '11/11', '11/12', '11/13'];
	var seriesDataArray = [
						  [120, 132, 101, 134, 90, 230, 210],
						  [220, 182, 191, 234, 290, 330, 310],
						  [150, 232, 201, 154, 190, 330, 410],
						  [320, 332, 301, 334, 390, 330, 320],
						  [66, 166, 266, 366, 188, 88, 89]
					  ];
	var targetArray = [{name:'低標',value:'50'},{name:'目標',value:'100'},{name:'高標',value:'150'}];
	var colorArray = ['rgba(150,202,89, 0.5)','rgba(63,151,235, 0.5)','rgba(44,114,130, 0.5)','rgba(111,122,138, 0.5)','rgba(247,203,56, 0.5)']; 
	if(phase=='P') {
		 legendDataArray=[]; xAxisDataArray=[]; seriesDataArray=[];targetArray=[];colorArray = [];
		 if(legendDataX) legendDataArray = legendDataX;
		 if(xAxisDataX) xAxisDataArray  = xAxisDataX;
		 if(seriesDataX) seriesDataArray = seriesDataX;
		 if(targetX) targetArray = targetX;
		 if(lengendColorX)  colorArray = lengendColorX;
	}
	
	var option;
	var seriesArray = [];
	
	for(i=0;i<legendDataArray.length;i++){
		var colorMap = colorArray[i];
		if(i>=legendDataArray.length) colorMap ='';
		seriesArray.push(
		       {
					name: legendDataArray[i],
					type: 'line',
					symbol: 'none',
					color: colorMap,					
					areaStyle: {
					  color: colorMap, // color of the background
					  opacity: 0.3, // <--- solution
					} ,
					lineStyle: {width:1.5},
					smooth: true,
					
                    //data: [220, 182, 191, 234, 290, 330, 310]
					data: seriesDataArray[i],
					
				}
		);
	
	};
	

	var myChart;
	var myObject = document.getElementById(elementId);
	if (myObject)	{
		myChart  = echarts.init(myObject, theme);
		//myChart  = echarts.init(myObject);		
		var option = {
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis',
				triggerOn: 'mousemove',
				axisPointer: {
					type: 'cross',
					label: {
						//backgroundColor: '#6a7985'
					}
				},
			formatter: function(params){
				
				return customToolTips(params,option)
			    },			
					

			},
			legend: {
				textStyle: {fontSize : 14, fontWeight: 'bold',},
				//data: ['ESP_001', 'ESP_002', 'ESP_003', 'ESP_004' , 'ESP_005']
				data: legendDataArray
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: xAxisDataArray
				},

			],
			yAxis: [
				{
					type: 'value'
				}
			],
			
			//colors: ['#96CA59', '#3F97EB', '#72c380', '#6f7a8a', '#f7cb38', '#5a8022', '#2c7282'],
			//150.202.89 63,151,235 114,195,128 111,122,138 247,203,56 44,114,130
			
			series:seriesArray
		};
		
		
	/*幫線圖或BAR圖畫TARGETg;上下標線
	optionObj : eChart Inst 
	keyName: 線名稱 
	keyValue: 線值 
	CrgbColor: 線的顏色
	*/
    if(targetArray[0]) addControlLine(option, targetArray[0].name, targetArray[0].value , colorBlue);
	if(targetArray[0]) addControlLine(option, targetArray[1].name, targetArray[1].value, colorLightGreen);
    if(targetArray[0]) addControlLine(option, targetArray[2].name, targetArray[2].value, colorRed);
	
	
	myChart.setOption(option,true);	

	
	myChart.on('mouseout','series', function (params) {		
	  $('.toolTips001').css('display','none');	
	  //alert($('.toolTips001').css('display'));		
	 // removeToolTip('toolTips001');
	});
	  
	
	
	/*展現下一階*/  		
	 // if($('#'+elementId+'-001-myModal')){				  		
		myChart.getZr().on('click','series', function (params) {					
			if(phase!='P') callDrillDownHandler(elementId,theme,params.name, params.value,'paintRosePieChart')	;
		});
	  
	  //}
	/*展現下一階*/ 
	
	
	
 }
	return myChart;

}



/*幫線圖或BAR圖畫TARGETg;上下標線
optionObj : eChart Inst 
keyName: 線名稱 
keyValue: 線值 
CrgbColor: 線的顏色
*/
function addControlLine(optionObj, keyName, keyValue, rgbaColor, directionStr){
    
   var Hrzt = false;
   var dataObj = [{ yAxis:keyValue  ,name:keyName    , lineStyle: { normal: {color: rgbaColor} },label:{color: rgbaColor,normal: { show: true}}}];	
   if(directionStr&&directionStr=='Hrzt') dataObj = [{ xAxis:keyValue  ,name:keyName    , lineStyle: { normal: {color: rgbaColor} },label:{color: rgbaColor,normal: { show: true}}}];	
   
   optionObj.series.push(
	 /*標線*/
				{
				  name: keyName,
				  zlevel:9,
				  type: 'line',
				  stack: '',
				  data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],				 
				  markLine : {							 
					  lineStyle: {
						  normal: {
							 type: 'dashed',
							 width:3,
                             opacity: 0.8
						  }
					  },
					  silence: true,
					  label:{//formatter: '{b}: {c}',
					         padding: [-13, -20, 15, -100],  // 重点在这里，这个地方就是定位
			                 fontSize: 14,
							 color: 'rgba(0,0,0,0.7)',
							 textBorderColor: 'source',
							 textShadowColor:  'rgba(255,255,255,0.6)', 
							 textBorderWidth:3, 

							 zlevel:999,
								 formatter:function(){
								 return (keyName+':'+keyValue);
							  }
							 },
					  data : dataObj
					}
				 }
	
	);	
	
}


function paintTHBoard(elementId, cType, theme, xValue, yValue){
	var myObject = document.getElementById(elementId);
    if (myObject)	{
		var myChart  = echarts.init(myObject, theme);
		var chartTitle = "TEMP."; 
		var inputUnit = '℃';
		var maxRane =-20 ; 
		var minRange = 100;
		var colorBarRange = [[0.3, '#63869e'], [0.6, '#91c7ae' ], [0.8, '#91c7ae'], [1,'#c23531' ]];
		var valueInput = 50;
		if(cType=='smoke') { 
			chartTitle = "SMOKE";
			maxRane =1000 ; 
			minRange = 0;
			colorBarRange = [[0.3, colorGreen], [1, colorRed ]];
			valueInput = 900;
			inputUnit = '';
		}
		if(cType=='water')  { 
		chartTitle = "LEAK";
			maxRane =1900 ; 
			minRange = 0;
			colorBarRange = [[0.5, colorRed ], [1, colorGreen ]];
			valueInput = 350;
			inputUnit = '';
		}
		
	
		if(cType=='hum') { 
			 chartTitle = "HUM.";
			 inputUnit = '';
		}
		//alert(chartTitle);
	
	
		var option = {
			tooltip : {
				formatter: "{a} <br/>{b} : {c}%"
			},
			backgroundColor: '',
			series: [
				{
					name: chartTitle,
					type: 'gauge',
					min:  minRange,
					max:  maxRane,
					radius : '100%',
					center : ['50%','55%'],
					axisTick: {            // 坐标轴小标记
						splitNumber: 5,   // 每份split细分多少段
						length :15,        // 属性length控制线长
						lineStyle: {       // 属性lineStyle控制线条样式
							color: 'auto'
						}
					},
					axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color: 'auto'
						}
					},
					axisLine: {            // 坐标轴线  
							lineStyle: {       // 属性lineStyle控制线条样式
								//color: [[0.3, '#63869e'], [0.6, '#91c7ae' ], [0.8, '#91c7ae'], [1,'#c23531' ]], width:10  
								color: colorBarRange, 
								width:10
									   }  
								   },
					splitLine: {           // 分隔线
						show: true,        // 默认显示，属性show控制显示与否
						length :20,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						}
					},
					pointer : {
						width : 5
					},
					title : {
						show : true,
						offsetCenter: [0, '-30%'],       // x, y，单位px
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder'
						}
					},
		
					   
					detail: {
						formatter:'{value}'+inputUnit,
						textStyle: {
						   //color: 'auto',
						   fontSize: 15,
						   position: 'bottom',
						   color: 'black',
						   fontWeight: 'bolder'
						}
					},
					data: [{value: valueInput, name: chartTitle}],
					
				}
			]
		};
	
		myChart.setOption(option);
	}

}

function paintRoundProgess(elementId, theme, xValue, yValue){
	var myChart ;
	var myObject = document.getElementById(elementId);   
	if (myObject)	{
	    myChart  = echarts.init(myObject, theme);
		var option = {
			//middle title for %
			title: {
	            text: '90%',
	            x:'center',
	            y: 'middle',
	            textStyle: {
	              fontSize: 30,
	              //fontWeight: 'bolder',
	              color: colorGreen 
	            },
	    },
			angleAxis: {
				max: 100,
				startAngle: 90,
				splitLine: {
					show: false
				}
			},
			radiusAxis: {
				type: 'category',
				data: ['','百分比'],
				z: 30
				
			},
			polar: {
			},
			tooltip: {
				show: true,
				formatter: function (params) {
					//var id = params.dataIndex;
					//return  data[id][0] ;
				}
			},
			series: [{
				type: 'bar',
				data: [0,90 ],
				coordinateSystem: 'polar',
				name: 'Without Round Cap',
	            color: colorGreen, 
				itemStyle: {
					borderColor: colorRed,
					borderWidth:0
				}
			}],
			legend: {
				show: true,
				data: ['', '%']
			}
		};			
		

        myChart.setOption(option);

    }
  return myChart;
}

/*eChart延伸範例*/
function paintEchartExtend(theme){
	themeMIS=theme;
	paintTHBoard('chartcontainer','smoke',theme);
	paintTHBoard('chartcontainer2','water',theme);
	paintTHBoard('chartcontainer3','smoke',theme);
	paintTHBoard('chartcontainer4','water',theme);
	paintTHBoard('chartcontainer5','temp',theme);
	paintTHBoard('chartcontainer6','hum',theme);
	paintLabMap('labMap01', theme , '台南實驗室設備全覽');
	paintSmoothLineArea('lineSmoothArea01-001', theme  ,'D');
	//paintSmmmothLineArea('lineSmoothArea02', theme  ,'D');
	paintHZBarChart('hzBar01-001',theme, 'P', null, null,['2020年','天數','green'],['ESP-001', 'ESP-002', 'ESP-003', 'ESP-004', 'ESP-005', 'ESP-006'],[3, 5, 7, 9, 11, 12],null);
	
	paintRosePieChart('rosePie01', theme , 'D');
	paintRoundProgess('echart_progress', theme,'D');
	paintRoundProgess('echart_progress2', theme,'D');
	paintRoundProgess('echart_progress3', theme,'D');
	paintRoundProgess('echart_progress4', theme,'D');
	paintStackBarChart('stackBarExample', theme,'D',null,null,null,null,null,null);
	paintStackBarChartHrzt('stackBarExample2', theme,'D');
	paintSankeyChartBasic('sankeyChartBasic', theme,'D',null,null,null,null,null,null,[colorRed,colorGreen,colorBlue]);
	paintLiquidFull('liquidFull01',theme, 'P', null, null,['負載率'],['%'],[0.6],null);
	paintLiquidFull('liquidFull02',theme, 'P', null, null,['存量'],['%'],[0.89],null);	

	//paintSankeyChartBasic('sankeyChartBasic2', theme,'D');
	/*
	程式: custom_MIS.js 
	作用:
	固定啟動DQ的應用 叫醒在custom_DQ.js 的paintEchartExtendDQ(theme)
	*/
	try { // statements to try
	  if(extendDQ=="1") 	paintEchartExtendDQ(theme); // 函式可以丟出例外
	}
	catch (e) {
	   console.log(e); // 將例外傳至例外處理機制
	}
	
}


/*easyChart延伸範例*/
function paintEasyBar(elementId){
	var myObject = $("."+elementId);
    if (myObject) {
		$("."+elementId).sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5,5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5], {
			type: 'bar',
			colorMap: {
				'7': '#a1a1a1'
			},
			barColor: '#26B99A',
			width:'300', 
			height: '40'
		});
	}
}


/*eChart延伸範例*/
function paintEasyChartExtend(){		
	paintEasyBar('sparkline_bar01');
	paintEasyBar('sparkline_bar02');
	paintEasyBar('sparkline_bar03');
	paintEasyBar('sparkline_bar04');
	paintEasyBar('sparkline_bar05');
	paintEasyBar('sparkline_bar06');
	paintEasyBar('sparkline_bar07');
	paintEasyBar('sparkline_bar08');
	paintEasyBar('sparkline_bar09');
	paintEasyBar('sparkline_bar10');	
	
};


function drawDataTablesSTD(elementId,appendElementId,buttonsArrray,buttonsStyle){
	var tableInit=$("#"+elementId).DataTable();
    var buttons = new $.fn.dataTable.Buttons(tableInit, {
	dom: "Blfrtip",
    buttons:buttonsArrray,
	dom: {
      button: {
        tag: "button",
        className: buttonsStyle
      },
      buttonLiner: {
        tag: null
      }
    }	 
    }).container().appendTo($("#"+appendElementId));	
	
}

/*Datatables延伸範例*/
function drawDataTablesExtend(buttonsArrray,buttonsStyle){
	drawDataTablesSTD('estimateMain','estimateButtons',buttonsArrray,buttonsStyle);	
	/*
	程式: custom_MIS.js 
	作用:
	固定啟動DQ的應用 叫醒在custom_DQ.js 的drawDataTablesExtendDQ(theme)
	*/
	try { // statements to try
	  if(extendDQ=="1") 	drawDataTablesExtendDQ(buttonsArrray,buttonsStyle); // 函式可以丟出例外
	}
	catch (e) {
	   console.log(e); // 將例外傳至例外處理機制
	}
	
};


function paintLabMap(elementId, theme , chartName){
	
var myObject = document.getElementById(elementId);

if(myObject) {
	var myChart  = echarts.init(myObject, theme);
	//var myChart  = echarts.init(myObject);
	myChart.showLoading();
	
	$.get('http://tnvqis03/Dashboard_Template/obama_budget_proposal_2012.json', function (diskData) {
		myChart.hideLoading();
	
		function colorMappingChange(value) {
			var levelOption = getLevelOption(value);
			chart.setOption({
				series: [{
					levels: levelOption
				}]
			});
		}
	
		var formatUtil = echarts.format;
	
		function getLevelOption() {
			return [
				{
					itemStyle: {
						borderColor: '#777',
						borderWidth: 0,
						gapWidth: 1
					},
					upperLabel: {
						show: false
					}
				},
				{
					itemStyle: {
						borderColor: '#555',
						borderWidth: 5,
						gapWidth: 1
					},
					emphasis: {
						itemStyle: {
							borderColor: '#ddd'
						}
					}
				},
				{
					colorSaturation: [0.35, 0.5],
					itemStyle: {
						borderWidth: 5,
						gapWidth: 1,
						borderColorSaturation: 0.6
					}
				}
			];
		}
	
		myChart.setOption(option = {
	
			title: {
				text: chartName,
				left: 'center'
			},
	
			tooltip: {
				formatter: function (info) {
					var value = info.value;
					var treePathInfo = info.treePathInfo;
					var treePath = [];
	
					for (var i = 1; i < treePathInfo.length; i++) {
						treePath.push(treePathInfo[i].name);
					}
	
					return [
						'<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
						chartName + formatUtil.addCommas(value) + ' KB',
					].join('');
				}
			},
	
			series: [
				{
					name: chartName,
					type: 'treemap',
					visibleMin: 300,
					label: {
						show: true,
						formatter: '{b}'
					},
					upperLabel: {
						show: true,
						height: 30
					},
					itemStyle: {
						borderColor: '#fff'
					},
					levels: getLevelOption(),
					data: diskData
				}
			]
		});
	});


}
	
}


/*Boostrap Tab點擊後, 相關的CHART要RESIZE LAYOUT, 否則看不見*/
$(function(){
    //data-toggle="pill還是data-toggle="tab" 根據前面所用標籤頁的不同來選擇。我使用的是data-toggle="tab"。
    //解決tab切換不顯示問題 在載入視窗後重新渲染。
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
         for(var i = 0; i < charts.length; i++) {
           charts[i].resize();         
		   }     
		});     
 })














