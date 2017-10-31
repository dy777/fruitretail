package com.retail.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retail.domain.Data;
import com.retail.service.IDataService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Controller
@Api(description = "用户相关接口文档")
public class logincontr {
	@Resource  
    private IDataService dataService = null; 
	
	@RequestMapping(value="/login",method = RequestMethod.GET)  
	@ResponseBody
	@ApiOperation(value = "通过ID查询USER信息", httpMethod = "GET", notes = "暂无")
	public Data login(){
		Data data = dataService.getDataById(2);
		//System.out.println("ssssss");
		return data;
	}
}
