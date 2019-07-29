package com.it.controller;

import com.it.service.LoginService;
import com.it.util.LoginMessageResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/login")
public class LoginController {
    @Resource
    private LoginService loginService;

    @RequestMapping("/login.do")
    @ResponseBody
    public LoginMessageResult<Object> Login(HttpServletResponse response, String admin_name, String admin_password, HttpSession session, HttpServletRequest request) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        LoginMessageResult<Object> result = loginService.Login(admin_name, admin_password);
        if (result.getStatus().equals("00")) {

            Cookie cookie = new Cookie("status", "00");//

            cookie.setMaxAge(30); // 设置cookie时效
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        session.setAttribute("admin_name", admin_name);
        return result;
    }
}
