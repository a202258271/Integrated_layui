package com.it.util;

public class ComMessageResult<T> {
	private T data;
	private Integer count;
	private int code;
	private String msg="";
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	@Override
	public String toString() {
		return "ComMessageResult [data=" + data + ", count=" + count
				+ ", code=" + code + ", msg=" + msg + "]";
	}
	public ComMessageResult(T data, Integer count, int code, String msg) {
		super();
		this.data = data;
		this.count = count;
		this.code = code;
		this.msg = msg;
	}
	public ComMessageResult() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
