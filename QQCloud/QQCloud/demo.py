# -*- coding: utf-8 -*-
import json
import jsonKit
import random
import time
import requests

from src.QcloudApi.qcloudapi import QcloudApi
from qcloud_cos import CosClient
from qcloud_cos import UploadFileRequest
from qcloud_cos import UploadSliceFileRequest

TransID = 13579
userid = 1252273881
appid = 10022853               # VOD专用APPID 不能用别的
secret_id = 'AKIDJSP8cqyZ4KM8fwwjJekbDblhOpDbroY4'         # 替换为用户的secret_id
secret_key = 'SfdMr8AxVoshIitpVxA8rMcdPxIPGsGP'         # 替换为用户的secret_key=

url = 'http://121.201.13.217:27002/api/v1/video'
requests.adapters.DEFAULT_RETRIES = 5
headers = {'content-type': 'application/json'}

while (1):
    cnt = random.randint(1, 60)

    videoPath = './video/ ('+str(cnt)+').avi'
    coverPath = './video/('+str(cnt)+').jpg'

    ##1 发起VOD上传 
    module = 'vod'
    action = 'ApplyUpload'
    config = {
        'Region': '',
        'secretId': secret_id,
        'secretKey': secret_key,
        'method': 'post'
    }

    params = {
        'videoType': 'avi',
        'coverType': 'jpg'
    }

    try:
        service = QcloudApi(module, config)
        result = json.loads(service.call(action, params))
        print 'apply:',result['code']

        flagRet=False
        if(result['code'] == 0): ##获得权限就继续
            bucket = result['storageBucket']
            region = result['storageRegion']
            vodSessionKey = result['vodSessionKey']
            videoDst = result['video']['storagePath']
            coverDst = result['cover']['storagePath']
            flagRet = True
        else:
            continue
        
        videoPathLPS = 'http://'+str(userid)+'.vod2.myqcloud.com'+result['video']['storagePath']
        picturePathLPS = 'http://'+str(userid)+'.vod2.myqcloud.com'+result['cover']['storagePath']
        
        print 'video', videoPathLPS
        print 'cover', picturePathLPS

    except Exception, e:
        print 'exception:', e
        continue

    ##2 用文件系统COS上传
    cos_client = CosClient(appid, unicode(secret_id), unicode(secret_key), region)
    #上传视频
    request = UploadFileRequest(bucket, videoDst, unicode(videoPath))
    request.set_insert_only(0) 
    result = cos_client.upload_file(request)
    print 'video:',result['code']
    if(result['code'] != 0):
        continue
    #上传封面
    request = UploadFileRequest(bucket, coverDst, unicode(coverPath))
    request.set_insert_only(0) 
    result = cos_client.upload_file(request)
    print 'cover:',result['code']
    if(result['code'] != 0):
        continue

    ##3 确认上传
    module = 'vod'
    action = 'CommitUpload'
    params = {
        'vodSessionKey': vodSessionKey
    }
    try:
        service = QcloudApi(module, config)
        result = json.loads(service.call(action, params))
        print 'cos:',result['code']

        flagRet=False
        if(result['code'] == 0):
            fileId = result['fileId']
            videoUrl = result['video']
            coverUrl = result['cover']
            flagRet = True
        else:
            continue

    except Exception, e:
        print 'exception:', e
        continue

    ShopID = 'WM%02d%02d' %(random.randint(1, 3), random.randint(1, 3))
    RegID = '%04d' %(random.randint(1, 30))
    CashierID = 'WME20%02d%04d' %(random.randint(15, 17),random.randint(1, 3))
    CustomerID = 'WMC20%02d%04d' %(random.randint(15, 17),random.randint(1, 3))

    TsStart = int( (time.time() - random.randint(3600, 28400)) * 1000 )
    TsEnd = TsStart + int(random.uniform(10, 60) * 1000)
    TransID = TransID + random.randint(10, 100)

    Bills = []
    totalSeconds = (TsEnd - TsStart)/1000
    totalBills = random.randint(1, 5)
    cntBills = 0

    while(cntBills<totalBills):
        cntBills = cntBills + 1

        Start = int(cntBills * totalSeconds/totalBills)
        end = Start + random.randint(1, 3)
        Sku = 'Sku/No %04x%04x' %(random.randint(255, 65535) ,random.randint(1000, 1000000))
        Text = ('Test %04d'+str(cntBills))

        if(cntBills%3==0):
            bill = {
                'Start': Start,
                'End': end,
                'Ts': TsStart+int(Start*1000),
                'VideoUrl': videoPathLPS,
                'PictureUrl0': picturePathLPS,
                'PictureUrl1': '',
                'PictureUrl2': '',
                'PictureUrl3': '',
                'Sku': Sku,
                'Text': '可口可乐300ml',
                'CenterX': random.randint(160, 480),
                'CenterY': random.randint(90, 270),
                'Type': 'Normal',
                'Hide': 'True',
                'Price': random.uniform(1, 100),
                'Amount':random.randint(1, 10),
            }
        elif(cntBills%3==1):
            bill = {
                'Start': end,
                'End': end+2,
                'Ts': TsStart+int(end*1000),
                'VideoUrl': videoPathLPS,
                'PictureUrl0': picturePathLPS,
                'PictureUrl1': '',
                'PictureUrl2': '',
                'PictureUrl3': '',
                'Sku': '',
                'Text': '',
                'CenterX': random.randint(160, 480),
                'CenterY': random.randint(90, 270),
                'Type': 'no scan',
                'Hide': 'False',
                'Price': 0,
                'Amount':1,
            }
        elif(cntBills%3==2):
            bill = {
                'Start': end+2,
                'End': end+4,
                'Ts': TsStart+int((end+2)*1000),
                'VideoUrl': videoPathLPS,
                'PictureUrl0': picturePathLPS,
                'PictureUrl1': '',
                'PictureUrl2': '',
                'PictureUrl3': '',
                'Sku': '',
                'Text': '',
                'CenterX': random.randint(160, 480),
                'CenterY': random.randint(90, 270),
                'Type': 'cart left',
                'Hide': 'False',
                'Price': 0,
                'Amount':1,
            }
        Bills.append(bill)

    protocols = {
        'ShopID': ShopID,
        'RegID': RegID,
        'RegType': 'pos',
        'CashierID': CashierID,
        'CustomerID': CustomerID ,
        'TsStart': TsStart,
        'TsEnd': TsEnd,
        'TransID': str(TransID),
        'ScriptVer': 'v1.00',
        'Priority': 1,
        'Bills': Bills
    }

    print jsonKit.dictionary2json(protocols)

    ret = requests.post(url, data = jsonKit.dictionary2json(protocols), headers = headers)
    print ret
    requests.session().keep_alive = False

    time.sleep(30+random.randint(30, 300))
