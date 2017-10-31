import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.retail.domain.Data;
import com.retail.service.IDataService;

@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类  
@ContextConfiguration(locations = {"classpath:spring.xml"})  

public class testdata {
	private static Logger logger = Logger.getLogger(testdata.class);  
//  private ApplicationContext ac = null;  
    @Resource  
    private IDataService dataService = null;  
  
//  @Before  
//  public void before() {  
//      ac = new ClassPathXmlApplicationContext("applicationContext.xml");  
//      userService = (IUserService) ac.getBean("userService");  
//  }  
  
    @Test  
    public void test1() {  
        Data data = dataService.getDataById(2);  
     // System.out.println(user.getUserName());
        String str=JSON.toJSONString(data);
        logger.info("值："+str); 
}
}
