## coding=utf-8

import json
# -------- jsonkit --------
def json2dictionary(jsonStr):
    jsonStr = jsonStr.replace("\\r", "")
    jsonStr = jsonStr.replace("\\n", "")
    jsonStr = jsonStr.replace("\r", "")
    jsonStr = jsonStr.replace("\n", "")
    try:
        protocols = json.loads(jsonStr)
        return protocols
    except Exception as e:
        print "Exception",e
        return None

def dictionary2json(protocols):
    try:
        jsonStr = json.dumps(protocols)
        return jsonStr
    except Exception as e:
        print "Exception",e
        return None
