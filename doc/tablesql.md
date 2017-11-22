### users

    CREATE TABLE public.users
    (
        id varchar(50) primary key,
        username varchar(50),
        password varchar(50) not null,
        phone varchar(11),
        email varchar(50),
	      authorityId varchar(50)
    )
    WITH (
        OIDS=FALSE
    );
    ALTER TABLE public.users
    OWNER TO company;



### userswm

CREATE TABLE public.userswm
(
    wmUserId varchar(50) primary key,
    wmUserLvl int,
    userName varchar(50),
    phone varchar(11),
    email varchar(50),
    authorityId varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.userswm
  OWNER TO company;



### authorities

CREATE TABLE public.authorities
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
) 
WITH (
    OIDS = FALSE
);
ALTER TABLE public.authorities
  OWNER TO company;



### userCounter

CREATE TABLE public.counterUser
(
    id serial primary key,
    userId varchar(50),
    counterId varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counterUser
  OWNER TO company;



### counters

CREATE TABLE public.counters
(
    id varchar(50) primary key,
    shopId varchar(50),
    type varchar(50),
    details varchar(500)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counters
  OWNER TO company;



### shops

CREATE TABLE public.shops
(
    id varchar(50) primary key,
    areaId varchar(50),
    name varchar(50),
    details varchar(500)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.shops
  OWNER TO company;



### areas

CREATE TABLE public.areas
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.areas
  OWNER TO company;



### bills

CREATE TABLE public.bills
(
    id serial primary key,
    price int,
    quantity int,
    amount int,
    ts bigint,
    scriptVer varchar(50),
    eventFlag varchar(50),
    startTime bigint,
    endTime bigint,
    cashierId varchar(50),
    customerId varchar(50),
    transId varchar(50),
    shopId varchar(50),
    counterId varchar(50),
    productId varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.bills
  OWNER TO company;



### cashiers

CREATE TABLE public.cashiers
(
    id varchar(50) primary key,
    name varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.cashiers
  OWNER TO company;



### customers

CREATE TABLE public.customers
(
    id varchar(50) primary key,
    name varchar(50),
    type varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.customers
  OWNER TO company;




### products

CREATE TABLE public.products
(
    id varchar(50) primary key,
    name varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.products
  OWNER TO company;



### eventsList

CREATE TABLE public.eventsList
(
    id serial primary key,
    transId varchar(50),
    ts bigint,
    createAt bigint,
    status int default 0,
    editResult varchar(50),
    comments varchar(500),
    videoUrl varchar(200),
    pic1Url varchar(200),
    pic2Url varchar(200),
    pic3Url varchar(200),
    pic4Url varchar(200)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventsList
  OWNER TO company;



# statistics tables

### cashierSalesInfo

CREATE TABLE public.cashierSalesInfo
(
    id serial primary key,
    ts bigint,
    duration bigint,
    rate real,
    amount bigint,
    cashierId varchar(50),
    transId varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.cashierSalesInfo
  OWNER TO company;



### customerSalesInfo

CREATE TABLE public.customerSalesInfo
(
    id serial primary key,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    customerId varchar(50),
    transId varchar(50),
    productId varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.customerSalesInfo
  OWNER TO company;



### productSalesInfo

CREATE TABLE public.productSalesInfo
(
    id serial primary key,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    shopId varchar(50),
    productId varchar(50),
    transId varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.productSalesInfo
  OWNER TO company;
