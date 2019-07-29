package com.it.serviceImpl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.it.bean.UsersEntity;
import com.it.dao.UsersDao;
import com.it.service.UsersService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

@Service
@Component
public class UsersServiceImpl implements UsersService{
	
	@Resource
	private UsersDao usersDao;
	
	@Override
	public ComMessageResult<List<Map>> LoadUsersEntiry(int page,
			int limit,String username) {
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
			
			@SuppressWarnings("rawtypes")
			List<Map> listagentSearch = usersDao.LoadUsersEntiry(page, limit,username);
			int totalSearchCount = usersDao.TotalUsersCount(username);
			result.setData(listagentSearch);
			result.setCount(totalSearchCount);
		
		return result;
	}

	@Override
	public PublicMessageResult<Object> insert(UsersEntity usersEntity) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result= new PublicMessageResult<>();
        int res=usersDao.insert(usersEntity);
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
	public PublicMessageResult<Object> delete(String id) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        int res = usersDao.delete(id);
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
	public PublicMessageResult<Object> update(UsersEntity usersEntity) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = usersDao.update(usersEntity);
	        if (res <= 0) {
	            result.setStatus("Q5");
	            result.setMessage("修改失败");
	            return result;
	        }
	        result.setStatus("00");
	        result.setMessage("修改成功");
	        return result;
	}

	@Override
	public PublicMessageResult<Object> updateState(UsersEntity usersEntity) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = usersDao.updateState(usersEntity);
	        if (res <= 0) {
	            result.setStatus("Q5");
	            result.setMessage("修改失败");
	            return result;
	        }
	        result.setStatus("00");
	        result.setMessage("修改成功");
	        return result;
	}
/*	@Scheduled(cron="0/2 * * * * ?")
	public void cron(){
		System.out.println("执行时间："+new Date(System.currentTimeMillis()));
	}*/

}
