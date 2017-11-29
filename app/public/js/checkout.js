window.onload = function(){

	$.ajax({
		url:'/api/v1/counters/notAssaigned',
		type:'GET',
		success:function(results){
			var counters=[];
			results = results.data;
			if(results.length == 0){
				var mes =document.createElement('p');
				//addClass(mes,'no');
				mes.setAttribute('class','no');
				mes.innerHTML = '没有待分配的款台';
				document.getElementById('list').appendChild(mes);
			}
			for(let i=0;i<results.length;i++){
				var p = document.createElement('p');
				p.setAttribute('class','li');
				var num = results[i].id;
				p.innerHTML = `款台:<span id='num'>${num}</span><button class="glyphicon glyphicon-unchecked"></button>`;
				document.getElementById('list').appendChild(p);
				var btn = p.getElementsByTagName('button')[0];
				btn.onclick = function(){
					removeClass(this,'glyphicon-unchecked');
					addClass(this,'glyphicon-ok');
					counters.push({
						"id":results[i].id,
						"type":results[i].type
					});
				}
			}
		}
	})


	var submit = document.getElementById('confirm');
	submit.onclick = function(){
		$.ajax({
			url:'/api/v1/counterUser/'+userId,
			type:'POST',
			data:{counters},
			success:function(){
				window.location = 'checker.html';
			}
		})
	}
}
