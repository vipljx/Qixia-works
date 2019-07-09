$(function(){
	// 住所地址
	var zhu = document.getElementById('zhuArea');
	var first = []; /* 省，直辖市 */
	var second = []; /* 市 */
	var third = []; /* 镇 */
	var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */
	var checked = [0, 0, 0]; /* 已选选项 */
	function creatList(obj, list){
	  obj.forEach(function(item, index, arr){
	  var temp = new Object();
	  temp.text = item.name;
	  temp.value = index;
	  list.push(temp);
	  })
	}
	creatList(city, first);
	if (city[selectedIndex[0]].hasOwnProperty('sub')) {
	  creatList(city[selectedIndex[0]].sub, second);
	} else {
	  second = [{text: '', value: 0}];
	}
	if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
	  creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
	} else {
	  third = [{text: '', value: 0}];
	}
	var picker1 = new Picker({
		data: [first, second, third],
	  selectedIndex: selectedIndex,
		title: '地址选择'
	});
	picker1.on('picker.select', function (selectedVal, selectedIndex) {
	  var text1 = first[selectedIndex[0]].text;
	  var text2 = second[selectedIndex[1]].text;
	  var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
		// zhu.innerText = text1 + ' ' + text2 + ' ' + text3;
		vm.zhu_city=text1 + ' ' + text2 + ' ' + text3;
		// $("#addr_can").val(text1 + ' ' + text2 + ' ' + text3);
	});
	picker1.on('picker.change', function (index, selectedIndex) {
	  if (index === 0){
		firstChange();
	  } else if (index === 1) {
		secondChange();
	  }
	  function firstChange() {
		second = [];
		third = [];
		checked[0] = selectedIndex;
		var firstCity = city[selectedIndex];
		if (firstCity.hasOwnProperty('sub')) {
		  creatList(firstCity.sub, second);
		  var secondCity = city[selectedIndex].sub[0]
		  if (secondCity.hasOwnProperty('sub')) {
			creatList(secondCity.sub, third);
		  } else {
			third = [{text: '', value: 0}];
			checked[2] = 0;
		  }
		} else {
		  second = [{text: '', value: 0}];
		  third = [{text: '', value: 0}];
		  checked[1] = 0;
		  checked[2] = 0;
		}
		picker1.refillColumn(1, second);
		picker1.refillColumn(2, third);
		picker1.scrollColumn(1, 0)
		picker1.scrollColumn(2, 0)
	  }
	  function secondChange() {
		third = [];
		checked[1] = selectedIndex;
		var first_index = checked[0];
		if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
		  var secondCity = city[first_index].sub[selectedIndex];
		  creatList(secondCity.sub, third);
		  picker1.refillColumn(2, third);
		  picker1.scrollColumn(2, 0)
		} else {
		  third = [{text: '', value: 0}];
		  checked[2] = 0;
		  picker1.refillColumn(2, third);
		  picker1.scrollColumn(2, 0)
		}
	  }
	});
	picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
	  //console.log(selectedVal);
	  //console.log(selectedIndex);
	});
	zhu.addEventListener('click', function () {
		picker1.show();
	});
	
	
	// 生产地址
	var sheng = document.getElementById('shengArea');
	var picker2 = new Picker({
		data: [first, second, third],
		selectedIndex: selectedIndex,
			title: '地址选择'
		});
	picker2.on('picker.select', function (selectedVal, selectedIndex) {
	var text1 = first[selectedIndex[0]].text;
	var text2 = second[selectedIndex[1]].text;
	var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
		// sheng.value = text1 + ' ' + text2 + ' ' + text3;
		vm.sheng_city=text1 + ' ' + text2 + ' ' + text3;
	});
	picker2.on('picker.change', function (index, selectedIndex) {
	if (index === 0){
		firstChange();
	} else if (index === 1) {
		secondChange();
	}
	function firstChange() {
		second = [];
		third = [];
		checked[0] = selectedIndex;
		var firstCity = city[selectedIndex];
		if (firstCity.hasOwnProperty('sub')) {
		creatList(firstCity.sub, second);
		var secondCity = city[selectedIndex].sub[0]
		if (secondCity.hasOwnProperty('sub')) {
			creatList(secondCity.sub, third);
		} else {
			third = [{text: '', value: 0}];
			checked[2] = 0;
		}
		} else {
		second = [{text: '', value: 0}];
		third = [{text: '', value: 0}];
		checked[1] = 0;
		checked[2] = 0;
		}
		picker2.refillColumn(1, second);
		picker2.refillColumn(2, third);
		picker2.scrollColumn(1, 0)
		picker2.scrollColumn(2, 0)
	}
	function secondChange() {
		third = [];
		checked[1] = selectedIndex;
		var first_index = checked[0];
		if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
		var secondCity = city[first_index].sub[selectedIndex];
		creatList(secondCity.sub, third);
		picker2.refillColumn(2, third);
		picker2.scrollColumn(2, 0)
		} else {
		third = [{text: '', value: 0}];
		checked[2] = 0;
		picker2.refillColumn(2, third);
		picker2.scrollColumn(2, 0)
		}
	}
	});
	picker2.on('picker.valuechange', function (selectedVal, selectedIndex) {
	//console.log(selectedVal);
	//console.log(selectedIndex);
	});
	sheng.addEventListener('click', function () {
		picker2.show();
	});	
})