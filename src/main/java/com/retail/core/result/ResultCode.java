package com.retail.core.result;

/***
 * <p>
 * 系统返回客户端的操作代码以及反馈信息
 * </p>
 * @author linlun
 * @version 1.0
 */
public enum ResultCode {

	/*********** 通用的业务操作code 用0XXXX 表示  ****************/
	OPERATION_SUCCESS("00000","操作成功"),
	
	OPERATION_FAILURE("00001","操作失败"),
	
	TELPHONE_ILLEGALITY("00002","手机格式不正确"),
	
	SMS_ILLEGALITY("00003","短信验证码不正确"),
	
	SYSTEM_UNKNOW_ERROR("00004","系统未知异常"),
	
	TOKEN_INVALID("00005","登陆超时,SESSION已过期"),
	
	ACCESS_DENIED("00006","无权限访问当前资源"),
	
	PARAMETER_ERROR("00007","参数不正确"),

	SMS_TIME_OUT("00008","短信验证码未发送成功或超时"),

	DATABASE_ERROR("00009","数据库异常"),
	
	UNSUPPORTED_ERROR("00010","不支持当前调用，函数未实现"),
	
	AUTHENTICATION_ERROR("00011","认证中，请勿重复提交"),
	
	/*********** 用户注册登录(包含所有类型的用户)相关业务操作code 用1XXXX 表示  ****************/
	
	USER_WITHOUT_LOGIN("10000","当前用户未登录"),
	
	USER_NAME_INVALID("10001","用户名不正确"),
	
	USER_PASS_INVALID("10002","密码不正确"),

	USER_NOT_EXIST("10003","用户未注册"),
	
	USER_EXIST("10004","用户已存在"),
	
	USER_NAME_PASSWORD_INVALID("10005","用户名或密码不正确"),
	
	OLD_PASSWORD_INVALID("10006","原密码不正确"),
	
	USER_STATE_INVALID("10007", "用户状态不正确"),
	
	
	/*********** 用户(包含所有类型的用户)认证相关业务操作code 用2XXXX 表示  ****************/
	
	
	/*********** 仓库相关业务操作code 用3XXXX 表示  ****************/
	STORE_STATUS_ILLEGAL("30000", "仓库状态不合法"),
	
	STORE_DATA_CHANGED("30001", "仓库数据已发生变化"),
	
	/*********** 订单相关业务操作code 用5XXXX 表示  ****************/
	ORDER_STATUS_ILLEGAL("50000", "订单状态不合法"),
	
	ORDER_NEED_AREA("50001", "订购面积不得大于仓库可用面积"),
	
	/*********** 数据管理报表业务操作code 用6XXXX 表示  ****************/
	REPORT_NOT_SUPPORT("60000", "您的服务商还没提供相关数据~");
	
	private String code;
	
	private String message;
	
	private ResultCode(String code,String message){
		this.code = code;
		this.message = message;
	}
	
	public String getCode(){
		return this.code;
	}
	
	public String getMessage(){
		return this.message;
	}
}
