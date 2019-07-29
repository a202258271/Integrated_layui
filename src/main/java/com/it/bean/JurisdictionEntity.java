package com.it.bean;

public class JurisdictionEntity {
    private Integer id;

    private Integer parentid;

    private String commentbody;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public String getCommentbody() {
        return commentbody;
    }

    public void setCommentbody(String commentbody) {
        this.commentbody = commentbody == null ? null : commentbody.trim();
    }
}