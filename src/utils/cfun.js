
function ajax(url,fnSuc,fnFai,method,info,text_or_xml,_this)
{
		//创建ajax对象
		var oAjax = null;
		if(window.XMLHttpRequest)
			oAjax = new window.XMLHttpRequest();
		else
			oAjax = new window.ActiveXObject("Microsoft.XMLHTTP");
		//缓存
		//连接服务器,发送请求
		if(method == null || method == 'GET')
		{
			oAjax.open('GET',url,true);
			//oAjax.setRequestHeader("If-Modified-Since","Tue, 28 Jul 2016 09:50:35 GMT");
			oAjax.send();
		}else if(method == 'POST'){
			oAjax.open('POST',url,true);
			//oAjax.setRequestHeader("If-Modified-Since","Tue, 28 Jul 2016 09:50:35 GMT");
			oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			oAjax.send(info);
		}
		//接受返回
		oAjax.onreadystatechange = function()
		{
			if(oAjax.readyState == 4)
			{
				if(oAjax.status == 200)
				{
					console.log(url);
					//alert('suc and: ' + oAjax.responseXML);
					if(text_or_xml == 'text'){
						if(_this)
							fnSuc(oAjax.responseText,_this);
						else
							fnSuc(oAjax.responseText);
					}
					else
						fnSuc(oAjax.responseXML);
				}
				else
				{
					console.log('fail');
					fnFai();
				}
			}
		}
}
export { ajax }