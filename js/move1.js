function setStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
function move(obj,json,complete){
	clearInterval(obj.timer);
	complete=complete || {};
	complete.time=complete.time || 500;

	complete.easing=complete.easing || 'linear';
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseInt(setStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor(complete.time/30);
	var n=0;
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(complete.easing){
				case 'linear':
					var a=n/count;
					var cur=dis[name]*a;
				break;
				case 'ease-in':
					var a=n/count;
					var cur=dis[name]*a*a*a;
				break;
				case 'ease-out':
					var a=1-n/count;
					var cur=dis[name]*(1-a*a*a);
				break;
			}
			if(name=='opacity'){
				obj.style[name]=start[name]+cur;
				obj.style.filter='alpha(opacity='+(start[name]+cur)*100+')';
			}else{
				obj.style[name]=start[name]+cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			complete.fn && complete.fn();
		}
	},30);
}
