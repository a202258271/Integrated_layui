package com.it.service;

import java.util.List;
import java.util.Map;

import com.it.bean.WorkOrderEntity;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

public interface WorkOrderService {

	ComMessageResult<List<Map>> LoadWorkOrderEntiry(int page, int limit, String id,String title,String nature,String accept);

/*	PublicMessageResult<Object> insert(UsersEntity usersEntity);

	PublicMessageResult<Object> delete(String id);

	PublicMessageResult<Object> updateState(UsersEntity usersEntity);*/
	
	PublicMessageResult<Object> update(WorkOrderEntity workOrderEntity);

}
