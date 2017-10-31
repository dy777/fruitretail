package com.retail.core;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import org.apache.commons.lang.StringUtils;

/**
 * 符合TAOBAO习惯的纯字符串字典结构。
 * 
 * @author carver.gu
 * @since 1.0, Sep 13, 2009
 */
public class RetailHashMap extends HashMap<String, String> {

	private static final long serialVersionUID = -1277791390393392630L;
	public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_TIMEZONE = "GMT+8";

	public RetailHashMap() {
		super();
	}

	public RetailHashMap(Map<? extends String, ? extends String> m) {
		super(m);
	}

	public String put(String key, Object value) {
		String strValue;

		if (value == null) {
			strValue = null;
		} else if (value instanceof String) {
			strValue = (String) value;
		} else if (value instanceof Integer) {
			strValue = ((Integer) value).toString();
		} else if (value instanceof Long) {
			strValue = ((Long) value).toString();
		} else if (value instanceof Float) {
			strValue = ((Float) value).toString();
		} else if (value instanceof Double) {
			strValue = ((Double) value).toString();
		} else if (value instanceof Boolean) {
			strValue = ((Boolean) value).toString();
		} else if (value instanceof Date) {
			DateFormat format = new SimpleDateFormat(DATE_TIME_FORMAT);
			format.setTimeZone(TimeZone.getTimeZone(DATE_TIMEZONE));
			strValue = format.format((Date) value);
		} else {
			strValue = value.toString();
		}

		return this.put(key, strValue);
	}

	public String put(String key, String value) {
		if (StringUtils.isNotEmpty(key) && StringUtils.isNotEmpty(value)) {
			return super.put(key, value);
		} else {
			return null;
		}
	}

}
