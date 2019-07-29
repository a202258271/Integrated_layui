package com.it.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.it.bean.RoleEntity;
import com.it.dao.RoleDao;
import com.it.service.RoleService;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;
@Service
public class RoleServiceImpl implements RoleService {
	
	@Resource
	private RoleDao roleDao;

	@Override
	public ComMessageResult<List<Map>> LoadRoleEntiry(int start,
			int limit, String rolename) {
		// TODO Auto-generated method stub
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
		
		@SuppressWarnings("rawtypes")
		List<Map> listagentSearch = roleDao.LoadRoleEntiry(start, limit,rolename);
		int totalSearchCount = roleDao.TotalRoleCount(rolename);
		result.setData(listagentSearch);
		result.setCount(totalSearchCount);
		return result;
	}

	@Override
	public PublicMessageResult<Object> delete(String id) {
		// TODO Auto-generated method stub
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
        int res = roleDao.deleteByPrimaryKey(Integer.parseInt(id));
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
	public PublicMessageResult<Object> insert(RoleEntity roleEntity) {
		PublicMessageResult<Object> result= new PublicMessageResult<>();
        int res=roleDao.insert(roleEntity);
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
	public PublicMessageResult<Object> updateRole(RoleEntity roleEntity) {
		PublicMessageResult<Object> result = new PublicMessageResult<Object>();
		 int res = roleDao.updateByPrimaryKey(roleEntity);
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
