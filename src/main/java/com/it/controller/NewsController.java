package com.it.controller;

import com.it.bean.NewsEntity;
import com.it.service.NewsService;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/news")
public class NewsController {
    @Resource
    private NewsService newsService;

    @RequestMapping("/queryAll.do")
    @ResponseBody
    public ComMessageResult<List<Map>> LoadUsersEntiry(HttpServletResponse response, HttpServletRequest request, String page, String limit, @RequestParam(defaultValue = "") String jointime, @RequestParam(defaultValue = "") String title) {
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
        if (jointime.length() > 0) {
            page = "1";
        }
        if (title.length() > 0) {
            page = "1";
        }
        int start = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
        result = newsService.LoadNewsEntiry(start, Integer.parseInt(limit), jointime, title);

        return result;
    }

    @RequestMapping("/delete.do")
    @ResponseBody
    public PublicMessageResult<Object> delete(String id) {
        String[] ids = id.split(",");
        PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        try {
            for (String i : ids) {
                result = newsService.delete(i);
            }
        } catch (Exception e) {
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        return result;
    }

    @RequestMapping("/putaway.do")
    @ResponseBody
    public PublicMessageResult<Object> putawayUpdate(String id) {
        String[] ids = id.split(",");
        PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        try {
            for (String i : ids) {
                result = newsService.putawayUpdate(i);
            }
        } catch (Exception e) {
            result.setStatus("Q5");
            result.setMessage("上架失败");
            return result;
        }
        return result;
    }

    @RequestMapping("/soldOut .do")
    @ResponseBody
    public PublicMessageResult<Object> soldOut(String id) {
        String[] ids = id.split(",");
        PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        try {
            for (String i : ids) {
                result = newsService.soldOut(i);
            }
        } catch (Exception e) {
            result.setStatus("Q5");
            result.setMessage("下架失败");
            return result;
        }
        return result;
    }

    @RequestMapping("/updateStick.do")
    @ResponseBody
    public PublicMessageResult<Object> updateStick(NewsEntity newsEntity) {
        System.out.println(newsEntity.getStick());
        System.out.println(newsEntity.getId());
        PublicMessageResult<Object> result = newsService.updateStick(newsEntity);
        return result;
    }

    @RequestMapping("/addnews.do")
    @ResponseBody
    public PublicMessageResult<Object> addusers(NewsEntity newsEntity) {
        newsEntity.setReading(0);
        newsEntity.setPromulgator("刘健健");
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(new Date());
            newsEntity.setJointime(formatter.parse(dateString));
        } catch (Exception e) {
            e.printStackTrace();
        }
        PublicMessageResult<Object> result = newsService.insert(newsEntity);
        return result;
    }

    @RequestMapping("/updateNews.do")
    @ResponseBody
    public PublicMessageResult<Object> updateNews(NewsEntity newsEntity) {
        PublicMessageResult<Object> result = newsService.updateNews(newsEntity);
        return result;
    }
}
