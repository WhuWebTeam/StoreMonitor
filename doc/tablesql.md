### users

```postgre

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

  ````



### userswm

```postgre

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

```



### authorities

```postgre

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

```



### userCounter

```postgre

CREATE TABLE public.counterUser
(
    id serial primary key,
    userId varchar(50),
    counterId varchar(50),
    type varchar(50) default 'pos'
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counterUser
  OWNER TO company;

```



### counters

```postgre

CREATE TABLE public.counters
(
    id varchar(50) primary key,
    shopId varchar(50),
    type varchar(50) default 'pos',
    details varchar(500),
    assigned boolean default false 
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counters
  OWNER TO company;

```



###

```postgre

CREATE TABLE public.shopUser
(
    id serial primary key,
    userId varchar(50),
    shopId varchar(50),
    type varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.shopUser
  OWNER TO company;

```


### shops

```postgre

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

```



### areas

```postgre

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

```



### bills

```postgre

CREATE TABLE public.bills
(
    id serial,
    syskey varchar(50) primary key,
    price int,
    quantity int,
    amount int,
    ts bigint,
    scriptVer varchar(50),
    eventFlag varchar(50),
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

```



### cashiers

```postgre

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

```



### customers

```postgre

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

```



### products

```postgre

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

```



### eventsList

```postgre

CREATE TABLE public.eventsList
(
    id serial,
    sysKey varchar(50) primary key,
    transId varchar(50),
    ts bigint,
    createAt bigint,
    editResult varchar(50),
    status int default 0,
    comments varchar(500),
    videoStartTime bigint,
    videoEndTime bigint,
    videoUrl varchar(200),
    pic1Url varchar(200),
    pic2Url varchar(200),
    pic3Url varchar(200),
    pic4Url varchar(200),
    productId varchar(50),
    productName varchar(50),
    counterId varchar(50),
    counterType varchar(50),
    cashierId varchar(50),
    cashierName varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventsList
  OWNER TO company;

```



### editResultList

```postgre

CREATE TABLE public.editResultList
(
  id varchar(50) primary key,
  name varchar(50),
  details varchar(200)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.editResultList
  OWNER TO company;

```


### eventTAT

```postgre

CREATE TABLE public.eventTAT
(
  id serial primary key,
  sysKey varchar(50),
  type int,
  actionTime bigint
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventTAT
  OWNER TO company;

```



# statistics tables

### cashierSalesInfo

```postgre

CREATE TABLE public.cashierSalesInfo
(
    id serial,
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

```



### customerSalesInfo

```postgre

CREATE TABLE public.customerSalesInfo
(
    id serial,
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

```



### productSalesInfo

```postgre

CREATE TABLE public.productSalesInfo
(
    id serial,
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

```