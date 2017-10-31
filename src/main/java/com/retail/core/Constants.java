package com.retail.core;

import java.io.Serializable;
import org.apache.commons.lang.StringUtils;
/**
 * 常量定义
 * @author BinMang
 * @since 2017年1月17日
 */
public class Constants {
	/**
	 * 默认一页条数
	 */
	public static final int PAGE_SIZE_DEFAULT = 20;
	/**
	 * 最大页大小
	 */
	public static final int PAGE_SIZE_MAX = 1000;
	/**
	 * 默认日期格式
	 */
	public static final String DATE_FORMAT_DEFAULT = "YYYY-MM-DD";
	
	public static final String AUTH_KEY ="h3hNXSj380mcl3DW";
	/**
     * 存储当前登录用户id的字段名
     */
    public static final String CURRENT_USER_ID = "CURRENT_USER_ID";
    /**
     * token有效期（小时）
     */
    public static final int TOKEN_EXPIRES_HOUR = 24;
    
    /**
     * token在redis中有效期（分钟）
     */
    public static final int TOKEN_EXPIRES_MINUTES_REDIS = 30;
    /**
     * 存放Authorization的header字段
     */
    public static final String AUTHORIZATION = "token";
    
    public static final String CP_TOKEN = "cpToken";
    
    public static final String NEEDER_TOKEN = "neederToken";
    
    /**
     * 验证码有效时间
     */
    public static final Integer SEND_MSG_TIME = 300;
    
    /**
     * 注册类型 0注册用户
     */
    public static final Integer REGISTER_TYPE = 0;
    
    /**
     * 注册类型 1重置密码
     */
    public static final Integer RESET_TYPE = 1;
    
    /**
     * CP的默认头像
     */
    public static final String DEFAULT_CP_HEAD_IMG = "7538099236C682389EC10E98FB19EFDA";
    
    /**
     * 货主的默认头像
     */
    public static final String DEFAULT_NEEDER_HEAD_IMG = "A6DCCA680D02BC24C68613E211E22E8F";
    
   /**
    * 用户状态
    * ClassName: USER_STATUS 
    * @author liuzhaohui
    * @date 2017年2月6日
    * @Description:
    */
    public static final class USER_STATUS {
    	
    	/**正常**/
    	public static final Integer NORMAL = 1;
    	
    	/**冻结**/
    	public static final Integer FREEZE = 2;
    	
    	/**已删除**/
    	public static final Integer DELETE = 3;
    	
    }
    
    public static final class RequirementUserType implements Serializable {
    	
		private static final long serialVersionUID = 198838280962263715L;
		
		/**还未认证**/
    	public static final Integer NO = 0;
    	
		/**个人货主**/
    	public static final Integer PERSONAL = 1;
    	
    	/**企业货主**/
    	public static final Integer ENTERPRIZE = 2;
    }
    
    public static final class UserType implements Serializable {
    	private static final long serialVersionUID = -6302611522928220897L;
		/**货主**/
    	public static final Integer REQUIREMENT = 1;
    	
    	/**服务提供商**/
    	public static final Integer CP = 0;
    }
    
    /**
     * 认证状态
     * @author 10058393
     *
     */
    public static final class AUTH_STATUS {
    	
    	/**新建、认证失败重新提交资料中**/
    	public static final Integer NEW = 1;
    	
    	/**审核中**/
    	public static final Integer AUTHING = 2;
    	
    	/**认证失败**/
    	public static final Integer AUTH_FAILED = 3;
    	
    	/**已认证**/
    	public static final Integer AUTH_SUCCESS = 4;
    }
    
    /**
     * 账单状态
     * @author 10058393
     *
     */
    public static final class BILL_STATUS {
    	
    	/**待支付**/
    	public static final Integer WAITING_PAY = 1;
    	
    	/**已支付**/
    	public static final Integer PAYED = 2;
    	
    	/**已取消**/
    	public static final Integer CANCLED = 2;
    }
    
    public static final class ORDER_STATUS {
    	
    	/**待审核**/
    	public static final Integer PENDING = 1;
    	
    	/**已失效**/
    	public static final Integer EXPIRED = 2;
    	
    	/**已生效**/
    	public static final Integer EFFECTIVE = 3;
    	
