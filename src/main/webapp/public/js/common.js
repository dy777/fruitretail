var curSearchObject = {};
var searchUrl = "";
var mainGrid = "";
var paramStr = "";
var saveUrl = "";
var deleteUrl = "";
var DataControls = [];
var DataControlContext = {};
DataControlContext.DataBindingForms = {};
DataControlContext.CurrentChangeEvent = {};
DataControlContext.MasterDetails = {};
// 页面操作状态
var operate = new Object();
operate.oprNone = 0;
operate.oprCustom = 1;
operate.oprAdd = 2;
operate.oprEdit = 3;
operate.oprDelete = 4;
// 当前页面的状态
var currentOperate = operate.oprNone;
var basicToolBarClientId = "MainToolBar";

	$.ajaxSetup({
	    xhrFields :  {
	        withCredentials: true
	    },
		dataFilter  : function(data,status){
			var json = $.parseJSON(data);
			if(json.result == "2"){
				var parent = window.parent;
				if(parent)
					parent.location.href = "/index";
				else
					window.location.href="/index";
			}
		return data;
	}
	});
Init = function() {
	mini.parse();
	for ( var o in mini.components) {
		if (mini.components[o].type == "datagrid") {
			DataControls.push(mini.components[o]);
			mini.components[o].on("selectionchanged", WhenCurrentChange);
			mini.components[o].on("beforeload", function(sender, args) {
				if (typeof (WhenGridBeforeload) != 'undefined') {
					WhenGridBeforeload(sender, args);
				}
			});

			mini.components[o].on("preload", function(args) {
				if (typeof (WhenGridPreLoad) != 'undefined') {
					WhenGridPreload(args);
				}
			});

			mini.components[o].on("load", function(args) {
				if (typeof (WhenGridLoad) != 'undefined') {
					WhenGridload(args.sender, args);
				}
			});
			mini.components[o].on("update", function(args) {
				if (args.sender._dataSource.dataview.length > 0) {
					if (!args.sender.isSelected(args.sender.data[0])) {
						args.sender.select(0);
					}
				}
				if (typeof (WhenGridUpdate) != 'undefined') {
					WhenGridUpdate(args.sender, args);
				}
			});
		}
		if (!mini.isNull(mini.components[o].property)) {
			mini.components[o].el.parentElement.ctrl = mini.components[o];
		}
	}

	for ( var master in DataControlContext.MasterDetails) {
		var main = mini.get(master);
		if (main.Details == null)
			main.Details = [];
		var detail;
		for (var i = 0; i < DataControlContext.MasterDetails[master].length; i++) {
			detail = mini.get(DataControlContext.MasterDetails[master][i]);
			main.Details.push(detail);
		}
	}
	for ( var datactrlid in DataControlContext.DataBindingForms) {
		var datactrl = mini.get(datactrlid);
		var form = DataControlContext.DataBindingForms[datactrlid];
		var db = new mini.DataBinding();
		if (form instanceof Array) {
			for (var i = 0; i < form.length; i++) {
				db.bindForm(form[i], datactrl);
				if (datactrl) {
					if (datactrl.Forms == null) {
						datactrl.Forms = [];
					}
					var f1 = new mini.Form(form[i]);
					datactrl.Forms.push(f1);
				}
			}
		} else {

			db.bindForm(form, datactrl);
			if (datactrl) {
				if (datactrl.Forms == null) {
					datactrl.Forms = [];
				}
				var f1 = new mini.Form(form);
				datactrl.Forms.push(f1);
			}
		}
	}
	SetEditControlStatus(false);
}

// 关联grid和它的从grid
AddMasterDetail = function(master, details) {
	DataControlContext.MasterDetails[master] = details;
}

// 关联grid和它的编辑区
AddDataBindingForms = function(datactrlid, forms) {
	DataControlContext.DataBindingForms[datactrlid] = forms;
}

