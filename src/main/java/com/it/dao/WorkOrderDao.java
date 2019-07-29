package com.it.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.it.bean.WorkOrderEntity;

public interface WorkOrderDao {
    int countByExample(WorkOrderEntity example);

    int deleteByExample(WorkOrderEntity example);

    int deleteByPrimaryKey(Integer id);

    int insert(WorkOrderEntity record);

    int insertSelective(WorkOrderEntity record);

    List<WorkOrderEntity> selectByExample(WorkOrderEntity example);

    WorkOrderEntity selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") WorkOrderEntity record, @Param("example") WorkOrderEntity example);

    int updateByExample(@Param("record") WorkOrderEntity record, @Param("example") WorkOrderEntity example);

    int updateByPrimaryKeySelective(WorkOrderEntity record);

    int update(WorkOrderEntity workOrderEntity);

	int TotalWorkOrderCount(@Param("id")String id, @Param("title") String title, @Param("nature")String nature,
			@Param("accept")String accept);
	
	List<Map> LoadWorkOrderEntiry(@Param("page")int page, @Param("limit")int limit,@Param("id") String id,@Param("title") String title,@Param("nature") String nature,@Param("accept")String accept);
}