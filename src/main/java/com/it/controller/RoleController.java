package com.it.controller;

import com.it.bean.RoleEntity;
import com.it.service.RoleService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/role")
public class RoleController {

    @Resource
    private RoleService roleService;

    @RequestMapping("/queryAll.do")
    @ResponseBody
    public ComMessageResult<List<Map>> LoadUsersEntiry(HttpServletResponse response, HttpServletRequest request, String page, String limit, @RequestParam(defaultValue = "") String rolename) {
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

        if (rolename.length() > 0) {
            page = "1";
        }
        int start = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);

        System.out.println(rolename.length() + "====================================");
        result = roleService.LoadRoleEntiry(start, Integer.parseInt(limit), rolename);

        return result;
    }

    @RequestMapping("/delete.do")
    @ResponseBody
    public PublicMessageResult<Object> delete(String id) {
        String[] ids = id.split(",");
        PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        try {
            for (String i : ids) {
                result = roleService.delete(i);
            }
        } catch (Exception e) {
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        return result;
    }

    @RequestMapping("/addrole.do")
    @ResponseBody
    public PublicMessageResult<Object> addrole(RoleEntity roleEntity) {
        PublicMessageResult<Object> result = roleService.insert(roleEntity);
        return result;
    }

    @RequestMapping("/updaterole.do")
    @ResponseBody
    public PublicMessageResult<Object> updaterole(RoleEntity roleEntity) {
        PublicMessageResult<Object> result = roleService.updateRole(roleEntity);
        return result;
    }
}
