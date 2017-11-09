### 防损员

1. 概览本店防损事件


2. 通过APP接收防损事件（最好切片照片）


3. 针对每一事件进行处理，并提交处理结果（可暂存）--- 暂存，前端处理
    // confirm the scan result
    app.put('/api/v1/eventsList/result', 'eventLists.setResult');
    transId, ts must exist
    {
        transId,
        ts,
        editResult
    }


4. 查看历史数据的统计和图表显示


5. 查看门店内防损设备工作状态（正常、异常）


6. 关联款台查询
    // get info of counters assigned
    app.get('/api/v1/counters/assigned', 'counters.getCountersAssigned');

    
    
    // get info of counters not assigned
    app.get('/api/v1/counters/notAssaigned', 'counters.getCountersNotAssigned');

    
    
    // get all assigned counters and thier manage users
    app.get('/api/v1/counterUsers', 'counterUser.getCounterUsers');

    
    
    // get assigned info condition query
    app.post('/api/v1/counterUser', 'counterUser.getCounterUser');
    // one or more attributes of the following object
    {
        id,
        counterId,
        userId,
        type   
    }





### 防损经理

1. 本店防损概览统计及图表展示（按处置结果、商品分类查看）


2. 重点视频回放


3. 处置结果的审查


4. 防损员关联款台设定
    
    // assign some counter specified by counterId to some user specified by userId
    app.post('/api/v1/counterUser/:userId/:counterId', 'counterUser.assignCounter');
    // counterId and userId must exists
    {
        counterId,
        userId,
        type   
    }

    // retrieve some counter specified by counterId from user specified by userId
    app.delete('/api/v1/counterUser/:userId/:counterId', 'counterUser.retrieveCounter');




### 防损员


1. 统揽本区域内所有门店的防损状况及图表展示


2. 防损时间的多角度分析（数量，门店，发展趋势等）


3. 防损事件（错误率）、收银效率等的统计


4. 播放并查看防损事件视频