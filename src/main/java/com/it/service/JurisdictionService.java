package com.it.service;

import java.util.List;
import java.util.Map;

import com.it.util.ComMessageResult;

public interface JurisdictionService {

	ComMessageResult<List<Map>> LoadJurisdictionEntiry(
			String username);

}
