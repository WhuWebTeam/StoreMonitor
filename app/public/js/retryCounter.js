window.onload = function(){
	var cookie = new CookieStorage('/');
	const userId = cookie.getItem('userId');

	$.ajax({
		url:'/api/v1/counters/myCounter/' + userId,
		type:'GET',
		success:function(results){
			var counters=[];
			var isClick=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待解除的款台';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results,'id',true);
			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `款台:<span id='num'>${num}</span><button class="glyphicon glyphicon-ok"></button>`;
				document.getElementById('list').appendChild(p);
				var btn = p.getElementsByTagName('button')[0];
				isClick[i]=true;
				btn.onclick = function(){
					if(!isClick[i]){
						removeClass(this,'glyphicon-unchecked');
						addClass(this,'glyphicon-ok');
						counters.pop();
					}else{
						removeClass(this,'glyphicon-ok');
						addClass(this,'glyphicon-unchecked');
						counters.push({
							"counterId":results[i].id
						});
					}
					isClick[i] = !isClick[i];
				}
			}


			var submit = document.getElementById('confirm');
			submit.onclick = function(){
				if(counters.length){
					var info='';
					counters.forEach(function(value){
						info+=' '+value.counterId+' ';
					})
					if(confirm('您将解除与款台'+info+'的绑定')){
						$.ajax({
							url:'/api/v1/counterUser/'+userId,
							type:'delete',
							data:{counters},
							success:function(){
								window.location = 'checker.html';
							}
						})
					}	
				}else{
					if(confirm('您未解除与任何款台的绑定')){
						window.location = 'checker.html';
					}
				}
				
			}
		}
	})



}