    	/**已完成**/
    	public static final Integer COMPLETE = 4;
    	
    	/**待确认**/
    	public static final Integer WAIT_CONFIRM = 5;
    	
    	/**待入库**/
    	public static final Integer WAIT_ENTER = 6;
    	
    }
    
    public static final class STORE_STATUS {
    	
    	/**发布待审**/
    	public static final Integer PENDING = 1;
    	
    	/**发布审核失败**/
    	public static final Integer AUDIT_FAILED = 2;
    	
    	/**可用**/
    	public static final Integer AVAILABLE = 3;
    	
    	/**已取消**/
    	public static final Integer CANCLED = 4;
    	
    	/**修改待审**/
    	public static final Integer UPDATE_WAITING_PENDING = 5;
    	
    	/**下线待失效**/
    	public static final Integer WAITING_EXPIRED = 6;
    	
    	/**不可用**/
    	public static final Integer DISABLED = 7;
    	
    	/**暂存**/
    	public static final Integer TEMPORARY = 8;
    	
    }
    
    /**
     * 短信模板枚举值
     * @author 10058393
     *
     */
    public enum MessageTemplateEnum {
    	/**
    	 * 短信模板
    	 */
    	REGISTER_TEMPLATE(1, "注册短信模板"),
    	RESETPASSWORD_TEPLATE(2, "重置密码短信模板"),
    	REQUIREMENT_USER_AUTH_SUCCESS_TEMPLATE(3, "货主认证通过短信通知模板"),
    	REQUIREMENT_USER_AUTH_FAILED_TEMPLATE(4, "货主认证未通过短信通知模板"),
    	SUPPLIER_USER_AUTH_SUCCESS_TEMPLATE(5, "合作伙伴认证通过短信通知模板"),
    	SUPPLIER_USER_AUTH_FAILED_TEMPLATE(6, "合作伙伴认证未通过短信通知模板"),
    	RESOURCE_AUTH_SUCCESS_TEMPLATE(7, "资源审核通过短信通知模板"),
    	RESOURCE_AUTH_FAILED_TEMPLATE(8, "资源审核未通过短信通知模板"),
    	STORE_ORDER_AUTH_SUCCESS_TEMPLATE(9, "订单审核通过短信通知模板"),
    	STORE_ORDER_AUTH_FAILED_TEMPLATE(10, "订单审核未通过短信通知模板"),
    	ADMIN_CANCLE_ORDER_TEMPLATE(11, "管理员取消仓订单短信通知模板"),
    	STORE_ORDER_EXPIRED_TEMPLATE(12, "订单到期短信通知模板"),
    	BILL_WAIT_PAY_TEMPLATE(13, "已出账单待支付短信通知模板"),
    	RESOURCE_UPDATE_AUTH_SUCCESS_TEMPLATE(14, "资源修改审核通过短信通知模板"),
    	RESOURCE_UPDATE_AUTH_FAILED_TEMPLATE(15, "资源修改审核未通过短信通知模板"),
    	RESOURCE_OFFLINE_TEMPLATE(29, "资源强制下线短信通知模板"),
    	STORE_NEED_QUOTE_TEMPLATE(32, "需求报价短信通知模板"),
    	
    	/**
    	 * 推送模板
    	 */
    	REQUIREMENT_USER_AUTH_SUCCESS_PUSH_TEMPLATE(16, "货主认证通过推送通知模板"),
    	REQUIREMENT_USER_AUTH_FAILED_PUSH_TEMPLATE(17, "货主认证未通过推送通知模板"),
    	STORE_ORDER_AUTH_SUCCESS_PUSH_TEMPLATE(18, "订单审核通过推送通知模板"),
    	STORE_ORDER_AUTH_FAILED_PUSH_TEMPLATE(19, "订单审核未通过推送通知模板"),
    	ADMIN_CANCLE_ORDER_PUSH_TEMPLATE(20, "管理员取消仓订单推送通知模板"),
    	STORE_ORDER_EXPIRED_PUSH_TEMPLATE(21, "订单到期推送通知模板"),
    	BILL_WAIT_PAY_PUSH_TEMPLATE(22, "已出账单推送通知模板"),
    	SUPPLIER_USER_AUTH_SUCCESS_PUSH_TEMPLATE(23, "仓主认证审核通过推送通知模板"),
    	SUPPLIER_USER_AUTH_FAILED_PUSH_TEMPLATE(24, "仓主认证审核未通过推送通知模板"),
    	RESOURCE_AUTH_SUCCESS_PUSH_TEMPLATE(25, "仓资源审核通过推送通知模板"),
    	RESOURCE_AUTH_FAILED_PUSH_TEMPLATE(26, "仓资源审核未通过推送通知模板"),
    	RESOURCE_UPDATE_AUTH_SUCCESS_PUSH_TEMPLATE(27, "资源修改审核通过推送通知模板"),
    	RESOURCE_UPDATE_AUTH_FAILED_PUSH_TEMPLATE(28, "资源修改审核未通过推送通知模板"),
    	RESOURCE_OFFLINE_PUSH_TEMPLATE(30, "资源强制下线推送通知模板"),
    	NEEDER_FOLLOW_PUSH_TEMPLATE(31, "货主关注仓库推送通知模板"),
    	STORE_NEED_QUOTE_PUSH_TEMPLATE(33, "需求报价推送通知模板");
    	
