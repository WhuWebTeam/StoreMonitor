### users

    | attributes  | type         | limit        | description      |
    | ---         | ---          | ---          | ---              |
    | id          | serial       |              | table increase   |
    | userNumber  | varchar(50)  | primary key  |                  |
    | userName    | varchar(50)  | not null     |                  | 
    | password    | varchar(50)  | not null     |                  |
    | level       | int          | not null     | user's level     |
    | phone       | varchar(11)  |              |                  |
    | email       | varchar(20)  |              |                  |

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


### 