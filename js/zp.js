function ttb(obj,dis){
	var n=0;
	var left=obj.offsetLeft;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n+=(dis-left)/30;
		n*=0.82;
		left+=n;
		if(Math.round(n)==0 && Math.round(left)==dis){
			clearInterval(obj.timer);
		}
		obj.style.left=left+n+'px';
	},30);
}
function rng(n,m){
	return parseInt(Math.random()*(m-n)+n);
};
function getPI(obj,ev){
	var w=obj.offsetWidth;
	var h=obj.offsetHeight;
	var oTop=document.documentElement.scrollTop||document.body.scrollTop;
	//var oLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	var x=obj.offsetLeft+w/2-(ev.clientX);
	var y=obj.offsetTop+h/2-(ev.clientY+oTop);
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
window.onload=function(){
	var oUl=document.getElementById('head');
	var oCq=document.getElementById('cq');
	var oActive=document.getElementById('active');
	var oTop=document.documentElement.scrollTop||document.body.scrollTop;
	(function(){
		var oShow=document.getElementById('show');
		var Amx=oShow.children;
		var aLi=Amx[0].getElementsByTagName('li');
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0; i<aLi.length; i++){
					aLi[i].className='';
					Amx[i+1].style.display='none';
				}
				this.className='active';
				Amx[this.index+1].style.display='block';
				show();
			};
		}
	})();
	(function(){
		var aLi=oUl.children;
		for(var i=0; i<aLi.length-1; i++){
			aLi[0].onmouseover=function(){
				document.documentElement.scrollTop=document.body.scrollTop=0;
				this.style.color='blue';
				this.style.lineHeight=30+'px';
				ttb(oActive,this.offsetLeft);
			};
			aLi[1].onmouseover=function(){
				document.documentElement.scrollTop=document.body.scrollTop=540;
				this.style.color='blue';
				this.style.lineHeight=30+'px';
				ttb(oActive,this.offsetLeft);
			};
			aLi[2].onmouseover=function(){
				document.documentElement.scrollTop=document.body.scrollTop=1160;
				this.style.color='blue';
				this.style.lineHeight=30+'px';
				ttb(oActive,this.offsetLeft);
			};
			aLi[3].onmouseover=function(){
				this.style.color='blue';
				this.style.lineHeight=30+'px';
				ttb(oActive,this.offsetLeft);
				
			};
			aLi[i].onmouseout=function(){
				this.style.color='#d4d2d3';
				this.style.lineHeight=50+'px';
			}
		}
	})();
	(function(){
		var aLi=oCq.getElementsByTagName('li');
		for(var i=0; i<aLi.length; i++){
			aLi[i].onmouseenter=function(ev){
				var oEvent=ev||event;
				var n=getPI(this,oEvent);
				switch(n){
					case 1:
						this.children[0].style.left=0+'px';
						this.children[0].style.top=200+'px';
						move(this.children[0],{left:0, top:0});
					break;
					case 2:
						this.children[0].style.left=-200+'px';
						this.children[0].style.top=0+'px';
						move(this.children[0],{left:0, top:0});
					break;
					case 3:
						this.children[0].style.left=0+'px';
						this.children[0].style.top=-200+'px';
						move(this.children[0],{left:0, top:0});
					break;
					case 0:
						this.children[0].style.left=200+'px';
						this.children[0].style.top=0+'px';
						move(this.children[0],{left:0, top:0});
					break;
				}
			};
			aLi[i].onmouseleave=function(ev){
				var oEvent=ev||event;
				var n=getPI(this,oEvent);
				switch(n){
					case 1:
						move(this.children[0],{left:0, top:200});
					break;
					case 2:
						move(this.children[0],{left:-200, top:0});
					break;
					case 3:
						move(this.children[0],{left:0, top:-200});
					break;
					case 0:
						move(this.children[0],{left:200, top:0});
					break;
				}
			};
		}
	})();
	(function(){
		var oDiv=document.getElementById('div1');
		var oImg=oDiv.getElementsByTagName('img');
		var oBtn=document.querySelector('#btn');
		var arr=[];
		for(var i=0; i<oImg.length; i++){
			arr[i]=oImg[i].className;
		}
		var inix=true;
		oBtn.onclick=function(){
			if(!inix)return;
			inix=false;
			var oMin=document.querySelector('.min');
			arr.unshift(arr.pop());
			for(var i=0; i<oImg.length; i++){
				oImg[i].className=arr[i];
			}
			oMin.addEventListener('transitionend',toReady,false);
			function toReady(){
				inix=true;
				oMin.removeEventListener('transitionend',toReady,false);
			};
		};
	})();
	(function(){
		var oBox=document.querySelector('#box1');
		oBox.innerHTML='';
		var R=9;
		var C=5;
		for(var r=0; r<R; r++){
			for(var c=0; c<C; c++){
				var oSpan=document.createElement('span');
				oSpan.style.left=r*100+'px';
				oSpan.style.top=c*100+'px';
				oSpan.style.backgroundPosition=-r*100+'px -'+c*100+'px';
				oBox.appendChild(oSpan);
			}
		}
		var aSpan=oBox.children;
		var inow=0;
		var a=true;
		oBox.onclick=function(){
			if(!a)return;
			a=false;
			inow++;
			oBox.style.backgroundImage='url(img1/'+(inow%8+1)+'.JPG)';
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.transition='1s all linear';
				var X=aSpan[i].offsetLeft-oBox.offsetWidth/2+aSpan[i].offsetWidth/2;
				var Y=aSpan[i].offsetTop-oBox.offsetHeight/2+aSpan[i].offsetHeight/2;
				aSpan[i].style.transform='perspective(1200px) translate('+X+'px, '+Y+'px) rotateY('+rng(-180,180)+'deg) rotateX('+rng(-180,180)+'deg) scale(2)';
				aSpan[i].style.opacity=0;
			}
		};
		aSpan[0].addEventListener('transitionend',function(){
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.transition='none';
				aSpan[i].style.transform='perspective(1200px) translate(0px, 0px) rotateY(0deg) rotateX(0deg) scale(1)';
				aSpan[i].style.opacity=1;
				aSpan[i].style.backgroundImage='url(img1/'+(inow%8+1)+'.JPG)';
				a=true;
			}
		},false);
	})();
	function show(){
		(function(){
			var oBox2=document.getElementById('box2');
			var R=9;
			var C=5;
			var inow=0;
			oBox2.innerHTML='';
			for(var c=0; c<C; c++){
				for(var r=0; r<R; r++){
					var sSpan=document.createElement('span');
					var W=parseInt(getStyle(oBox2,'width'));
					var H=parseInt(getStyle(oBox2,'height'));
					sSpan.style.transition='1s all ease '+200*(c+r)+'ms';
					sSpan.style.width=W/R+'px';
					sSpan.style.height=H/C+'px';
					sSpan.style.top=c*H/C+'px';
					sSpan.style.left=r*W/R+'px';
					sSpan.c=c;
					sSpan.r=r;
					sSpan.innerHTML='<i class="face"></i><i class="back"></i>';
					sSpan.children[0].style.backgroundPosition=-r*W/R+'px -'+c*H/C+'px';
				sSpan.children[1].style.backgroundPosition=-r*W/R+'px -'+c*H/C+'px';
					oBox2.appendChild(sSpan);
				}
			}
			var aSpan=oBox2.children;
			oBox2.onclick=function(){
				for(var i=0; i<aSpan.length; i++){
					aSpan[i].style.transition='1s all ease '+200*(aSpan[i].r+aSpan[i].c)+'ms';
					aSpan[i].style.transform='perspective(800px) rotateY(180deg)';
				}
			};
			aSpan[aSpan.length-1].addEventListener('transitionend',function(){
				inow++;
				for (var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.transition='none';
					aSpan[i].style.transform='perspective(800px) rotateY(0deg)';
					aSpan[i].children[0].style.backgroundImage='url(img1/'+inow%9+'.jpg)';
					aSpan[i].children[1].style.backgroundImage='url(img1/'+(inow+1)%9+'.jpg)';
				}
			},false);
		})();	
	}
	(function(){
		var oBox=document.querySelector('#box');
		oBox.onclick=function(){
			oBox.innerHTML='';
			var N=11;
			for(var i=0; i<N; i++){
				var oLi=document.createElement('li');
				oLi.style.transition='0.4s all linear '+(N-i)*200+'ms';
				oLi.style.backgroundImage='url(img1/'+(i+1)+'.JPG)';
				oBox.appendChild(oLi);
				(function(obj,index){
					setTimeout(function(){
							obj.style.WebkitTransform='perspective(1500px) rotateY('+360*index/N+'deg) translateZ(350px)';	
					},0)
					
				})(oLi,i);
			}
			var aLi=oBox.children;
			var y=0;
			var x=-15;
			document.onmousedown=function(ev){
				var disX=ev.clientX-y;
				var disY=ev.clientY-x;
				document.onmousemove=function(ev){
					x=ev.clientY-disY;
					y=ev.clientX-disX;
					for(var i=0; i<aLi.length; i++){
						aLi[i].style.transition='none';
					    aLi[i].style.transform='perspective(1500px) rotateY('+(360*i/N+y/4)+'deg) translateZ(350px)';
						oBox.style.transform='perspective(1500px) rotateX('+(-x/4-15)+'deg)';
					}	
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				};
				return false;
			};
		};
	})();	
};