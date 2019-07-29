package com.it.service.exception;



public class ServiceException extends LinkerException {

    private static final long serialVersionUID = 1L;

    public ServiceException(String defaultMessage) {
        super(defaultMessage);
    }
}
