# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import mysql.connector
from mysql.connector import Error

class ActionBestSelling(Action):
    def name(self) -> Text:
        return "action_bestselling"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user='root', password='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh from `mon`")
                result = cursor.fetchall()
                #print(result)
                cursor.execute("SELECT idmon,sl FROM `donhang`")
                result1 = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách món bán chạy nhất bên em")
                arr={}
                for row in result1:
                  idmon = row[0].split('|')
                  sl = row[1].split('|')
                  idmon.pop(0)
                  sl.pop(0)
                  for i in range(0, len(idmon)):
                      if str(idmon[i]) in arr:
                          arr[idmon[i]] = int(arr[idmon[i]]) + int(sl[i])
                      else:
                          arr[idmon[i]] = int(sl[i])
                arr = sorted(arr.items(), key=lambda x: x[1])  
                arr_dish = arr[len(arr)-3:len(arr)]
                #print(arr_dish)
                for item in arr_dish:
                    for x in result:
                        if str(item[0]) == str(x[0]):
                            dict = {}
                            dict['text'] = str(x[1]) + "|Giá: {:,} VNĐ".format(int(x[2]))
                            dict['action'] = str(x[0])
                            dict['img'] = str(x[3])
                            dispatcher.utter_message(json_message=dict)
                            break  
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionPriceHigh(Action):
    def name(self)-> Text:
        return "action_price_high"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `gia`= (SELECT max(gia) FROM `mon`)")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách món có giá cao nhất bên em")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionPriceHighCake(Action):
    def name(self)-> Text:
        return "action_price_high_cake"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `idmon` IN (SELECT `idmon` FROM `mon` WHERE `loai` = 'banhngot' AND `gia` = (SELECT max(`gia`) FROM `mon` WHERE `loai` = 'banhngot '))")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách món bánh có giá cao nhất bên em")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e) 
            
class ActionPriceHighMilk(Action):
    def name(self)-> Text:
        return "action_price_high_milk"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `idmon` IN (SELECT `idmon` FROM `mon` WHERE `loai` = 'trasua' AND `gia` = (SELECT max(`gia`) FROM `mon` WHERE `loai` = 'trasua '))")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách thức uống có giá cao nhất bên em !!!")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)                       

class ActionPriceLow(Action):
    def name(self)-> Text:
        return "action_price_low"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `gia`= (SELECT min(gia) FROM `mon`)")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách món có giá thấp nhất bên em")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionPriceLowCake(Action):
    def name(self)-> Text:
        return "action_price_low_cake"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `idmon` IN (SELECT `idmon` FROM `mon` WHERE `loai` = 'banhngot' AND `gia` = (SELECT min(`gia`) FROM `mon` WHERE `loai` = 'banhngot '))")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách món bánh ngọt có giá thấp nhất bên em !!!")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionPriceLowMilk(Action):
    def name(self)-> Text:
        return "action_price_low_milk"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `idmon` IN (SELECT `idmon` FROM `mon` WHERE `loai` = 'trasua' AND `gia` = (SELECT min(`gia`) FROM `mon` WHERE `loai` = 'trasua '))")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách thức uống có giá thấp nhất bên em !!!")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionSearchDish(Action):
    def name(self)-> Text:
        return "action_search_dish"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            entities = tracker.latest_message['entities']
            keyword= entities[0]['value']
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `tenmon` LIKE '%" + keyword + "%' ")
                result = cursor.fetchall()
                if len(result) == 0:
                    dispatcher.utter_message("Rất tiếc món của bạn tìm không có trong menu cửa hàng bên em.")
                else:
                    dispatcher.utter_message("Gửi quý khách các món liên quan đến {} !!!".format(str(keyword)))
                    for i in result:
                        dict ={}
                        dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                        dict['action'] = str(i[0])
                        dict['img'] = str(i[3])
                        dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionSearchPriceSize(Action):
    def name(self)-> Text:
        return "action_search_price_size"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            entities = tracker.latest_message['entities']
            keyword= entities[0]['value']
            size = entities[1]['value']
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT idmon,tenmon,gia,hinhanh FROM `mon` WHERE `tenmon` LIKE '%" + keyword + "%' ")
                result = cursor.fetchall()
                if len(result) == 0:
                    dispatcher.utter_message("Rất tiếc món của bạn tìm không có trong menu cửa hàng bên em.")
                else:
                    dispatcher.utter_message("Gửi quý khách các món liên quan đến {} !!!".format(str(keyword)))
                    for i in result:
                        dict ={}
                        if size == 's':
                            dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                        elif size == 'm':
                            dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2]+5000)))
                        else:
                            dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2]+10000)))
                        dict['action'] = str(i[0])
                        dict['img'] = str(i[3])
                        dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionListDiscount(Action):
    def name(self)-> Text:
        return "action_list_discount"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT `m`.`idmon`,tenmon,gia FROM `khuyenmai` k JOIN `mon` m ON `k`.`idmon` = `m`.`idmon`")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách danh sách các món đang có khuyến mãi bên em, vui lòng nhấp vào để xem chi tiết !!!")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = None    
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)

class ActionRateHigh(Action):
    def name(self)-> Text:
        return "action_rate_high"

    def run(self, dispatcher: CollectingDispatcher, tracker:Tracker, domain):
        try:
            connect = mysql.connector.connect(host='127.0.0.1', user ='root', password ='', database='database')
            if connect.is_connected():
                cursor = connect.cursor()
                cursor.execute("SELECT `m`.`idmon`,`m`.`tenmon`,`m`.`gia`,`m`.`hinhanh`,AVG(`b`.`diem`) avg FROM `mon` m JOIN `binhluan` b ON `m`.`idmon`=`b`.`idmon` GROUP BY (`b`.`idmon`) HAVING avg >= 4")
                result = cursor.fetchall()
                dispatcher.utter_message("Gửi quý khách danh sách các món được đánh giá cao bên em, vui lòng nhấp vào để xem chi tiết !!!")
                for i in result:
                    dict ={}
                    dict['text'] = str(i[1] + "|Giá: {:,} VNĐ".format(int(i[2])))
                    dict['action'] = str(i[0])
                    dict['img'] = str(i[3])   
                    dispatcher.utter_message(json_message=dict)
                cursor.close()
            connect.close()
        except Error as e:
            dispatcher.utter_message(e)