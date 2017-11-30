window.onload = function(){
	// 192.168.216.132:7001/api/v1/wmHomePage/2
	// http://121.201.13.217:27002/api/v1/wmHomePage/2

	if(getSearchString('userId')){
		var userId = getSearchString('userId');
		var cookie = new CookieStorage('/');
		cookie.setItem('userId',userId);
	}else{
		var cookie = new CookieStorage('/');
		var userId = cookie.getItem('userId');
	}  //const 常量只在其声明的块级作用域内有效


	
	$.ajax({
		url:'/api/v1/counters/notAssaigned',
		type:'GET',
		success:function(results){

			

			var counters=[];
			var isClick=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待分配的款台';
				document.getElementById('list').appendChild(mes);
			}


			sortFun(results,'id',true);



			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `款台:<span id='num'>${num}</span><button class="glyphicon glyphicon-unchecked"></button>`;
				document.getElementById('list').appendChild(p);
				var btn = p.getElementsByTagName('button')[0];
				isClick[i]=false;
				btn.onclick = function(){
					if(!isClick[i]){
						removeClass(this,'glyphicon-unchecked');
						addClass(this,'glyphicon-ok');
						counters.push({
							"counterId":results[i].id,
							"type":results[i].type
						});
					}else{
						removeClass(this,'glyphicon-ok');
						addClass(this,'glyphicon-unchecked');
						counters.pop();
					}
					isClick[i] = !isClick[i];
				}
			}

			var submit = document.getElementById('confirm');
			submit.onclick = (function(){
				return 	function(){
							if(counters.length){
								$.ajax({
									url:'/api/v1/counterUser/' + userId,
									type:'POST',
									data:{counters},
									success:function(){
										window.location = 'checker.html';
									}
								})
							}else{
								window.location = 'checker.html';
							}
						}
			}(userId));
		}
	})



}
