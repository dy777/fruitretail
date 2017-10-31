
import org.junit.runner.RunWith;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.retail.core.HelloQuartzJob;

@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类  
@ContextConfiguration(locations = {"classpath:spring.xml"})  

public class quartztest {
	 public static void main(String[] args)throws SchedulerException {

    	 //通过schedulerFactory获取一个调度器  
        SchedulerFactory schedulerfactory=new StdSchedulerFactory();  
        Scheduler scheduler=null;  
        try{  
//       通过schedulerFactory获取一个调度器  
            scheduler=schedulerfactory.getScheduler();
              
//        创建jobDetail实例，绑定Job实现类  
//        指明job的名称，所在组的名称，以及绑定job类  
            JobDetail job=JobBuilder.newJob(HelloQuartzJob.class).withIdentity("HelloQuartzJob", "jgroup1").build();  
            
              
//        定义调度触发规则  
              
//       使用simpleTrigger规则  
         Trigger trigger=TriggerBuilder.newTrigger().withIdentity("simpleTrigger", "triggerGroup")  
                         .withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(5).withRepeatCount(8))  
                         .startNow().build();  
//       使用cornTrigger规则  每天10点42分  
//               Trigger trigger=TriggerBuilder.newTrigger().withIdentity("simpleTrigger", "triggerGroup")  
//               .withSchedule(CronScheduleBuilder.cronSchedule("0 42 10 * * ? *"))  
//               .startNow().build();   
              
//        把作业和触发器注册到任务调度中  
            scheduler.scheduleJob(job, trigger);  
              
//        启动调度  
            scheduler.start();  
              
              
        }catch(Exception e){  
            e.printStackTrace();  
        }  
    }

}