// 注册grid的行切换事件
RegCurrentChangeEvent = function(datactrlid, fun) {
	DataControlContext.CurrentChangeEvent[datactrlid] = fun;
}

WhenCurrentChange = function(sender) {
	if (currentOperate == operate.oprNone) {
		if (sender.sender.id == mainGrid || sender.sender.id == mainGrid.id) {
			SetToolBarItemEnabledByRow(sender.selected);
		}
	}
	if (DataControlContext.CurrentChangeEvent[sender.sender.id]) {
		DataControlContext.CurrentChangeEvent[sender.sender.id](sender);
	}
}

// 复制新增
BasicCopyAdd = function(sender, args) {
	if (mainGrid && mainGrid != "") {
		var oprCtrl = mini.get(mainGrid);
		var obj = oprCtrl.getSelected();
		var newObj = mini.clone(obj);
		if (typeof (WhenCopyAdd) != 'undefined') {
			if (WhenCopyAdd(newObj, sender, args) == false) {
				return;
			}
		}
		BasicAddFunc(newobj, sender, args);
	}
}

// 新增
BasicAdd = function(sender, args) {
	BasicAddFunc({}, sender, args);
}

BasicAddFunc = function(newObj, sender, args) {
	SetGlobalOperation(operate.oprAdd);
	// 校验方法CheckBeforeAdd
	if (typeof (CheckBeforeAdd) != 'undefined') {
		if (CheckBeforeAdd(sender, args) == false) {
			ClearGlobalOperation();
			return;
		}
	}
	if (mainGrid && mainGrid != "") {
		var oprCtrl = mini.get(mainGrid);
		oprCtrl.clearSelect();
		newObj.id = null;
		newObj.operate = operate.oprAdd;
		// WhenAddRowCustomIndex设置新的数据添加再第几行
		if (typeof (WhenAddRowCustomIndex) != 'undefined') {
			WhenAddRowCustomIndex(oprCtrl, newObj);
		} else {
			// 默认添加在grid最后一行
			oprCtrl.addRow(newobj);
		}
		oprCtrl.select(newobj)
		oprCtrl.beginEditRow();
		SetToolBarItemEnabledWhenAddOrEdit();
		var sender = {};
		sender.newObj = newObj;
		sender.oprCtrl = oprCtrl;
		if (typeof (WhenBasicAdd) != 'undefined') {

			WhenBasicAdd(sender, args);

		}
		oprCtrl.updateRow(newObj, newObj);
		if (typeof (WhenAfterBasicAdd) != 'undefined') {
			WhenAfterBasicAdd(sender, args);
		}
	}
}

// 编辑方法
BasicEdit = function(sender, args) {
	SetGlobalOperation(operate.oprEdit);
	if (typeof (CheckBeforeEdit) != 'undefined') {
		if (CheckBeforeEdit(sender, args) == false) {
			ClearGlobalOperation();
			return;
		}
	}
	if (typeof (WhenBasicEdit) != 'undefined') {
		WhenBasicEdit(sender, args);
	}
	if (!mini.isNull(mainGrid)) {
		var oprCtrl = mini.get(mainGrid);
		oprCtrl.sourceEditObj = mini.clone(oprCtrl.data, false);
		oprCtrl.beginEditRow();
		oprCtrl.setAllowCellEdit(true);
	}
	SetToolBarItemEnabledWhenAddOrEdit();
	if (typeof (WhenAfterBasicEdit) != 'undefined') {
		WhenAfterBasicEdit(sender, args);
	}
}