    	private Integer id;
    	private String name;
    	
		private MessageTemplateEnum(Integer id, String name) {
			this.id = id;
			this.name = name;
		}
		public Integer getId() {
			return id;
		}
		public String getName() {
			return name;
		}
    
    }
    
    public enum PushTitle {
    	
    	REQUIREMENT_USER_AUTH_PUSH_TITLE("认证消息"), //货主认证消息
    	STORE_ORDER_AUTH_PUSH_TITLE("订单审核消息"),
    	ADMIN_PUSH_TITLE("管理员通知"),
    	STORE_ORDER_EXPIRED_PUSH_TITLE("订单到期消息"),
    	BILL_WAIT_PAY_PUSH_TITLE("出账消息"),
    	SUPPLIER_USER_AUTH_PUSH_TITLE("认证消息"), //仓主认证消息
    	RESOURCE_AUTH_PUSH_TITLE("仓资源消息"),
    	RESOURCE_OFFLINE_TITLE("已被管理员下线"),
    	STORE_NEED_QUOTE_TITLE("报价消息"),
    	FOLLOW_PUSH_TITLE("关注消息");
    	
    	private String title;
		private PushTitle(String title) {
			this.title = title;
		}
		public String getTitle() {
			return title;
		}
    }
	/**
	 * 静态数据类型的枚举类
	 */
	public enum StaticDataCodeType {
		AUTH_STATUS("AUTH_STATUS","认证状态"),
		BILL_STATUS("BILL_STATUS","账单状态"),
		CHARGE_TYPE("CHARGE_TYPE","计费类型"),
		FIRE_TYPE("FIRE_TYPE","消防系统"),
		LOADING_TYPE("LOADING_TYPE","装卸设施"),
		ORDER_STATUS("ORDER_STATUS","订单状态"),
		PAY_CHANNEL_TYPE("PAY_CHANNEL_TYPE","支付渠道"),
		PAY_TYPE("PAY_TYPE","支付类型"),
		SCOPE_TYPE("SCOPE_TYPE","使用范围"),
		SDW_TYPE("SDW_TYPE","水电网"),
		SECURITY_TYPE("SECURITY_TYPE","安保系统"),
		SERVICE_MODE("SERVICE_MODE","服务模式"),
		STORE_MODE("STORE_MODE","仓库模式"),
		STORE_STATUS("STORE_STATUS","仓库状态"),
		STORE_TYPE("STORE_TYPE","仓库类型"),
		TERRACE_TYPE("TERRACE_TYPE","地坪"),
		WORK_TYPE("WORK_TYPE","作业设备"),
		STORE_NEED_STATUS("STORE_NEED_STATUS", "货主发布需求状态"),
		STORE_NEED_QUOTE_STATUS("STORE_NEED_QUOTE_STATUS", "报价状态"),
		STORE_QUOTE_STATUS("STORE_QUOTE_STATUS", "仓库报价状态"),
		ORDER_CHANNEL("ORDER_CHANNEL", "订单渠道");

