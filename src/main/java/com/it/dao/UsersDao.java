package com.it.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.it.bean.UsersEntity;

public interface UsersDao {

	public List<Map> LoadUsersEntiry(@Param("page") int page, @Param("limit") int limit,@Param("username")  String username);

	public int TotalUsersCount(@Param("username")String username);

	public int insert(UsersEntity usersEntity);

	public int delete(String id);

	public int update(UsersEntity usersEntity);

	public int updateState(UsersEntity usersEntity);


}
