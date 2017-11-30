window.onload = function(){

	if(getSearchString('districtManagerId')){
		var districtManagerId = getSearchString('districtManagerId');
		var cookie = new CookieStorage('/');
		cookie.setItem('districtManagerId',districtManagerId);
	}else{
		var cookie = new CookieStorage('/');
		var districtManagerId = cookie.getItem('districtManagerId');
	}

	/* get num of events */
	function getNum(){
		$.ajax({
			url:'/api/v1/eventsList/dayCount',
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
			url:'/api/v1/eventsList/graph/'+type,
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
			myChart = echarts.init(document.getElementById('content'));

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
			                },
			                // {
				               //     name:'最低气温',
				               //     type:'line',
				               //     data:[1, -2, 2, 5, 3, 2, 0],
				               //     markPoint : {
				               //         data : [
				               //             {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
				               //         ]
				               //     },
				               //     markLine : {
				               //         data : [
				               //             {type : 'average', name : '平均值'}
				               //         ]
				               //     }
			               	// }
			                 
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




   



   	getNum();
   	getGraph('day');	

}