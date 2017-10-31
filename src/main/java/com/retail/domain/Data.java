package com.retail.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "用户信息")
public class Data {
	
	@ApiModelProperty(value = "用户id", required = true)
    private Integer id;

	@ApiModelProperty(value = "昵称", required = true)
    private Integer data;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getData() {
        return data;
    }

    public void setData(Integer data) {
        this.data = data;
    }
}