package com.retail.core.common;

import com.retail.dto.UserDTO;
import com.retail.domain.AuthModel;

public interface TokenManager {
	/**
     * 创建一个token关联上指定用户
     * @param userName 指定用户的name
     * @param telphone 指定用户的telphone
     * @return 生成的token
     */
    public AuthModel createToken(String platform, UserDTO user);

    /**
     * 检查token是否有效
     * @param model token
     * @return 是否有效
     */
    public boolean checkToken(AuthModel model);

    /**
     * 从字符串中解析token
     * @param authentication 加密后的字符串
     * @return
     */
    public AuthModel getAuthModel(String token);

    /**
     * 清除token
     * @param model 登录用户的信息
     */
    public void deleteToken(AuthModel model);
}
