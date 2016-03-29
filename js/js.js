
/*function init(){
	var divGroup = document.getElementById('divGroup');
	divGroup.innerHTML =  'hey';	
}

init();    为何会报错呢！！！！   */

window.onload = function(){
	
	var initArray = [ ];
	var arrayDiv = [ ];
	var inputNum;
	var bool;

	var oDivGroup = document.getElementById('divGroup');
	var oBtnGroup = document.getElementById('btnGroup');
	var arrayBtn = oBtnGroup.getElementsByTagName('input');

	//渲染队列以及给队列元素绑定单击事件
	function chartRender(){
		oDivGroup.innerHTML = '';

		//生成队列
		for(var i=0;i<initArray.length;i++){
			oDivGroup.innerHTML += '<div style="height:'+initArray[i]+'px"></div>';
		}

		//给生成的队列元素绑定单击事件
		arrayDiv = oDivGroup.getElementsByTagName('div');
		for(var i=0;i<arrayDiv.length;i++){
			arrayDiv[i].index = i;				//自定义index属性，来保存i，即该元素在数组中的下标
			arrayDiv[i].onclick = function(){
				initArray.splice(this.index,1);		//删除该元素

				//此处用到递归函数，因为删除元素后，需要重新渲染队列和绑定单击事件
				chartRender();
			}
		}
	}


	//获取用户输入数据，并进行检测是否符合要求
	function inputCheck(){
		var oUserInput = document.getElementById('userInput');
		inputNum = parseInt(oUserInput.value);

		bool = true;
		if(inputNum < 10 || inputNum > 100){
			alert('只能输入10-100的数哦');
			bool = false;
			
		}
		if(initArray.length >= 60){
			alert('已经超过60个啦！');
			bool = false;
		}

		return bool;
	}

	//排序
	function sortData(){
		var tempArray = [];
		var tempVar;

		//将数组值赋给临时数组
		for(var k in initArray){
			tempArray[k] = initArray[k];
		}

		for(i=0;i<tempArray.length;i++){
			for(var j=0;j<tempArray.length-i;j++){
				if (tempArray[j] < tempArray[j+1]) {
					tempVar = tempArray[j];
					tempArray[j] = tempArray[j+1];
					tempArray[j+1] = tempVar; 
				}
			}
		}
		alert('从大到小顺序为：'+tempArray);
	}
	

	//分别绑定按钮事件
	arrayBtn[0].onclick = function(){
		inputCheck();

		if(bool == true){
			initArray.unshift(inputNum);

			chartRender();
	
		};
	}

	arrayBtn[1].onclick = function(){
		inputCheck();

		//用户输入满足条件方可添加
		if(bool == true){
			initArray.push(inputNum);
			chartRender();
		
		}
	}

	arrayBtn[2].onclick = function(){
		if (initArray.length == 0) {
			return false;
		}
		initArray.splice(0,1);
		chartRender();

	}

	arrayBtn[3].onclick = function(){
		if (initArray.length == 0) {
			return false;
		}
		initArray.splice(initArray.length-1,1);
		chartRender();

	}

	arrayBtn[4].onclick = sortData;


}