		private String code;
		private String name;
		StaticDataCodeType(String code, String name) {
			this.code = code;
			this.name = name;
		}
		public String getCode() {
			return code;
		}
		public String getName() {
			return name;
		}
		public static StaticDataCodeType getValueByCode(String code) {
			if (StringUtils.isBlank(code)) {
				return null;
			}
			String codeValue = code.trim();
			for(StaticDataCodeType staticDataCodeType :StaticDataCodeType.values()) {
				if (staticDataCodeType.getCode().equals(codeValue)) {
					return staticDataCodeType;
				}
			}
			return null;
		}
	}
	/**
	 * 地址类型的枚举
	 * 1国家，2省，3地市，4区县
	 */
	public enum ADDRESS_TYPE {
		COUNTRY("1", "国家"),
		PROVINCE("2", "省"),
		CITY("3", "地市"),
		REGION("4", "区县");
		private String code;
		private String name;
		ADDRESS_TYPE(String code, String name) {
			this.code = code;
			this.name = name;
		}
		public String getCode() {
			return code;
		}
		public String getName() {
			return name;
		}
	}
    /**
     * 平台类型
     */
    public static final class PLATFORM_TYPE {
        /**移动端，目前安卓和IOS属于移动端，需求方**/
        public static final String  MOBILE_REQUIRE = "MOBILE_REQUIRE";
        
        /**PC端，货主**/
        public static final String  PC_REQUIRE = "PC_REQUIRE";
        /**PC端，CP**/
        public static final String PC_CP = "PC_CP";
        /**PC端，管理后台**/
        public static final String PC_MANAGE= "PC_MANAGE";
    }
    
    /**
     * 序列队列编码
     */
    public static final class SEQUENCE_CODE {
        /**仓储订单**/
        public static final String  STORE_ORDER = "CC";
    }
    
    /**
     * 七牛图片缩放效果
     * @author 10058393
     *
     */
    public enum QINIU_ENUM {
    	
    	/**APP首页仓库略缩图80、70居中裁剪**/
    	FOPS1(1, "APP首页仓库略缩图80、70居中裁剪"),
    	
    	/**APP BANNER图375、120等比缩放**/
    	FOPS2(2, "APP BANNER图375、120等比缩放"),
    	
    	/**仓库详情仓库图片缩放效果375、150等比缩放**/
    	FOPS3(3, "仓库详情仓库图片缩放效果375、150等比缩放"),
    	
    	/**CP营业执照144、214等比缩放**/
    	FOPS4(4, "CP营业执照144、214等比缩放"),
    	
    	/**CP仓库列表略缩图100、100居中裁剪**/
    	FOPS5(5, "CP仓库列表略缩图100、100居中裁剪"),
    	
    	/**CP仓库列表略缩图150、150居中裁剪**/
    	FOPS6(6, "CP仓库列表略缩图150、150居中裁剪");
    	
    	private Integer value;
    	private String description;
    	
		private QINIU_ENUM(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
    }
    
    /**
     * 用户操作系统公告日志表状态
     * ClassName: PUSHMESSAGE_LOG_STATUS 
     * @author liuzhaohui
     * @date 2017年3月10日
     * @Description: 
     */
    public static final class PUSHMESSAGE_LOG_STATUS {
    	
    	/**1已读 **/
    	public static final Integer READ = 1;
    	
    	/**2已删 **/
    	public static final Integer DELETE = 2;
    }
	/**
	 * 是否发送给CP ClassName: IS_SEND_CP
	 * 
	 * @author liuzhaohui
	 * @date 2017年3月10日
	 * @Description: 
	 */
	public static final class IS_SEND_CP {
		/** 1发送 **/
		public static final Integer SEND = 1;
		/** 0不发送 **/
		public static final Integer NOT_SEND = 0;
	}
    
	/**
	 * 是否发送给货主
	 * ClassName: IS_SEND_NEEDER
	 * @author liuzhaohui
	 * @date 2017年3月10日
	 * @Description: 
	 */
	public static final class IS_SEND_NEEDER {
		/** 1发送 **/
		public static final Integer SEND = 1;
		/** 0不发送 **/
		public static final Integer NOT_SEND = 0;
	}
	
	/**
	 * 是CP还是货主
	 * ClassName: CP_OR_NEEDER
	 * @author liuzhaohui
	 * @date 2017年3月10日
	 * @Description: 
	 */
	public static final class CP_OR_NEEDER {
		/** 1CP **/
		public static final Integer CP = 1;
		/** 0货主 **/
		public static final Integer NEEDER = 0;
	}
	
