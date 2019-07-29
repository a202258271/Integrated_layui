package com.it.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.it.bean.WorkOrderEntity;
import com.it.dao.WorkOrderDao;
import com.it.service.WorkOrderService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

@Service
public class WorkOrderServiceImpl implements WorkOrderService{
	
	@Resource
	private WorkOrderDao  workOrderDao;
	
	@Override
	public ComMessageResult<List<Map>> LoadWorkOrderEntiry(int page, int limit, String id,String title,String nature,String accept) {
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
			
			@SuppressWarnings("rawtypes")
			List<Map> listagentSearch = workOrderDao.LoadWorkOrderEntiry(page, limit,id,title,nature,accept);
			int totalSearchCount = workOrderDao.TotalWorkOrderCount(id,title,nature,accept);
			result.setData(listagentSearch);
			result.setCount(totalSearchCount);
		
		return result;
	}

	/*@Override
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
	}*/
	
	@Override
	public PublicMessageResult<Object> update(WorkOrderEntity workOrderEntity) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = workOrderDao.update(workOrderEntity);
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