// 保存
BasicSave = function(sender, args) {
	var rtn = CheckInputWhenSave(sender, args);
	if (rtn == undefined)
		rtn = true;
	if (rtn) {
		var oprCtrl = mini.get(mainGrid);
		var data = oprCtrl.getSelected();
		if (typeof (GetDataWhenSave) != 'undefined') {
			data = GetDataWhenSave(sender, args);// 在此方法自定义要提交的数据
		}
		var ctxObj = {};
		var loadingTitle = "执行中......";
		ctxObj.externObj = oprCtrl;
		var json = mini.encode(data);
		ctxObj.messageId = mini.loading(loadingTitle, "loading");
		jQuery.ajax({
			url : saveUrl,
			type : 'post',
			ctxObj : ctxObj,
			contentType : "application/json",
			data : json,
			timeout : 1000000,
			success : function(e) {
				var result= mini.decode(e);
				ctxObj.externObj.setAllowCellEdit(false);
				ctxObj.externObj.commitEditRow();
				ClearGlobalOperation();
				SetToolBarItemEnabledByRow(ctxObj.externObj.getSelected());
				if (DataControlContext.CurrentChangeEvent[oprCtrl.id]) {
					DataControlContext.CurrentChangeEvent[oprCtrl.id](sender);
				}
				// SetDataControlStatus(true);
				SetEditControlStatus(false);
				mini.alert(result.message);
				if (WhenAfterSave) {
					WhenAfterSave(result);
				}
			},
			complete : AjaxRequestComplete,
			error : AjaxRequestError
		});
	}
}

CheckInputWhenSave = function(sender, args) {
	return true;
}

// 取消
BasicCancel = function(sender, args) {
	// SetDataControlStatus(true);
	SetEditControlStatus(false);
	var oprCtrl = mini.get(mainGrid);
	var row = oprCtrl.getSelected();
	oprCtrl.setAllowCellEdit(false);
	oprCtrl.cancelEditRow(row);
	oprCtrl.setData(oprCtrl.sourceEditObj);
	SetGridWsdFormsData(oprCtrl, {});
	var preOpr = currentOperate;
	ClearGlobalOperation();
	var customObj = {};
	customObj.sender = oprCtrl;
	if (preOpr == operate.oprAdd) {
		if (oprCtrl.data.length > 0) {
			oprCtrl.select(oprCtrl.data[oprCtrl.data.length - 1]);
			customObj.selected = oprCtrl.data[oprCtrl.data.length - 1];
		} else {
			SetToolBarItemEnabledByRow(null);
			customObj.selected = null;
		}
	} else if (preOpr == operate.oprEdit) {
		SetToolBarItemEnabledByRow(row);
		customObj.selected = row;
	}
	if (DataControlContext.CurrentChangeEvent[oprCtrl.id]) {

		DataControlContext.CurrentChangeEvent[oprCtrl.id](customObj);
	}
}
// 删除方法
BasicDelete = function(sender, args) {
	mini.confirm("确定删除该数据？", "确定？", function(action) {
		if (action != "ok") {
			return;
		}
		var oprCtrl = mini.get(mainGrid);
		var data = oprCtrl.getSelecteds();
		if (typeof (GetDataWhenDelete) != 'undefined') {
			data = GetDataWhenDelete(sender, args);
		}
		var ctxObj = {};
		var loadingTitle = "执行中......";
		ctxObj.externObj = oprCtrl;
		var json = mini.encode(data);
		ctxObj.messageId = mini.loading(loadingTitle, "loading");
		jQuery.ajax({
			url : deleteUrl,
			type : 'post',
			ctxObj : ctxObj,
			contentType : "application/json",
			data : json,
			timeout : 1000000,
			success : function(ctxObj, result) {
				if (result.oprSuccess) {
					var rows = ctxObj.externObj.getSelecteds();
					if (rows != null && rows.length > 0) {
						ctxObj.externObj.removeRows(rows, true);
						SetToolBarItemEnabledByRow(rows[0]);
					}
				}
				if (result.message != "" && result.message != null) {
					mini.alert(result.message);
				}
			},
			complete : AjaxRequestComplete,
			error : AjaxRequestError
		});
	});
}

// 设置页面状态
SetGlobalOperation = function(opr) {
	currentOperate = opr;
}

// 清除页面状态
ClearGlobalOperation = function() {
	currentOperate = operate.oprNone;
}

