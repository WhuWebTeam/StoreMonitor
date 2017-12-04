window.onload = function(){
	var cookie = new CookieStorage('/');
	const userId = cookie.getItem('userId');

	$.ajax({
		url:'/api/v1/shops/' + userId,
		type:'GET',
		success:function(results){
			var shops=[];
			var isClick=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待解除的门店';
				document.getElementById('list').appendChild(mes);
			}
			sortFun(results,'id',true);
			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `门店:<span id='num'>${num}</span><button class="glyphicon glyphicon-ok"></button>`;
				document.getElementById('list').appendChild(p);
				var btn = p.getElementsByTagName('button')[0];
				isClick[i]=true;
				btn.onclick = function(){
					if(!isClick[i]){
						removeClass(this,'glyphicon-unchecked');
						addClass(this,'glyphicon-ok');
						shops.pop();
					}else{
						removeClass(this,'glyphicon-ok');
						addClass(this,'glyphicon-unchecked');
						shops.push({
							"shopId":results[i].id
						});
					}
					isClick[i] = !isClick[i];
				}
			}


			var submit = document.getElementById('confirm');
			submit.onclick = function(){
				if(shops.length){
					var info='';
					shops.forEach(function(value){
						info+=' '+value.shopId+' ';
					})
					if(confirm('您将解除与门店'+info+'的绑定')){
						$.ajax({
							url:'/api/v1/shopUser/retrive/'+userId,
							type:'delete',
							data:{shops},
							success:function(){
								window.location = 'districtManager.html';
							}
						})
					}	
				}else{
					if(confirm('您未解除与任何门店的绑定')){
						window.location = 'districtManager.html';
					}
				}
				
			}
		}
	})



}
