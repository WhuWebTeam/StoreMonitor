window.onload = function(){
	// 192.168.216.132:7001/api/v1/wmHomePage/4
	// http://121.201.13.217:27002/api/v1/wmHomePage/4

	if(getSearchString('userId')){
		var userId = getSearchString('userId');
		var cookie = new CookieStorage('/');
		cookie.setItem('userId',userId);
	}else{
		var cookie = new CookieStorage('/');
		var userId = cookie.getItem('userId');
	}
	
	$.ajax({
		url:'/api/v1/shops/notAssigned',
		type:'GET',
		success:function(results){

			

			var shops=[];
			var isClick=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待分配的门店';
				document.getElementById('list').appendChild(mes);
			}


			sortFun(results,'id',true);


			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `店号:<span id='num'>${num}</span><button class="glyphicon glyphicon-unchecked"></button>`;
				document.getElementById('list').appendChild(p);
				var btn = p.getElementsByTagName('button')[0];
				isClick[i]=false;
				btn.onclick = function(){
					if(!isClick[i]){
						removeClass(this,'glyphicon-unchecked');
						addClass(this,'glyphicon-ok');
						shops.push({
							"shopId":results[i].id,
							"type":results[i].type
						});
					}else{
						removeClass(this,'glyphicon-ok');
						addClass(this,'glyphicon-unchecked');
						shops.pop();
					}
					isClick[i] = !isClick[i];
				}
			}

			var submit = document.getElementById('confirm');
			submit.onclick = (function(){
				return 	function(){
							if(shops.length){
								$.ajax({
									url:'/api/v1/shopUser/' + userId,
									type:'POST',
									data:{shops},
									success:function(){
										window.location = 'districtManager.html';
									}
								})
							}else{
								window.location = 'districtManager.html';
							}
						}
			}(userId));
		}
	})



}
