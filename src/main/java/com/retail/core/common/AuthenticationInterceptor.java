package com.retail.core.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;
import com.retail.core.Constants;
import com.retail.core.result.Result;
import com.retail.core.result.ResultCode;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter{
	
	private static final Logger log = LoggerFactory.getLogger(AuthenticationInterceptor.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		log.info("start authentication filter");
		
	    //获取token
	    String token = request.getHeader(Constants.AUTHORIZATION);
	    
	    /**
	     * 与客户端通信http code 始终返回200的状态码,其他的状态码系统用自定义的一套状态码
	     ***/
	    //未登录的访问
		if (StringUtils.isBlank(token)) {
	    	
	    	log.error("illegal url," + request.getQueryString());
	    	Result<String> result = new Result<String>();
	    	result.setSuccess(false);
	    	result.setCode(ResultCode.USER_WITHOUT_LOGIN.getCode());
	    	result.setMessage(ResultCode.USER_WITHOUT_LOGIN.getMessage());
	    	response.getWriter().write(JSON.toJSONString(result));
    		response.getWriter().flush();
    		response.getWriter().close();
    		
    		log.info("end authentication filter");
    		return Boolean.FALSE;
	    }
	    
	    //验证token
    	//AuthModel authModel = tokenManager.getAuthModel(token);
	    //登陆过，但token已过期
//		if (authModel == null || !tokenManager.checkToken(authModel)) {
//	    	
//    		Result<String> result = new Result<String>();
//    		result.setSuccess(false);
//    		result.setCode(ResultCode.TOKEN_INVALID.getCode());
//    		result.setMessage(ResultCode.TOKEN_INVALID.getMessage());
//    		response.getWriter().write(JSON.toJSONString(result));
//    		response.getWriter().flush();
//    		response.getWriter().close();
//    		
//    		log.info("end authentication filter");
//    		return Boolean.FALSE;
//	    }
	    
	    //设置登陆信息
	    //AssertionHolder.setAuthModel(authModel);
		log.info("end authentication filter");
		return true;
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		//清空当前线程绑定的登录信息
		//AssertionHolder.clear();
		super.afterCompletion(request, response, handler, ex);
	}

}
