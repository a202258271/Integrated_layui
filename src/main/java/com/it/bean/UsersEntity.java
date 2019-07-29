package com.it.bean;

import java.util.Date;

public class UsersEntity {
	/**
	 * id
	 */
	private	int id;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 邮箱
	 */
	private String email;
	/**
	 * 积分
	 */
	private String experience;
	/**
	 * 性别
	 */
	private int sex;
	/**
	 * 登入次数
	 */
	private int logins;
	/**
	 * 签名
	 */
	private String sign;
	/**
	 * 城市
	 */
	private String city;
	/**
	 * ip
	 */
	private String ip;
	/**
	 * 加入时间
	 */
	private Date jointime;
	/**
	 * 状态
	 * 
	 */
	private int state;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getLogins() {
		return logins;
	}
	public void setLogins(int logins) {
		this.logins = logins;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Date getJointime() {
		return jointime;
	}
	public void setJointime(Date jointime) {
		this.jointime = jointime;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "UsersEntity [id=" + id + ", username=" + username + ", email="
				+ email + ", experience=" + experience + ", sex=" + sex
				+ ", logins=" + logins + ", sign=" + sign + ", city=" + city
				+ ", ip=" + ip + ", jointime=" + jointime + ", state=" + state
				+ "]";
	}
	public UsersEntity(int id, String username, String email,
			String experience, int sex, int logins, String sign, String city,
			String ip, Date jointime, int state) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.experience = experience;
		this.sex = sex;
		this.logins = logins;
		this.sign = sign;
		this.city = city;
		this.ip = ip;
		this.jointime = jointime;
		this.state = state;
	}
	public UsersEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
