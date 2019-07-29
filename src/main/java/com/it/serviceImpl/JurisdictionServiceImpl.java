package com.it.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.it.dao.JurisdictionDao;
import com.it.service.JurisdictionService;
import com.it.util.ComMessageResult;

@Service
public class JurisdictionServiceImpl implements JurisdictionService{
	
	@Resource
	private JurisdictionDao  jurisdictionDao;

	@Override
	public ComMessageResult<List<Map>> LoadJurisdictionEntiry( String username)  {
			ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
			
			@SuppressWarnings("rawtypes")
			List<Map> listagentSearch = jurisdictionDao.LoadJurisdictionEntiry(username);
			int totalSearchCount = jurisdictionDao.TotalJurisdictionCount(username);
			result.setData(listagentSearch);
			result.setCount(totalSearchCount);
			result.setMsg("ok");
			return result;
	}
	
	

}
