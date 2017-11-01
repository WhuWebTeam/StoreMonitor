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

   -- DROP TABLE public.lists;

    CREATE TABLE public.lists
    (
        id serial,
        transid character varying(50) NOT NULL,
        regid character varying(50),
        cashierid character varying(50),
        tsstart bigint,
        tsend bigint,
        scriptver character varying(50),
        vediourl character varying(200),
        priority integer,
--        state character varying(50),
        result character varying(50),
        shopid character varying(50),
        createAt bigint,
        updateAt bigint,
        CONSTRAINT lists_pkey PRIMARY KEY (transid)
    )
    WITH (
        OIDS=FALSE
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
        eStart varchar(50),
        eEnd varchar(50),
        text varchar(50),
        centerX int,
        centerY int,
        hide boolean,
        type varchar(50),
        transId varchar(50) not null,
        style varchar(50) not null
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.events
    OWNER TO company;


