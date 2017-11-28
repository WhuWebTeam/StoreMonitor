select b.count / e.count 
from (select count(transId) from eventsList where to_timestamp(ts) > now() - interval '1 day') 