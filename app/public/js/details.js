$(window).load(function() {

// get syskey &status
var status = 0 ;
var syskey = 0 ;

function getUrl(){   
   var str = window.location.href;
   var num = str.indexOf("?");
   str = str.substr(num + 1);
   var arr = str.split('&');
   status = arr[1].split('=')[1] ;
   syskey = arr[0].split('=')[1] ;
   console.log(syskey);
  }

function getStatus(status)
{
if (status == 1){
	document.getElementById("btn").disabled=true;
      }
}

/*handle csrf*/
	var csrftoken = Cookies.get('csrfToken');
	function csrfSafeMethod(method) {
	  // these HTTP methods do not require CSRF protection
	  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	  beforeSend: function(xhr, settings) {
	    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	      xhr.setRequestHeader('x-csrf-token', csrftoken);
	    }
	  },
	});
	/*handle csrf*/

function getNum(){
    $.ajax({
      url:"/api/v1/eventsList/"+syskey,
      type:'GET',
      success:function(results){
        console.log(results.data);
        document.getElementById('date').innerHTML = Date(results.data.createat);
        document.getElementById('status').innerHTML = results.data.status;  

        var Src = document.getElementById('Url');
        Src.src = results.data.videourl;    

        document.getElementById('Name').value = results.data.cashername;  
        document.getElementById('Id').value = results.data.casherid;  
        
        document.getElementById('Note').value = results.data.Note;
        document.getElementById('Prod_Name').value =results.data.productname;
        document.getElementById('Price').value = results.data.price;  
        } 
    })
  }



getUrl();
getStatus();
getNum();
})

function submit(){
  /*  $.ajax({
      url:"/api/v1/eventsList/count/",
      type:'GET',
      data:
      }
    })
  */
}