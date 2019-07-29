package com.it.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.it.bean.NewsEntity;

public interface NewsDao {


    int deleteByPrimaryKey(@Param("id")String id);

    int insert(NewsEntity newsEntity);

    int insertSelective(NewsEntity record);


    NewsEntity selectByPrimaryKey(Integer id);



    int updateByPrimaryKeySelective(NewsEntity record);

    int updateByPrimaryKey(NewsEntity record);

	int TotalNewsCount(@Param("jointime")String jointime, @Param("title")String title);

	List<Map> LoadNewsEntiry(@Param("page")int page,@Param("limit") int limit, @Param("jointime")String jointime, @Param("title")String title);

	int putawayUpdate(@Param("id")String i);

	int soldOut(String i);

	int updateStick(NewsEntity newsEntity);

}