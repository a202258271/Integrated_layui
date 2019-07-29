package com.it.service;

import com.it.util.LoginMessageResult;

public interface LoginService {
	public LoginMessageResult<Object> Login(String admin_name,String admin_password);
}
