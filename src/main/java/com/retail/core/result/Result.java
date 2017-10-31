package com.retail.core.result;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 通用结果类
 *
 * @author:  <br>
 * @version: 1.0 <br>
 * @date: 2017-01-13 上午11:22:43
 */
@SuppressWarnings("serial")
public class Result<T> implements Serializable {

    /**
     * 调用接口是否成功，系统级别
     */
    protected boolean success = true;

    /**
     * 返回结果中附带的信息
     */
    protected Map<String, Object> otherModel = new HashMap<String, Object>();


    /**
     * 标准化的错误信息或者是其他错误信息
     */
    protected String code;

    /**
     * 错误消息
     */
    protected String message;

    private T data;

    public boolean isSuccess() {
        return success;
    }


    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Map<String, Object> getOtherModel() {
        return otherModel;
    }

    public void setOtherModel(String value, Object object) {
        otherModel.put(value, object);
    }


    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public void setOtherModel(Map<String, Object> otherModel) {
		this.otherModel = otherModel;
	}

	@Override
	public String toString() {
		return "Result [success=" + success + ", otherModel=" + otherModel
				+ ", code=" + code + ", message=" + message + ", data=" + data
				+ "]";
	}
}