package com.it.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.it.dao.LoginDao;
import com.it.service.LoginService;
import com.it.util.ComMessageResult;
import com.it.util.LoginMessageResult;


@Service("loginService")
public class LoginServiceImpl implements LoginService{

	@Resource
	private LoginDao loginDao;
	
	public LoginMessageResult<Object> Login(String admin_name,
			String admin_password) {
		LoginMessageResult<Object> result = new LoginMessageResult<Object>();
		int res = loginDao.Login(admin_name, admin_password);
		if(res <= 0) {
			result.setStatus("01");
			result.setMessage("用户名密码错误");
			return result;
		}
		
		result.setStatus("00");
		result.setMessage("登录成功");
		return result;
	}

}