SetGridWsdFormsData = function(grid, data) {
	if (grid.Forms != null && grid.Forms.length > 0) {
		for (var i = 0; i < grid.Forms.length; i++) {
			grid.Forms[i].setData(data);
		}
	}
}

SetToolBarItemEnabledByRow = function(entity) {
	SetToolBarItemEnabled(false);
	SetToolBarItemEnabledByValue("_BasicAdd", true);
	if (entity != null) {
		SetToolBarItemEnabledByValue("_BasicEdit", true);
		SetToolBarItemEnabledByValue("_BasicDelete", true);
	}
}

// 新增或编辑时设置工具栏按钮
SetToolBarItemEnabledWhenAddOrEdit = function() {
	// SetDataControlStatus(false);
	SetEditControlStatus(true);
	SetToolBarItemEnabled(false);
	SetToolBarItemEnabledByValue("_BasicSave", true);
	SetToolBarItemEnabledByValue("_BasicCancel", true);
}

// 设置某个item的Enabled
SetToolBarItemEnabledByValue = function(barItemValue, isEnabled) {
	if (typeof (basicToolBarClientId) != 'undefined') {
		var basicToolBar = $(basicToolBarClientId);

		if (basicToolBar != null) {
			var baritem = mini.get(barItemValue);
			if (baritem != null) {
				if (isEnabled) {
					baritem.enable();
				} else {
					baritem.disable();
				}
			}
		}
	}
}

// 设置所有toolbar上的
SetToolBarItemEnabled = function(isEnabled) {
	if (typeof (basicToolBarClientId) != 'undefined') {
		var basicToolBar = mini.get(basicToolBarClientId);
		if (basicToolBar != null) {
			var childs = mini.getChildControls(basicToolBar);
			for (var i = 0; i < childs.length; i++) {
				if (isEnabled) {
					childs[i].enable();
				} else {
					childs[i].disable();
				}
			}
		}
	}
}

SetDataControlStatus = function(isEnabled) {
	for (var o = 0; o < DataControls.length; o++) {
		DataControls[o].setEnabled(isEnabled);
		SetPagerEnabled(DataControls[o], isEnabled);

		DataControls[o].allowRowSelect = isEnabled;
		DataControls[o].allowSortColumn = isEnabled;
	}
}

SetPagerEnabled = function(ctr, isEnabled) {
	if (ctr._pagers != null && ctr._pagers.length > 0) {
		for (var i = 0; i < ctr._pagers.length; i++) {
			var _pager = ctr._pagers[i];
			if (_pager.firstButton)
				_pager.firstButton.setEnabled(isEnabled);
			if (_pager.prevButton)
				_pager.prevButton.setEnabled(isEnabled);
			if (_pager.nextButton)
				_pager.nextButton.setEnabled(isEnabled);
			if (_pager.lastButton)
				_pager.lastButton.setEnabled(isEnabled);
			if (_pager.reloadButton)
				_pager.reloadButton.setEnabled(isEnabled);
			if (_pager.sizeCombo)
				_pager.sizeCombo.setEnabled(isEnabled);
			if (_pager.numInput)
				_pager.numInput.disabled = !isEnabled;
		}
	}
}

SetEditControlStatus = function(isEnabled) {
	for ( var o in DataControls) {
		if (DataControls[o].WsdForms) {
			for (var i = 0; i < DataControls[o].Forms.length; i++) {
				SetEnabledInWsdForms(DataControls[o].Forms[i], isEnabled);
			}
		}
	}
}

// 设置form内的控件是否可用
SetEnabledInWsdForms = function(Form, isEnabled) {
	var controls = Form.getFields();
	for (var j = 0, l = controls.length; j < l; j++) {
		var control = controls[j];
		control.setEnabled(isEnabled);
	}
}

QuickSearch = function() {
	SetFromQuickArea();
	var json = curSearchObject;
	if (typeof WhenBeforeQuickSearch != 'undefined') {
		WhenBeforeQuickSearch(requestInfo);
	}
	CallbackGrid(json, function(args) {
		mini.get(mainGrid).setData(args.content.rows);
		if (typeof WhenAfterQuickSearch != 'undefined') {
			WhenAfterQuickSearch(args);
		}
	});
}

