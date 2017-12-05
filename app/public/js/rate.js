var cashList =["收银员","收银次数","事件次数","出错率"];
var managerList=["防损员","事件次数","三分钟内","五分钟内","五分钟以上"]
var sta = 0;

function casher(){
	sta = 0;
	doReset();
	headTable(cashList);
	showTable();
	drawP();
}

function manager(){
	doReset();
	sta = 1;
	headTable(managerList);
	showTable();
	drawP();
}

function thisWeek() {
	doReset();
	headTable(cashList);
	showTable("week");
	drawP("week");	
}

function thisMonth() {
	doReset();
	headTable(cashList);
	showTable("month");
	drawP("month");
	}

function threeMonth() {
	doReset();
	headTable(cashList);
	showTable("3month");
	drawP("3month");
	}

function halfYear() {
	doReset();
	headTable(cashList);
	showTable("6month");
	drawP("6month");
	}

function headTable(results){
	var tbread = document.getElementById('tbHead');
    var trow = getHead(results); 
    tbread.appendChild(trow);  
	}  
function getHead(results){  
	var row = document.createElement('tr');  	
	for (var i = 0; i < results.length; i++) {	
     	var idCell = document.createElement('th');  
     	idCell.setAttribute("class", "text-center");
    	idCell.innerHTML = results[i]; 
     	row.appendChild(idCell); 
		}  
	console.log(row);
    return row; //返回tr数据      
    }      

function showTable(freq) {
//app.get('/api/v1/eventsList/errorRate/:day/:userId', (day: 'week', 'month', '3month', '6month')
//data":[{"name":null,"id":"WME20150003","total":"50","error":"1","errorrate":"0"},
	$.ajax({
            //url:"/api/v1/eventsList/rate/"+userId+freq,
            url:"/api/v1/eventsList/errorRate/list/5/"+freq,
            type:'GET',
            success:function(results){     
   			var tbody = document.getElementById('tbMain');   
      		for(var i = 0;i < results.data.length; i++){  
          		var trow = getDataRow(results.data[i]); 
          		tbody.appendChild(trow);  
        		} 
           }
        }); 
	}

//填充数据
function getDataRow(h){  
    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td'); //创建第一列id  
    idCell.setAttribute("class", "text-center");
    idCell.innerHTML = h.name; //填充数据  
    row.appendChild(idCell); //加入行  ，下面类似  
       
    var nameCell = document.createElement('td');//创建第二列name  
    nameCell.setAttribute("class","text-center");
    nameCell.innerHTML = h.total;  
    row.appendChild(nameCell);  
       
    var jobCell = document.createElement('td');//创建第三列job  
    jobCell.setAttribute("class", "text-center");
    jobCell.innerHTML = h.error;  
    row.appendChild(jobCell);  

    var jobCell = document.createElement('td');//创建第三列job  
    jobCell.setAttribute("class", "text-center");
    jobCell.innerHTML = h.errorrate;  
    row.appendChild(jobCell); 
    console.log(row);

    return row;       
     }      

function doReset() 
{ 
	var tbl_content = document.getElementById("tbHead"); 
	tbl_content.innerHTML='';
	var tbl_content = document.getElementById("tbMain"); 
	tbl_content.innerHTML='';
} 


function drawP(freq){
	//api/v1/eventsList/rate/:userId/:day
	$.ajax({
            //url:"/api/v1/eventsList/rate/"+userId+"/"+freq, 
            url:"/api/v1/eventsList/rate/5/"+freq,
            type:'GET', 
            success:function(results){   //get the pie data;
			
			var myChart;
			myChart = echarts.init(document.getElementById('drawP'));
			option = {
    	title : {
        	text: '',
        	subtext: '',
        	x:'center'
    			},
    	tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    			},
    	legend: {
        	orient: 'vertical',
        	left: 'left',
        	data: ['事件次数','总次数']
    		},
    series : [
        {
            name: '事件次数占比',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:results.rate, name:'事件次数'},
                {value:1, name:'总次数'},
               
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.9)'
                }
            }
        }
    ]
};
	myChart.setOption(option);	
		}        
	});
}