	/**
	 * 角色状态
	 * ClassName: ROLE_STATE 
	 * @author liuzhaohui
	 * @date 2017年3月13日
	 * @Description: 
	 */
	public static final class ROLE_STATE {
		/** 1正常 **/
		public static final String NORMAL = "1";
		/** 0停用 **/
		public static final String STOP = "0";
	}
	
	/**
	 * 极光推送TAG类型
	 * @author 10058393
	 */
	public static final class JG_TAG {
		/**指定需求方（货主）**/
		public static final String STORE_CP_TAG = "STORE_CP";
		/**指定合作伙伴（仓主）**/
		public static final String STORE_NEEDER_TAG = "STORE_NEEDER";
		/**需求方（货主）、合作伙伴（仓主）都推送**/
		public static final String STORE_ALL = null;
		/**所有的CP**/
		public static final String STORE_ALL_CP_TAG = "STORE_ALL_CP";
		/**所有的货主**/
		public static final String STORE_ALL_NEEDER_TAG = "STORE_ALL_NEEDER";
	}
	
	/**
	 * 融云设置USER_ID的前缀，区分CP和货主
	 * @author 10058393
	 *
	 */
	public static final class RONGYUN_USER_PREFIX {
		/**
		 * CP的USER_ID前缀
		 */
		public static final String STORE_CP_ = "STORE_CP_";
		/**
		 * 货主的USER_ID前缀
		 */
		public static final String STORE_NEEDER_ = "STORE_NEEDER_";
	}
	
	public enum PushMessageType {
		ANNOUNCEMENT_TYPE(1, "系统公告"),
		ORDER_TYPE(2, "推送消息-订单类"),
		STORE_TYPE(3, "推送消息-仓库类"),
		BILL_TYPE(4, "推送消息-账单类"),
		USER_AUTH_TYPE(5, "用户认证类");
		
		private PushMessageType(Integer id, String description) {
			this.id = id;
			this.description = description;
		}
		private Integer id;
		private String description;
		public Integer getId() {
			return id;
		}
		public String getDescription() {
			return description;
		}
	}
	
	public enum SecResourceEnum {
		
		//业务相关
		PERSONAL_REQUIREMENT_USER_VERIFY(15, "个人货主审核"),
		COMPANY_REQUIREMENT_USER_VERIFY(17, "企业货主审核"),
		CP_USER_VERIFY(19, "CP审核"),
		STORE_NEW_VERIFY(21, "仓库发布审核"),
		STORE_UPDATE_VERIFY(22, "仓库修改审核"),
		ORDER_CANCEL(24, "取消订单"),
		ANNOUNCE_NEEDER_PUSH(25, "向货主发送公告"),
		ANNOUNCE_CP_PUSH(26, "向CP发送公告"),
		
		//系统用户相关
		SEC_USER_ADD(29, "增加用户"),
		SEC_USER_DISABLE(30, "禁用用户"),
		SEC_USER_ENABLE(31, "启用用户"),
		SEC_USER_UPDATE(32, "修改用户"),
		
		//系统角色相关
		SEC_ROLE_ADD(34, "增加角色"),
		SEC_ROLE_DELETE(35, "删除角色"),
		SEC_ROLE_UPDATE(36, "修改角色"),
		
		//系统权限相关
		SEC_RESOURCE_ADD(38, "增加权限"),
		SEC_RESOURCE_UPDATE(39, "修改权限"),
		SEC_RESOURCE_DELETE(40, "删除权限");
		
		private Integer id;
		private String name;
		private SecResourceEnum(Integer id, String name) {
			this.id = id;
			this.name = name;
		}
		public Integer getId() {
			return id;
		}
		public String getName() {
			return name;
		}
		
	}
	
	/**
	 * sec_resource action枚举值
	 * <p>操作类型</p>
	 * <ul>
	 * <li>0-其他</li>
	 * <li>1-新增</li>
	 * <li>2-修改</li>
	 * <li>3-删除</li>
	 * <li>4-查看</li>
	 * <li>5-审核</li>
	 * </ul>
	 * @author kuanghuan
	 * @date 2017-3-16
	 */
	enum Act {
		