SetFromQuickArea = function() {
	curSearchObject.conditions = [];
	//curSearchObject.pageIndex = mini.get(mainGrid).getPageIndex();
	//curSearchObject.pageSize = mini.get(mainGrid).getPageSize();
	//curSearchObject.sortField = mini.get(mainGrid).getSortField();
	//curSearchObject.sortOrder = mini.get(mainGrid).getSortOrder();
	var quickArea = mini.byId("AreaQuickSearch");
	for (var i = 0; i < quickArea.rows.length; i++) {
		for (var j = 0; j < quickArea.rows[i].cells.length; j++) {
			var ctrl = quickArea.rows[i].cells[j].ctrl;
			if (ctrl) {
				var obj = GetCtrlValueAndText(ctrl);
				if (obj && obj.value) {
					var cd = {};
					cd.property = ctrl.property;
					cd.value = obj.value;
					cd.operater = ctrl.operater;
					cd.propertyType = ctrl.propertyType;
					curSearchObject.conditions.push(cd);
				}
			}
		}
	}
}

GetCtrlValueAndText = function(ctrl) {
	if (ctrl == null)
		return null;
	var obj = {};
	if (ctrl.type == "combobox") {
		var text = ctrl.getText();
		var value = ctrl.getValue();
		if (text != "所有" && value != "null") {
			obj.text = text;
			obj.value = value;
		}
	} else if (ctrl.type == "radiobuttonlist") {
		var b = ctrl.getValue();
		if (b != "undefined" && b != "null" && b != "") {
			obj.value = b;
		}
	} else if (ctrl.type == "textbox") {
		obj.value = obj.text = ctrl.getValue();
	} else if (ctrl.type == "datepicker") {
		obj.text = ctrl.getText();
		if (!mini.isNull(obj.text) && obj.text != "") {
			obj.value = DatetoString(ctrl.getValue(), "yyyy-MM-dd hh:mm:ss");
		}
	} else if (ctrl.type == "monthpicker") {
		obj.text = ctrl.getText();
		if (!mini.isNull(obj.text) && obj.text != "") {
			if (ctrl.format == "yyyy") {
				obj.value = DatetoString(ctrl.getValue(), "yyyy");
			} else {
				obj.value = DatetoString(ctrl.getValue(), "yyyy-MM");
			}
		}
	} else if (ctrl.type == "yearpicker") {
		obj.text = ctrl.getText();
		if (!mini.isNull(obj.text) && obj.text != "") {
			obj.value = ctrl.getValue();
		}
	} else if (ctrl.type == "buttonedit") {
		var text = ctrl.getText();
		var value = ctrl.getValue();
		if (text != "" && value != "null") {
			obj.text = text;
			obj.value = value;
		}
	} else if (ctrl.type == "checkboxlist") {
		var value = ctrl.getValue();
		obj.value = value;
	} else if (ctrl.type == "checkbox") {
		var value = ctrl.getValue();
		obj.value = value;
	}
	return obj;
}
var importTemplate = "<div id='import-win' class='mini-window' title='导入' style='width:400px;height:250px;' showMaxButton='true' showCollapseButton='true' showShadow='true' showToolbar='true' showFooter='true' showModal='false' allowResize='true' allowDrag='true'>"
+"<div property='toolbar' style='padding:5px;'>"
+"<a href='?1'>下载模版</a><br/><form id='import-win-form' action='?2' enctype='multipart/form-data'>上传<input type='file' name='file'><button type='button' onclick='commonUtil.importSubmit()'>上传</button></form>"
+" </div>";
var commonUtil = {
	getSelect : function(id){
		var grid = mini.get(id);
		var row = grid.getSelected();
		if(!row){
			mini.alert("未选择记录");
			return;
		}
		return row;
	},

	getSelects : function(id){
		var grid = mini.get(id);
		var rows = grid.getSelecteds();
		if(rows.length==0){
			mini.alert("未选择记录");
			return;
		}
		return rows;
	},
	
	importInit : function(id,templateUrl,importUrl){
		   var it = importTemplate.replace('?1',templateUrl).replace('?2',importUrl).replace('?3',id);
		   $('body').append(it);
		   mini.get(id).on('click',function(){
			   var win = mini.get("import-win");
		       win.showAtPos(400, 10);
		   })
		  
	},
	importSubmit: function(){
		var form = jQuery("#import-win-form");
		var options = {
			url : form.attr('action'),
			type : 'post',
			success : function(json) {
				mini.alert(json.message);
			}
		};
		form.ajaxSubmit(options);
		mini.get('import-win').hide();
	}
}

