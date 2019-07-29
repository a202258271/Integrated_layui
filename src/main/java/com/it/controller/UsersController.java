package com.it.controller;

import com.it.bean.UsersEntity;
import com.it.service.UsersService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/users")
public class UsersController {

    @Resource
    private UsersService usersService;

    @RequestMapping("/queryAll.do")
    @ResponseBody
    public ComMessageResult<List<Map>> LoadUsersEntiry(HttpServletResponse response, HttpServletRequest request, String page, String limit, @RequestParam(defaultValue = "") String username) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
        request.getHeader("cookie");
        Cookie[] cookies = request.getCookies();
        System.out.println("cookies = " + cookies);


        if (cookies != null) {

            for (int i = 0; i < cookies.length; i++) {
                Cookie cookie = cookies[i];
                if (cookie.getName().equals("status")) {
                    String status = cookie.getValue();
                    System.out.println("status = " + status);
                    if (!status.equals("00")) {
                        result.setCode(1);
                        result.setMsg("登录失效");
                        return result;
                    }
                }
            }
        }
        if (username.length() > 0) {
            page = "1";
        }
        System.out.println(username.length() + "====================================");
        int start = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
        result = usersService.LoadUsersEntiry(start, Integer.parseInt(limit), username);

        return result;
    }

    @RequestMapping("/addusers.do")
    @ResponseBody
    public PublicMessageResult<Object> addusers(UsersEntity usersEntity) {
        usersEntity.setExperience("1000");
        usersEntity.setLogins(0);
        InetAddress ia = null;
        String localip = null;
        try {
            ia = ia.getLocalHost();
            String localname = ia.getHostName();
            localip = ia.getHostAddress();
            System.out.println("本机名称是：" + localname);
            System.out.println("本机的ip是 ：" + localip);
            usersEntity.setIp(localip);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(new Date());
            usersEntity.setJointime(formatter.parse(dateString));
        } catch (Exception e) {
            e.printStackTrace();
        }
        PublicMessageResult<Object> result = usersService.insert(usersEntity);
        return result;
    }

    @RequestMapping("/delete.do")
    @ResponseBody
    public PublicMessageResult<Object> delete(String id) {
        PublicMessageResult<Object> result = usersService.delete(id);
        return result;
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public PublicMessageResult<Object> update(UsersEntity usersEntity) {
        PublicMessageResult<Object> result = usersService.update(usersEntity);
        return result;
    }

    @RequestMapping("/updateState.do")
    @ResponseBody
    public PublicMessageResult<Object> updateState(UsersEntity usersEntity) {
        PublicMessageResult<Object> result = usersService.updateState(usersEntity);
        return result;
    }

    @RequestMapping("/exit.do")
    public String exit(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("status")) {
                cookie.setValue(null);
                cookie.setMaxAge(0);
            }
        }
        return "redirect:../man/login.html";
    }

    @RequestMapping("/upload.do")
    @ResponseBody
    public synchronized PublicMessageResult<Object> springUpload(HttpServletRequest request, HttpSession sesssion) throws IllegalStateException, IOException {
        PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        long startTime = System.currentTimeMillis();
        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
                request.getSession().getServletContext());
        //检查form中是否有enctype="multipart/form-data"
        if (multipartResolver.isMultipart(request)) {
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            //获取multiRequest 中所有的文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while (iter.hasNext()) {
                //一次遍历所有文件
                MultipartFile file = multiRequest.getFile(iter.next().toString());
                if (file != null) {
                    String path = "E:/springUpload" + file.getOriginalFilename();
                    file.transferTo(new File(path));
                }
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println("方法三的运行时间：" + String.valueOf(endTime - startTime) + "ms");
        result.setStatus("00");
        result.setMessage("上传成功");
        return result;
    }
}
