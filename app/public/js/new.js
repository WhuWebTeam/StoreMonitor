var aa =["收银员","收银次数","事件次数","出错率"];
var bb =["防损员","事件次数","三分钟内","五分钟内","五分钟以上"]

function drawP(){
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
                {value:1, name:'事件次数'},
                {value:4, name:'总次数'},
               
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
            }
        }
    ]
};
myChart.setOption(option);
}

function casher(){
	headTable();
	showTable();
	drawP()
}

function manager(){
	headTable();
	showTable();
	drawP()
}




function headTable(){
	var tbread = document.getElementById('tbHead');
    var trow = getHead(); 
    tbread.appendChild(trow);  
	}  
function getHead(){  
	var row = document.createElement('tr');  	
	for (var i = 0; i < aa.length; i++) {	
     	var idCell = document.createElement('th');  
     	idCell.setAttribute("class", "text-center");
    	idCell.innerHTML = aa[i]; 
     	row.appendChild(idCell); 
		}  
	console.log(row);
    return row; //返回tr数据      
     }      

function showTable() {
var per = [  
    {id:001,name:'AA',job:'DD',status:'1'},  
    {id:002,name:'BB',job:'EE',status:'2'},  
    {id:003,name:'CC',job:'FF',status:'3'}
     ];   

    var tbody = document.getElementById('tbMain');   
      for(var i = 0;i < per.length; i++){  
          var trow = getDataRow(per[i]);
          tbody.appendChild(trow);  
        } 
	}

function getDataRow(h){  
    var row = document.createElement('tr'); //创建行  
    var idCell = document.createElement('td'); //创建第一列id  
    idCell.setAttribute("class", "text-center");
    idCell.innerHTML = h.id; //填充数据  
    row.appendChild(idCell); //加入行  ，下面类似  
       
    var nameCell = document.createElement('td');//创建第二列name  
    nameCell.innerHTML = h.name;  
    row.appendChild(nameCell);  
       
    var jobCell = document.createElement('td');//创建第三列job  
    jobCell.innerHTML = h.job;  
    row.appendChild(jobCell);  

    var jobCell = document.createElement('td');//创建第三列job  
    jobCell.innerHTML = h.status;  
    row.appendChild(jobCell); 
    console.log(row);

    return row;       
     }      