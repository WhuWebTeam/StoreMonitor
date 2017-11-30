var set = document.getElementById('set');
var shop = document.getElementById('shop');
var cookie = new CookieStorage('/');
const districtManagerId = cookie.getItem('districtManagerId');

set.onclick = function(){
	/*control show and hide*/
	if(shop.style.display=='none'){
		shop.style.display='block';
	}else{
		shop.style.display='none';
	}


}


/*bind button to achive page jump*/

$('#myShop').click(function(){
	window.location = `myShop.html`;
})

$('#addShop').click(function(){
	window.location = `addShop.html`;
})

$('#retryShop').click(function(){
	window.location = `retryShop.html`;
})

$('#oneKeyRetry').click(function(){
	if(confirm('您将解除与所有商店的绑定！')){
		$.ajax({
			url:'/api/v1/shopUser/onKeyRetrive/'+districtManagerId,
			type:'delete',
			success:function(){
				if(confirm('成功删除所有绑定！,点击确定进入新增商店页，点击取消回到主页')){
					window.location = 'checkout.html';
				}else{
					window.location.reload();
				}
				
			}
		})
	}
})
