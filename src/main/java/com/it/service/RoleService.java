package com.it.service;

import java.util.List;
import java.util.Map;

import com.it.bean.RoleEntity;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

public interface RoleService {

	ComMessageResult<List<Map>> LoadRoleEntiry(int start, int limit,
			String rolename);

	PublicMessageResult<Object> delete(String i);

	PublicMessageResult<Object> insert(RoleEntity roleEntity);

	PublicMessageResult<Object> updateRole(RoleEntity roleEntity);

}
