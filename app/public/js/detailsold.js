var status = getSearchString('status') ;
var syskey = getSearchString('syskey') ;

var cookie = new CookieStorage('/');
const userId = cookie.getItem('userId');


window.onload = function(){
$('#back').click(back);
$('#btn').click(submit);

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
        
        //console.log("/api/v1/eventsList/editInfo/"+syskey);

        var check_result = results.data.editresult;

        document.getElementById('date').innerHTML = handleTime(results.data.createat);
        document.getElementById('status').innerHTML = pairs[results.data.status];
        
        document.getElementById("example_video_1").src = results.data.videourl;

        document.getElementById('Name').value = results.data.cashiername?results.data.cashiername:results.data.cashierid?results.data.cashierid:'pos机';
        document.getElementById("Name").disabled=true;
        
        document.getElementById('Id').value = results.data.transid;
        document.getElementById("Id").disabled=true;

        document.getElementById('Note').value = results.data.comments;
        document.getElementById('Prod_Name').value =results.data.productname;
        document.getElementById('Price').value = results.data.price;

        getResult(check_result);
        }
    })
}

  // get resultlist
  
  function getResult(check_result){
      
        $.ajax({
          url:"/api/v1/editResultList",
          type:'GET',
          success:function(results){

          //console.log(results);
          //console.log(results.data.length); 需要显示的下拉列表的数目
          //select select id ="mySelect" class="form-control">
          //<option id ="state0"></option>

        for (var i = 0; i < results.data.length; i++) {
          var mes =document.createElement('option');
          mes.setAttribute('id','state'+i.toString() );
          mes.innerHTML = results.data[i].name;
          document.getElementById('mySelect').appendChild(mes);
        }

        for(var num = 0 ;num < results.data.length; num++){
            var temp = 'state' + num.toString();          
            document.getElementById(temp.toString()).innerHTML= '';
            //results.data[num].name;
        }

        for(var num = 0 ;num < results.data.length ; num++){
            if (results.data[num].name == check_result){
                var tt = results.data[0].name ;
                results.data[0].name = results.data[num].name; 
                results.data[num].name = tt ;
            }
        }
        
        for(var num = 0 ;num < results.data.length; num++){
            var temp = 'state' + num.toString();          
            document.getElementById(temp.toString()).innerHTML= results.data[num].name;
          }
        
    }
    })
    }

  getNum();
}

  function back(){
     if(status == 0){
       window.location=`checker.html?listType=0`;
      }
      else if(status == 1){
        window.location=`checker.html?listType=1`;
      }
      else if(status == 2){
        window.location=`checker.html?listType=2`;
      }
   }

  function submit(){

          var ss = $("#mySelect option:selected").text(); 
          var editResult = ss ;

          var comments = document.getElementById('Note').value ;
          var productName = document.getElementById('Prod_Name').value ;
          var price = document.getElementById('Price').value ;
        if(status == 2){
        window.location=`checker.html?listType=2`;
         }
        else {
          if( comments !='' && productName !='' && (price > 0)){
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
                type:'POST',
                success:function(){
                  console.log(this.url);
                }
              })
              window.location=`checker.html?listType=1`;
              }
          });
        }    
        else {        
          if (comments ==''){
              alert("请正确填写备注");
          }
          else if (productName ==''){
              alert("请正确填写商品名称");
            }
          else  alert("请正确填写金额");
        }
      }
  }