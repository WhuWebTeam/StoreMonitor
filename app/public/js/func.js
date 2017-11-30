/*handle class*/
	function hasClass(elem, cls) {
	  cls = cls || '';
	  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
	  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	}

	function addClass(elem, cls) {
	  if (!hasClass(elem, cls)) {
	    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
	  }
	}

	function removeClass(elem, cls) {
	  if (hasClass(elem, cls)) {
	    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
	    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
	      newClass = newClass.replace(' ' + cls + ' ', ' ');
	    }
	    elem.className = newClass.replace(/^\s+|\s+$/g, '');
	  }
	}
/*handle class*/


/* handle time */
	function handleTime(num){
		num = parseInt(num);
		var now = new Date(num),
               y = now.getFullYear(),
               m = now.getMonth() + 1,
               d = now.getDate();
		return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);

	}
/* handle time */


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


/*stop propagation*/
	function preventBubble(event){  
		var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容  
			if (e && e.stopPropagation) {  
				e.stopPropagation();  
			} else if (window.event) {  
				window.event.cancelBubble = true;  
		}  
	}
/*stop propagation*/



/*get url query*/
function getSearchString(key) {
     // 获取URL中?之后的字符
     var str = location.search;
     str = str.substring(1,str.length);
     
     // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
     var arr = str.split("&");
     var obj = new Object();
     
    // 将每一个数组元素以=分隔并赋给obj对象    
    for(var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}
/*get url query*/