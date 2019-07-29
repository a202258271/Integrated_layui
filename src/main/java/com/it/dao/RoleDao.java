package com.it.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.it.bean.RoleEntity;

public interface RoleDao {
    int countByExample(RoleEntity example);

    int deleteByExample(RoleEntity example);

    int deleteByPrimaryKey(Integer id);

    int insert(RoleEntity record);

    int insertSelective(RoleEntity record);

    List<RoleEntity> selectByExample(RoleEntity example);

    RoleEntity selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") RoleEntity record, @Param("example") RoleEntity example);

    int updateByExample(@Param("record") RoleEntity record, @Param("example") RoleEntity example);

    int updateByPrimaryKeySelective(RoleEntity record);

    int updateByPrimaryKey(RoleEntity record);

	List<Map> LoadRoleEntiry(@Param("start") int start, @Param("limit") int limit, @Param("rolename") String rolename);

	int TotalRoleCount(@Param("rolename") String rolename);
}