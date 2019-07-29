package com.it.service;

import java.util.List;
import java.util.Map;

import com.it.bean.NewsEntity;
import com.it.util.ComMessageResult;
import com.it.util.PublicMessageResult;

public interface NewsService {

	ComMessageResult<List<Map>> LoadNewsEntiry(int start, int parseInt,
			String jointime, String title);

	PublicMessageResult<Object> delete(String id);

	PublicMessageResult<Object> putawayUpdate(String i);

	PublicMessageResult<Object> soldOut(String i);

	PublicMessageResult<Object> updateStick(NewsEntity newsEntity);

	PublicMessageResult<Object> insert(NewsEntity newsEntity);

	PublicMessageResult<Object> updateNews(NewsEntity newsEntity);

}
