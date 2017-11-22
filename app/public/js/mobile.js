window.onload = function(){
	/*handle class*/
	function hasClass(elem, cls) {
	  cls = cls || '';
	  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
	  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	}
	function addClass(elem, cls) {
	  if (!hasClass(elem, cls)) {
	    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
	  }
	}

	function removeClass(elem, cls) {
	  if (hasClass(elem, cls)) {
	    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
	    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
	      newClass = newClass.replace(' ' + cls + ' ', ' ');
	    }
	    elem.className = newClass.replace(/^\s+|\s+$/g, '');
	  }
	}
	/*handle class*/


	/* handle time */
	function handleTime(num){
		num = parseInt(num);
		var now = new Date(num),
               y = now.getFullYear(),
               m = now.getMonth() + 1,
               d = now.getDate();
		return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);

	}
	/* handle time */

	/*handle csrf*/
	var csrftoken = Cookies.get('csrfToken');
	function csrfSafeMethod(method) {
	  // these HTTP methods do not require CSRF protection
	  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	  beforeSend: function(xhr, settings) {
	    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	      xhr.setRequestHeader('x-csrf-token', csrftoken);
	    }
	  },
	});
	/*handle csrf*/

	/* get num of events */
	function getNum(){
		$.ajax({
			url:'/api/v1/eventsList/count',
			type:'GET',
			//data:
			success:function(results){
				document.getElementById('event').children[0].children[0].innerHTML = results.data.working;  
				document.getElementById('event').children[2].children[0].innerHTML = results.data.store;  
				document.getElementById('event').children[1].children[0].innerHTML = results.data.commit;  	
			}
		})
	}
	/* get num of events */


	// function getGraph(type){
	// 	$.ajax({
	// 		url:'/api/v1/eventsList/query',
	// 		type:'post',
	// 		data:{
	// 			status:type
	// 		}
	// 		success:function(results){
	// 			console.log(results);
	// 		}
	// 	})
	// }

	function getList(type){
		var glyphiconType;
		switch(type){
			case 0: glyphiconType = 'glyphicon-pencil'; break;
			case 1: glyphiconType = 'glyphicon-search'; break;
			case 2: glyphiconType = 'glyphicon-ok'; break;
		}

		$.ajax({
			url:'/api/v1/eventsList/query',
			type:'post',
			data:{
				status:type
			},
			success:function(results){
				var results = results.data;
				if(results.length == 0){
					var mes =document.createElement('p');
					//addClass(mes,'no');
					mes.setAttribute('class','no');
					mes.innerHTML = '没有待处理的事件';
					document.getElementById('list').appendChild(mes);
				}
				for(let i=0;i<results.length;i++){
					var div = document.createElement('div');
					div.setAttribute('class','view');
					time = handleTime(results[i].ts);
					
					div.innerHTML =`
							<p class="top">
								<span class='a'>${time}</span><span class='b'>${results[i].transid}</span><span class="glyphicon ${glyphiconType} c" aria-hidden="true"></span>
							</p>
							<p class="bottom">
								<span class='a'>人名</span><span class='b'>款台</span><span class='c'>审查结果:${results[i].editresult}</span>
							</p>
					`;
					document.getElementById('list').appendChild(div);
					
				}
				w_TO_s(type);
			}
		})

	}


	/*draw graph*/ 
	var myChart = echarts.init(document.getElementById('content'));
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
	                    data : ['周一','周二','周三','周四','周五','周六']
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
	                    name:'最高气温',
	                    type:'line',
	                    data:[11, 11, 15, 18, 12, 9],
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
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
    		//getGraph(type);


    	}
    });
   	/* add press event of day week and month */


   	/* add press event of event */
   	var btn = document.getElementById('event').getElementsByTagName('p');
   	var pairs = {
   		0 : 0 ,
   		1 : 2 ,
   		2 : 1
   	}
   	Array.prototype.map.call(btn,function(item,index){
   		item.onclick = function(){
   			var alr_down = document.getElementsByClassName('edown')[0];
   			if(alr_down !== this){
   				removeClass(alr_down,'edown');
   				addClass(item,'edown');

   				document.getElementById('list').innerHTML='';
   				getList(pairs[index]);

   			}
   		}
   	})
   	/* add press event of event */


   	/* from working to store */
   	function w_TO_s(){
   		var workings = document.getElementsByClassName('view');
   		Array.prototype.map.call(workings,function(Item,index){
   			Item.onclick = function(){
   				this.parentNode.removeChild(this);
   			}
   		})
   	}
   	



   	getNum();
   	getList(0); 	

   	$("body").on("touchstart", function(e) {
   		console.log('slide');
   	});

}