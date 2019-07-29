package com.it.controller;

import com.it.bean.WorkOrderEntity;
import com.it.service.WorkOrderService;
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
@RequestMapping("/workOrder")
public class WorkOrderController {

    @Resource
    private WorkOrderService workOrderService;

    @RequestMapping("/queryAll.do")
    @ResponseBody
    public ComMessageResult<List<Map>> LoadUsersEntiry(HttpServletResponse response, HttpServletRequest request, String page, String limit, @RequestParam(defaultValue = "") String id, @RequestParam(defaultValue = "") String title, @RequestParam(defaultValue = "") String nature, @RequestParam(defaultValue = "") String accept) {
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
        if (id.length() > 0) {
            page = "1";
        }
        if (title.length() > 0) {
            page = "1";
        }
        if (nature.length() > 0) {
            page = "1";
        }
        if (accept.length() > 0) {
            page = "1";
        }
        System.out.println(id.length() + "====================================");
        int start = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
        result = workOrderService.LoadWorkOrderEntiry(start, Integer.parseInt(limit), id, title, nature, accept);

        return result;
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public PublicMessageResult<Object> update(WorkOrderEntity workOrderEntity) {
        PublicMessageResult<Object> result = workOrderService.update(workOrderEntity);
        return result;
    }
}
