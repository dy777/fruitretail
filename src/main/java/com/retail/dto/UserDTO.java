package com.retail.dto;

import com.retail.domain.User;

public class UserDTO extends User {

	private static final long serialVersionUID = -4752830652748335103L;
	
	private String code;
	
	private String newPassword;
	
	private String oldPassword;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

}
