var status = 0 ;
var syskey = 0 ;

function getUrl(){   
   var str = window.location.href;
   var num = str.indexOf("?");
   str = str.substr(num + 1);
   var arr = str.split('&');
   status = arr[1].split('=')[1] ;
   syskey = arr[0].split('=')[1] ;

  }

window.onload = function() 
{

// get syskey &status
        function getStatus(status)
        {
        if (status == 2){
          document.getElementById("Name").disabled=true;
          document.getElementById("Id").disabled=true;
          document.getElementById("Prod_Name").disabled=true;
          document.getElementById("Price").disabled=true;
          document.getElementById("Note").disabled=true;
          document.getElementById('btn').innerHTML = "返回";
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
      if (!csrfSafeMethod(settings.type)   && !this.crossDomain) {
        xhr.setRequestHeader('x-csrf-token', csrftoken);
      }
    },
  });
  /*handle csrf*/

      function getNum(){
          var pairs = {
            '0' :'未处置',
            '1' :'待提交',
            '2' :'完成'
          }
          $.ajax({
            url:"/api/v1/eventsList/editInfo/"+syskey,
            type:'GET',
            success:function(results){
              document.getElementById('date').innerHTML = Date(results.data.createat).slice(0,24);
              document.getElementById('status').innerHTML = pairs[results.data.status];  

              document.getElementById('Url').src =results.data.videourl;
              document.getElementById('example_video_1').poster =results.data.pic1url;

              document.getElementById('Name').value = results.data.cashiername?results.data.cashiername:results.data.cashierid?results.data.cashierid:'pos机';  
              document.getElementById('Id').value = results.data.transid;  
              
              //document.getElementById('Note').value = results.data.Note;
              document.getElementById('Prod_Name').value =results.data.productname?results.data.productname:results.data.productid;
              document.getElementById('Price').value = results.data.price;  
              } 
          })
        }

        
        // get resultlist
        function getResult(){
            $.ajax({
              url:"/api/v1/editResultList",
              type:'GET',
              success:function(results){
                document.getElementById('state1').innerHTML = results.data[0].name;
                document.getElementById('state2').innerHTML = results.data[1].name;
                document.getElementById('state3').innerHTML = results.data[2].name;
                document.getElementById('state4').innerHTML = results.data[3].name;
             } 
            })
          }

        getUrl();
        getStatus(status);
        getNum();
        getResult();
  } 

  function submit(){
        var editResult = document.getElementById('state1').innerHTML;
        var comments = document.getElementById('Note').value ;
        var productName = document.getElementById('Prod_Name').value ;
        var price = document.getElementById('Price').value ;
        $.ajax({
          url:"/api/v1/eventsList/" + syskey,
          type:'POST',
          data:{
            'editResult' : editResult,
            'comments'  : comments,
            'productName' :productName,
            'price' : price
          },
          success:function(data){
      
      
          window.location = `home.html`;
              
          //window.history.back();
          }

        })
    }

  /*
  // app.put('/api/v1/eventsList/:sysKey', 'eventsList.eventEdit'); // modify some eventList's info
  // attributes of the following object
  // {
  //     editResult,
  //     comments,
  //     productName,
  //     price
  // }
  */
