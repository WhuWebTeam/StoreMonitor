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


function dateFormat(timestamp) {
  timestamp = +timestamp;
  const time = new Date(timestamp);
  return time.getFullYear() + '/' + time.getMonth() + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
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
              document.getElementById('date').innerHTML = dateFormat(results.data.createat);
              document.getElementById('status').innerHTML = pairs[results.data.status];

              document.getElementById('Url').src =results.data.videourl;
              document.getElementById('example_video_1').poster =results.data.pic1url;

              document.getElementById('Name').value = results.data.cashiername?results.data.cashiername:results.data.cashierid?results.data.cashierid:'pos机';
              document.getElementById('Id').value = results.data.transid;

              document.getElementById('Note').value = results.data.comments;
              document.getElementById('Prod_Name').value =results.data.productname;
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

      var ss = $("#mySelect option:selected").text(); 
 
        var editResult = ss ;
        var comments = document.getElementById('Note').value ;
        var productName = document.getElementById('Prod_Name').value ;
        var price = document.getElementById('Price').value ;
        if(status == 2){
          window.location='home.html?listType=2';
        }else{
          $.ajax({
            url:"/api/v1/eventsList/" + syskey,
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
                type:'POST',
                success:function(){
                  console.log(this.url);
                }
              })
              window.location='home.html?listType=1';
              }
          });
        }
        
    }