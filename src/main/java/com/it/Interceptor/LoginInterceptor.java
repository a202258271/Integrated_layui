package com.it.Interceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		System.out.println("===============1");
		 String uri = request.getRequestURI();
		          //UTL:除了login.html是可以公开访问的，其他的URL都进行拦截控制
		          if (uri.indexOf("/login") >= 0) {
		              return true;
		          }
            //没有session就获取cookie进行判断
            Cookie[] cookies=request.getCookies();
            //有cookie就通过cookie获取用户信息
            //遍历cookies
            if(cookies==null){
            	request.getRequestDispatcher("../man/login.html").forward(request, response);
            	 return false;
            }
            for(Cookie cookie : cookies){
            	if(cookie!=null){
            		 if(cookie.getName().equals("status")){
                         String userCookie=cookie.getValue();
                         System.out.println(userCookie+"======================------------");
                            if(userCookie =="00"){
                         	   return true;                      
                            }
     		            }
            	}else{
                	request.getRequestDispatcher("../man/login.html").forward(request, response);
            		 return false;   
            	}
		   }
   		 return true;   
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		response.sendRedirect("../man/login.html");  
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}
