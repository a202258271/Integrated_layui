package com.it.service;

import java.util.List;
import java.util.Map;

import com.it.bean.UsersEntity;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

public interface UsersService {

	ComMessageResult<List<Map>> LoadUsersEntiry(int page, int limit, String username);

	PublicMessageResult<Object> insert(UsersEntity usersEntity);

	PublicMessageResult<Object> delete(String id);

	PublicMessageResult<Object> update(UsersEntity usersEntity);

	PublicMessageResult<Object> updateState(UsersEntity usersEntity);

}