		OTHER("other",0),
		ADD("add",1),
		UPDATE("update",2),
		DELETE("delete",3),
		VIEW("view",4),
		VERIFY("verify",5);
		
		private String name;
		private Integer val;
		
		private Act(String name,Integer val){
			this.name = name;
			this.val = val;
		}
		public String getName() {
			return name;
		}
		public Integer getVal() {
			return val;
		}
	}
	
	/**
	 * sec_resource type枚举值
	 * <p>资源类型</p>
	 * <ul>
     * <li>0-其他 </li>
     * <li>1-菜单</li>
     * <li>2-页面 (通常是一个列表页地址)</li>
     * <li>3-操作(通常是一个新增提交请求)</li>
     * </ul>
	 * @author kuanghuan
	 * @date 2017-3-16
	 */
	enum Type {
		
		OTHER("other",0),
		MENU("menu",1),
		PAGE("page",2),
		OPERATION("operation",3);
		
		private String name;
		private Integer val;
		
		private Type(String name,Integer val){
			this.name = name;
			this.val = val;
		}
		public String getName() {
			return name;
		}
		public Integer getVal() {
			return val;
		}
	}
	
	/**
	 * 用户是否激活
	 * @author 10058393
	 *
	 */
	public enum UserActivate {
		NO_ACTIVATE(0, "未激活"),
		ACTIVATED(1, "已激活");
		private Integer value;
		private String description;
		private UserActivate(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	/**
	 * 系统用户状态
	 * @author 10058878
	 *
	 */
	public enum SecUserState {
		NORMAL(1, "正常 "),
		DISABLED(0, "禁用");
		private Integer value;
		private String description;
		private SecUserState(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	/**
	 * 仓储需求状态
	 * @author 10058393
	 *
	 */
	public enum StoreNeedStatus {
		
		PUBLISHING(1, "发布中"),
		FINISH(2, "已完成"),
		CLOSED(3, "已结束");
		
		private Integer value;
		private String description;
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
		private StoreNeedStatus(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		
	}
	
	/****
	 * 报价状态
	 * 1-报价中
	 * 2-报价成功
	 * 3-已取消
	 * @author linlun
	 */
	public enum StoreNeedQuoteStatus {
		
		OFFER(1,"报价中"),
		SUCCESS(2,"报价成功"),
		CANCEL(3,"已取消");
		
		private Integer val;
		private String desc;
		
		public Integer getVal() {
			return val;
		}
		public String getDesc() {
			return desc;
		}
		private StoreNeedQuoteStatus(Integer val,String desc){
			this.val = val;
			this.desc = desc;
		}
	}
	
	/**
	 * 仓库报价状态
	 * <li>0未报价</li>
	 * <li>1已报价</li>
	 * @author 10058393
	 *
	 */
	public enum StoreQuoteStatus {
		UN_QUOTE(0, "未报价"),
		QUOTED(1, "已报价");
		private Integer value;
		private String description;
		private StoreQuoteStatus(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	public enum StoreOrderChannel {
		WEB(1, "WEB"),
		APP_ANDROID(2, "APP-Android"),
		APP_IOS(3, "APP-IOS");
		private Integer value;
		private String description;
		private StoreOrderChannel(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	public enum LadderPrice {
		YES(1, "阶梯报价"),
		NO(0, "非阶梯报价");
		Integer value;
		String description;
		private LadderPrice(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	public enum ServiceMode {
		ONLY_STORE(1, "仓储"),
		STORE_AND_OPER(2, "仓储+库内操作"),
		STORE_AND_OPER_AND_TRANS(3, "仓储+库内操作+运输"),
		STORE_AND_TRAN(4, "仓储+运输");
		Integer value;
		String description;
		private ServiceMode(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
	/**
	 * 
	 * ClassName: StoreFollow 
	 * @author liuzhaohui
	 * @date 2017年5月22日
	 * @Description:
	 */
	public enum StoreFollowStatus {
		NO_FOLLOW(0, "取消关注"),
		FOLLOW(1, "关注");
		private Integer value;
		private String description;
		private StoreFollowStatus(Integer value, String description) {
			this.value = value;
			this.description = description;
		}
		public Integer getValue() {
			return value;
		}
		public String getDescription() {
			return description;
		}
	}
	
}

