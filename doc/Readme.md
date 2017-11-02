# structure of table in StoreMonitorSystem


### users

    | attributes  | type         | limit        | description              |
    | ---         | :---:        | :---:        | :---:                    |
    | id          | serial       |              | table increase           |
    | userNumber  | varchar(50)  | primary key  |                          |
    | userName    | varchar(50)  | not null     |                          |
    | password    | varchar(50)  | not null     |                          |
    | level       | int          | not null     | 1:防损员 2：经理 3：区域经理 |
    | phone       | varchar(11)  |              |                          |
    | email       | varchar(20)  |              |                          |


### shops

    | attributes  | type         | limit        | description              |
    | ---         | ---          | ---          | ---                      |
    | id          | serial       |              | table increase           |


### lists

    | attributes  | type         | limit        | description              |
    | ---         | ---          | ---          | ---                      |
    | id          | serial       |              | table increase           |
    | transId     | varchar(50)  | primary key  |                          |
    | regId       | varchar(50)  |              | counter id               |
    | cashierId   | varchar(50)  |              | cashier id               |
    | tsStart     | bigint       |              | video start time         |
    | tsEnd       | bigint       |              | video end time           |
    | scriptVer   | varchar(50)  |              | pos record version       |
    | videoURL    | VARCHAR(200) |              | URL of video             |
    | priority    | int          |              |                          |
    | result      | varchar(50)  |              | result confirmed         |
    | createAt    | bigint       |              | create time of record    |
    | updateAt    | bigint       |              | update time of record    |
    | shopId      | varchar(50)  |              | shop's id ---- shops     |


### styles 

    | attribute   | type         | limit        | description              |
    | ---         | ---          | ---          | ---                      |
    | id          | serial       |              | table increase           |
    | fontType    | varchar(50)  | primary key  |                          |
    | fontSize    | int          |              |                          |
    | foneRGB     | varchar(50)  |              |                          |
    | iconURL     | varchar(200) |              | URL of event icon        |
    | iconW       | int          |              | width of event icon      |
    | iconH       | int          |              | height of event icon     |
    | createAt    | bigint       |              | record's create time     |
    | updateAt    | bigint       |              | record's update time     |
    | transId     | varchar(50)  |              | transaction id --- lists |


### events

    | attribute   | type         | limit        | description              |
    | ---:        | ---:         | ---:         | ---:                     |
    | id          | serial       |              | table increase           |
    | eStart      | varchar(50)  |              | event start time in pos  |
    | eEnd        | varchar(50)  |              | event end time in pos    |
    | text        | varchar(50)  |              | text description of event|
    | centerX     | int          |              | position X of event      |
    | centerY     | int          |              | postion Y of event       |
    | createAt    | bigint       |              | record create time       |
    | updateAt    | bigint       |              | record update time       |
    | transId     | varchar(50)  |              | transaction id --- lists |
    | style       | varchar(50)  |              | event stylr --- styles   |



[Table Structure] (https://github.com/qwasxj/StoreMonitor/blob/develop/doc/StoreMonitor.png?raw=true "StoreMonitor Table Structure")


![Table Structure] (https://github.com/qwasxj/StoreMonitor/blob/develop/doc/StoreMonitor.png?raw=true)