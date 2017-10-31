package com.retail.impl;

import javax.annotation.Resource;  
import org.springframework.stereotype.Service;  

import com.retail.service.IDataService;
import com.retail.domain.Data;
import com.retail.IDao.DataMapper;

@Service("dataService") 
public class DataServiceImpl implements IDataService {
	@Resource  
    private DataMapper dataDao;  
    @Override  
    public Data getDataById(int dataId) {  
        // TODO Auto-generated method stub  
        return this.dataDao.selectByPrimaryKey(dataId); 
	
}
}
