### users

    CREATE TABLE public."users"
    (
        id serial,
        usernumber varchar(50) primary key,
        username varchar(50),
        password varchar(50) not null,
        level int not null,
        phone varchar(11),
        email varchar(50)
    )
    WITH (
        OIDS=FALSE
    );
    ALTER TABLE public."users"
    OWNER TO company;


### shops


### lists

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
        videoURL character varying(200),
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
        createAt bigint,
        updateAt bigint,
        transId varchar(50)
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.styles
    OWNER TO company;


### events

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
        createAt bigint,
        updateAt bigint,
        transId varchar(50) not null,
        style varchar(50) not null
    ) 
    WITH (
        OIDS = FALSE
    );
    ALTER TABLE public.events
    OWNER TO company;