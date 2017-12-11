window.onload = function(){
	
	var status = getSearchString('status') ;
	var syskey = getSearchString('syskey') ;

	var cookie = new CookieStorage('/');
	var userId = cookie.getItem('userId');

	function editResultList(preResult){
	    $.ajax({
	    	url:"/api/v1/editResultList",
	        type:'GET',
	        success:function(results){
	        	var data = results.data;
	        	var select = document.getElementById('result');
	        	if(preResult){
	        		var option = document.createElement('option');
	        		option.setAttribute('selected','');
	        		option.innerHTML = preResult;
	        		select.appendChild(option); 
	        	} 
	        	for(let i=0;i<data.length;i++){
	        		if(data[i].name == preResult) continue;
	        		var option = document.createElement('option');
	        		option.innerHTML = data[i].name;
	        		select.appendChild(option);
	        	}
	  		}
	    })
	}  /*handle select menu*/

	function getInfo(){
	    var pairs = {
	      	'0' :'未处置',
	      	'1' :'待提交',
	      	'2' :'完成'
	    }
	    $.ajax({
	      	url:"/api/v1/eventsList/editInfo/"+syskey,
	      	type:'GET',
	      	success:function(results){
		        var data = results.data;
		        $('#date').html(handleTime(data.createat));
		        $('#status').html(pairs[data.status]);
		        $("source")[0].src = data.videourl;
		        $('#name').val(data.cashiername?data.cashiername:data.cashierid?data.cashierid:'pos机');
		        $('#id').val(data.transid);
		        $('#note').val(data.comments);
		        $('#prod').val(data.productname);
		        $('#price').val(data.price);
		        editResultList(data.editresult); /* handle Optional results and previous result*/
	        }
	    })
	}  /*write info*/

	function submit(){
	    var editResult = $("#result option:selected").text();
	    var comments = $('#note').val() ;
	    var productName = $('#prod').val() ;
	    var price = $('#price').val() ;

	    if(status == 2){
	  		window.location=`checker.html?listType=2`;
	   	}
	  	else{
    		$.ajax({
      			url:"/api/v1/eventsList/editInfo/" + syskey,
	          	type:'put',
	         	data:{
	            	'editResult' : editResult,
	            	'comments'  : comments,
	            	'productName' :productName,
	            	'price' : price
        		},
          		success:function(data){
            		$.ajax({
	                	url:'/api/v1/eventTAT/storeTime/'+syskey,
	                	type:'POST'
		            })
		            window.location=`checker.html?listType=1`;
        	    }
    		});
	    }
	} /*submit the form*/
	


	getInfo();
	$('#scan').css('height',$('#scan').css('width'));
 	$('#back').click(function(){
		window.location = `checker.html?listType=${status}`;
	});
 	$('#btn').click(submit);


 	if(status != 0){
 		$("#result").css('border','1px solid #ccc');
 		$("#note").css('border','1px solid #ccc');
 		$("#prod").css('border','1px solid #ccc');
 		$("#price").css('border','1px solid #ccc');
 		$('#btn').removeAttr('disabled');
 		if(status == 2){
 			$('#result').attr('disabled','');
 			$('#note').attr('disabled','');
 			$('#prod').attr('disabled','');
 			$('#price').attr('disabled','');
 		}
 	}

	$("#result").change(function(){
		this.style.border = '1px solid #ccc';
	})
	$("#note").change(function(){
		this.style.border = $('#note').val()?'1px solid #ccc':'1px solid red';
	})
	$("#prod").change(function(){
		this.style.border = $('#prod').val()?'1px solid #ccc':'1px solid red';
	})
	$("#price").change(function(){
		this.style.border = $('#price').val()>0?'1px solid #ccc':'1px solid red';
	})
	$(":input").bind('input propertychange',function(){ 
		var editResult = $("#result option:selected").text();
		var comments = $('#note').val();
		var productName = $('#prod').val() ;
		var price = $('#price').val() ;

		if(editResult!='审核结论'&&comments&&productName&&price>0){
			$('#btn').removeAttr('disabled');
		}else{
			$('#btn').attr('disabled','');
		} 
	});
 	
}