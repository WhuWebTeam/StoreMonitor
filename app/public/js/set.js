var set = document.getElementById('set');
var counter = document.getElementById('counter');


set.onclick = function(){
	/*control show and hide*/
	if(counter.style.display=='none'){
		counter.style.display='block';
	}else{
		counter.style.display='none';
	}


}


/*bind button to achive page jump*/

$('#myCounter').click(function(){
	window.location = `myCounter.html?userId=${userId}`;
})

$('#addCounter').click(function(){
	window.location = `checkout.html?userId=${userId}`;
})

$('#retryCounter').click(function(){
	window.location = `retryCounter.html?userId=${userId}`;
})

$('#oneKeyRetry').click(function(){
	if(confirm('您将解除与所有款台的绑定！')){
		$.ajax({
			url:'/api/v1/counterUser/onKeyRetrive/'+userId,
			type:'delete',
			success:function(){
				alert('成功删除所有绑定！');
				window.location.reload();
			}
		})
	}
})
