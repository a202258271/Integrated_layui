package com.it.dao;

import com.it.bean.JurisdictionEntity;
import com.it.bean.JurisdictionEntity;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface JurisdictionDao {
    int countByExample(JurisdictionEntity example);

    int deleteByExample(JurisdictionEntity example);

    int deleteByPrimaryKey(Integer id);

    int insert(JurisdictionEntity record);

    int insertSelective(JurisdictionEntity record);

    List<JurisdictionEntity> selectByExample(JurisdictionEntity example);

    JurisdictionEntity selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") JurisdictionEntity record, @Param("example") JurisdictionEntity example);

    int updateByExample(@Param("record") JurisdictionEntity record, @Param("example") JurisdictionEntity example);

    int updateByPrimaryKeySelective(JurisdictionEntity record);

    int updateByPrimaryKey(JurisdictionEntity record);

	List<Map> LoadJurisdictionEntiry(@Param("username")String username);

	int TotalJurisdictionCount(@Param("username")String username);
}