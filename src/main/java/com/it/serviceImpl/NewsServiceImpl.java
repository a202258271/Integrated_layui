package com.it.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.it.bean.NewsEntity;
import com.it.dao.NewsDao;
import com.it.service.NewsService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;
@Service
public class NewsServiceImpl implements NewsService {
	@Resource
	private NewsDao newsDao;

	@Override
	public ComMessageResult<List<Map>> LoadNewsEntiry(int page, int limit,
			String jointime, String title) {
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
		
		@SuppressWarnings("rawtypes")
		List<Map> listagentSearch = newsDao.LoadNewsEntiry(page, limit,jointime,title);
		int totalSearchCount = newsDao.TotalNewsCount(jointime,title);
		result.setData(listagentSearch);
		result.setCount(totalSearchCount);
		return result;
	}

	@Override
	public PublicMessageResult<Object> delete(String id) {
		// TODO Auto-generated method stub
				PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		        int res = newsDao.deleteByPrimaryKey(id);
		        if (res <= 0) {
		            result.setStatus("Q5");
		            result.setMessage("删除失败");
		            return result;
		        }
		        result.setStatus("00");
		        result.setMessage("删除成功");
		        return result;
	}

	@Override
	public PublicMessageResult<Object> putawayUpdate(String i) {
		// TODO Auto-generated method stub
			PublicMessageResult<Object> result = new PublicMessageResult<Object>();
	        int res = newsDao.putawayUpdate(i);
	        if (res <= 0) {
	            result.setStatus("Q5");
	            result.setMessage("上架失败");
	            return result;
	        }
	        result.setStatus("00");
	        result.setMessage("上架成功");
	        return result;
	}

	@Override
	public PublicMessageResult<Object> soldOut(String i) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        int res = newsDao.soldOut(i);
        if (res <= 0) {
            result.setStatus("Q5");
            result.setMessage("下架失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("下架成功");
        return result;
	}

	@Override
	public PublicMessageResult<Object> updateStick(NewsEntity newsEntity) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = newsDao.updateStick(newsEntity);
	        if (res <= 0) {
	            result.setStatus("Q5");
	            result.setMessage("数据异常，置顶失败");
	            return result;
	        }
	        result.setStatus("00");
	        result.setMessage("置顶成功");
	        return result;
	}

	@Override
	public PublicMessageResult<Object> insert(NewsEntity newsEntity) {
		PublicMessageResult<Object> result= new PublicMessageResult<>();
        int res=newsDao.insert(newsEntity);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("增加失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("增加成功");
        return result;
	}

	@Override
	public PublicMessageResult<Object> updateNews(NewsEntity newsEntity) {
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = newsDao.updateByPrimaryKey(newsEntity);
	        if (res <= 0) {
	            result.setStatus("Q5");
	            result.setMessage("修改失败");
	            return result;
	        }
	        result.setStatus("00");
	        result.setMessage("修改成功");
	        return result;
	}
}
