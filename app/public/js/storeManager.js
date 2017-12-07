if(getSearchString('userId')){
	var userId = getSearchString('userId');
	var cookie = new CookieStorage('/');
	cookie.setItem('userId',userId);
}else{
	var cookie = new CookieStorage('/');
	var userId = cookie.getItem('userId');
}
window.onload = function(){
	/* get num of events */
	function getNum(){
		$.ajax({
			url:'/api/v1/eventsList/count/manager/'+userId,
			type:'GET',
			//data:
			success:function(results){
				document.getElementById('event').children[0].children[0].innerHTML = results.data.dealing;  
				document.getElementById('event').children[1].children[0].innerHTML = results.data.completed;  
			}
		})
	}
	/* get num of events */




	function getGraph(type){
		//console.log(type);
		$.ajax({
			url:'/api/v1/eventsList/countGraph/manager/'+userId+'/'+type,
			type:'get',
			success:function(results){
				var graphData = results.data;
				sortFun(graphData,'t',true);
				draw(graphData);
			}
		})
	}
	/*draw graph*/
	var myChart;
	function draw(graphData){
			if (myChart != null && myChart != "" && myChart != undefined) {
			        myChart.dispose();
			}
			myChart = echarts.init(document.getElementById('contentGraph'));

			option = {
			            title : {
			                text: '防损事件统计表',
			                subtext: '次数'
			            },
			            tooltip : {
			                trigger: 'axis'
			            },
			            // legend: {
			            //     data:['最高气温','最低气温']
			            // },
			            toolbox: {
			                show : true,
			                feature : {
			                    mark : {show: true},
			                    dataView : {show: true, readOnly: false},
			                    magicType : {show: true, type: ['line', 'bar']},
			                    restore : {show: true},
			                    //saveAsImage : {show: true}
			                }
			            },
			            calculable : true,
			            xAxis : [
			                {
			                    type : 'category',
			                    boundaryGap : false,
			                    data : []
			                    //data : ['周一','周二','周三','周四','周五','周六']
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    axisLabel : {
			                        formatter: '{value} '
			                    }
			                }
			            ],
			            series : [
			                {
			                    name:'防损事件次数',
			                    type:'line',
			                    //data:[11, 11, 15, 18, 12, 9],
			                    data:[],
			                    markPoint : {
			                        data : [
			                            {type : 'max', name: '最大值'},
			                            {type : 'min', name: '最小值'}
			                        ]
			                    },
			                    markLine : {
			                        data : [
			                            {type : 'average', name: '平均值'}
			                        ]
			                    }
			                }
			                 
			            ]
			        };
		    option.xAxis[0].data =graphData.map(function(x){
		    	return x.t;
		    })
		    option.series[0].data =graphData.map(function(x){
		    	return x.count;
		    })
		    myChart.setOption(option);
	}
	
    /*draw graph*/




    /* add press event of day week and month */
    var btn = document.getElementById('graph').getElementsByTagName('button');
   	Array.prototype.map.call(btn,function(item,index){
    	item.onclick = function(){
    		/*handle style*/
    		var alr_down = document.getElementsByClassName('down')[0];
    		if(alr_down !== this){
    			removeClass(alr_down,'down');
    			addClass(item,'down');
    		}
    		/*handle style*/

    		/*date_type of graph*/
    		var type = item.className.split(/\s+/)[0]; 
    		getGraph(type);


    	}
    });
   	/* add press event of day week and month */


	function getDot(){
		$.ajax({
			url:'/api/v1/eventsList/errorRate/graph/'+userId,
			type:'get',
			success:function(results){
				var dotData = results.data;
				drawDot(dotData);
			}
		})
	}
	/*draw graph*/
	var myDot;
	function drawDot(dotData){
			if (myDot != null && myDot != "" && myDot != undefined) {
			        myDot.dispose();
			}
			myDot = echarts.init(document.getElementById('contentDot'));

			option = {
			    title : {
			        text: '差错率',
			    },
			    tooltip : {
			        trigger: 'axis',
			        showDelay : 0, 
			        axisPointer:{
			            show: true,
			            type : 'cross',
			            lineStyle: {
			                type : 'dashed',
			                width : 1
			            }
			        }
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true}
			        }
			    },
			    xAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    series : [
			        {
			            name:'某门店',
			            type:'scatter',
			            // data: [[2000, 10], [3000, 24], [8000, 100],[4000, 36], [1000, 37]
			            // ]
			        }
			    ]
			};
			
			option.series[0].data = dotData.map(function(x){
		    	return [x.total,x.error];
		    });                   

			myDot.setOption(option);

	}
	

   



   	getNum();
   	getGraph('day');
   	getDot();  
}