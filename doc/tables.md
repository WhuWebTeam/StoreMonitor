### users

1. structure

    | attributes  | type         | limit        | description              |
    | ---         | ---          | ---          | ---                      |
    | id          | serial       |              | table increase           |
    | userNumber  | varchar(50)  | primary key  |                          |
    | userName    | varchar(50)  | not null     |                          |  
    | password    | varchar(50)  | not null     |                          |
    | level       | int          | not null     | 1:防损员 2：经理 3：区域经理 |
    | phone       | varchar(11)  |              |                          |
    | email       | varchar(20)  |              |                          |

2. sqlStr
    
    -- Table: public."users"

    -- DROP TABLE public."users";

    CREATE TABLE public."users"
    (
        id serial,
        usernumber character varying(50),
        username character varying(50) NOT NULL,
        password character varying(50) NOT NULL,
        level integer NOT NULL,
        phone character varying(50),
        email character varying(50),
        CONSTRAINT user_pkey PRIMARY KEY (username)
    )
    WITH (
        OIDS=FALSE
    );
    ALTER TABLE public."users"
    OWNER TO company;



### shops

1. structure



2. sqlStr



### lists

1. structure


2. sqlStr

    CREATE TABLE public.lists
    (
        id serial,
        transId varchar(50) primary key,
        regId varchar(50),
        cashierId varchar(50),
        tsStart int,
        tsEnd int,
        scriptVer varchar(50),
        vedioUrl varchar(200),
        priority int,
        createAt timestamp,
        updateAt timestamp,
        state varchar(50),
        result varchar(50),
        shopId varchar(50)
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.lists
    OWNER TO company;


### styles 

1. structure


2. sqlStr

    CREATE TABLE public.styles
    (
        id serial,
        style varchar(50) primary key,
        fontType varchar(50),
        fontSize int,
        fontRGB varchar(50),
        iconUrl varchar(200),
        iconW int,
        iconH int,
        transId varchar(50)
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.styles
    OWNER TO company;



### events

1. structure


2. sqlStr

    CREATE TABLE public.events
    (
        id serial primary key,
        eventStart varchar(50),
        eventEnd varchar(50),
        text varchar(50),
        centerX int,
        centerY int,
        hide boolean,
        type varchar(50),
        transId varchar(50),
        style varchar(50)
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.events
    OWNER TO company;