CallbackGrid = function(requestInfo, callbackFunc) {
	paramStr = "";
	JsonToMVCString(requestInfo);
	mini.ajax({
		url : searchUrl,
		async : true,
		data : paramStr.substring(0, paramStr.length - 1),
		dataType : "json",
		timeout : 1000000,
		// contentType:"application/json;charset=utf-8",
		type : "post",
		success : function(result) {
			if (callbackFunc) {
				callbackFunc(result);
			}
		},
		complete : AjaxRequestComplete,
		error : AjaxRequestError
	});
}

AjaxRequestError = function(jqXHR, textStatus, errorThrown) {
	alert(jqXHR.responseText);
}

AjaxRequestComplete = function(sender) {
	if (this.ctxObj) {
		mini.hideMessageBox(this.ctxObj.messageId);
		this.ctxObj = null;
	}
}

JsonToMVCString = function(json, parent, index) {
	for ( var item in json) {
		if (json[item] instanceof Array) {
			for (var i = 0; i < json[item].length; i++) {
				if (json[item][i] != undefined)
					JsonToMVCString(json[item][i], item, i);
			}
			continue;
		}
		if (parent == undefined)
			paramStr += item + "=" + json[item];
		else
			paramStr += parent + "[" + index + "]." + item + "=" + json[item];
		paramStr += "&";
	}
}

DatetoString = function(date, formatStr) {
	if (typeof (formatStr) == "undefined"
			&& typeof (date.toLocaleString) != 'undefined')
		return date.toLocaleString();
	var timeValues = function() {
	};
	timeValues.prototype = {
		year : function() {
			if (formatStr.indexOf("yyyy") >= 0) {
				return date.getFullYear();
			} else {
				return date.getYear().toString().substr(2);
			}
		},
		elseTime : function(val, formatVal) {
			return formatVal >= 0 ? (val < 10 ? "0" + val : val) : (val);
		},
		month : function() {
			return this.elseTime(date.getMonth() + 1, formatStr.indexOf("MM"));
		},
		day : function() {
			return this.elseTime(date.getDate(), formatStr.indexOf("dd"));
		},
		hour : function() {
			return this.elseTime(date.getHours(), formatStr.indexOf("hh"));
		},
		minute : function() {
			return this.elseTime(date.getMinutes(), formatStr.indexOf("mm"));
		},
		second : function() {
			return this.elseTime(date.getSeconds(), formatStr.indexOf("ss"));
		}
	}
	var tV = new timeValues();
	var replaceStr = {
		year : [ "yyyy", "yy" ],
		month : [ "MM", "M" ],
		day : [ "dd", "d" ],
		hour : [ "hh", "h" ],
		minute : [ "mm", "m" ],
		second : [ "ss", "s" ]
	};
	try {
		for ( var key in replaceStr) {

			formatStr = formatStr.replace(replaceStr[key][0], eval("tV." + key
					+ "()"));
			formatStr = formatStr.replace(replaceStr[key][1], eval("tV." + key
					+ "()"));
		}
	} catch (e) {

	}
	return formatStr;
}