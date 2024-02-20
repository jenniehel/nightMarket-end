// 引用linebot SDK
var linebot = require('linebot');
var express = require('express');
// 用於辨識Line Channel的資訊
var bot = linebot({
    channelId: '',
    channelSecret: '',
    channelAccessToken: 'flaL2NuZrrAiCg4bEjTMRy/dQ5imgYMOTgTIHPjFnZKbz+WCPYfbvZCBOJ+K76KTgrBvXOZdv6geoMKYmGpLMia5tNU0moRcCsQJ90MTvk1UPfkh6SoX/dsI4zXtt9xbAER0aAC/zGz8baO8MlpyuAdB04t89/1O/w1cDnyilFU='
});
const app = express();
let m = {
    "type": "sticker",
    "packageId": "11538",
    "stickerId": "51626494",

}
var myLineTemplate = {
    type: 'template',
    altText: 'this is a confirm template',
    template: {
        type: 'buttons',
        text: '按下選單可以控制可以再看到這個選單！',
        actions: [{
            type: 'postback',
            label: '好久不見',
            data: '好久不見'
        }, {
            type: 'postback',
            label: '感謝你',
            data: '感謝你'
        }, {
            type: 'postback',
            label: '你好',
            data: '你好'
        }, {
            type: 'postback',
            label: '我的身高',
            data: '我的身高'
        }, {
            type: 'postback',
            label: '真好',
            data: '真好'
        }]
    }

};







//重複回訊息
// let m={
//     "type": "sticker",
//     "packageId": "11538",
//     "stickerId": "51626494",

// }



bot.on('message', function(event) {
    event.reply(myLineTemplate).then(function(data) {
        // success 
        console.log("成功")
    }).catch(function(error) {
        // error 
        console.log(error);
    });
})

function change(a) {
    if (a == "好久不見") {
        let m = "真的太久不見了"
        return m
    } else if (a == "感謝你") {
        let m = "感謝你，這世界好像天堂"
        return m
    } else if (a == "你好") {
        let m = "你好你好，有你真好"
        return m
    } else if (a == "我的身高") {
        var aa = Math.floor(Math.random() * 200) + 100
        console.log(aa)

        let m = "你的身高" + aa
        return m
    } else {
        let m = "世界因為你而美滿了"
        return m

    }
}

bot.on('postback', async function(event) {
    var myResult = event.postback.data
    var result = change(myResult);
    var myResult2 = ""



    console.log(myResult + "a");
    await event.source.profile().then(function(profile) {
        console.log("iam" + profile.displayName + JSON.stringify(profile))
        myResult2 = profile.displayName;

        // event.reply(JSON.stringify(profile)+'Hello ' + profile.displayName);
    }).catch(function(error) {
        console.log(error)
    });

    if (myResult != '') {


        event.reply([myResult2 + myResult + "aaa", result, m]).then(function(data) { //myresult 包裝回復
            // success 
            console.log(myResult2 + "myresult2 " + myResult)
            console.log('訊息已傳送！');
            // event.Response(data).then(function(m){
            //   console.log(m+"m")
            // }).catch(function(error){
            //   console.log("resopnse"+error)
            // })


        }).catch(function(error) {
            // error 
            console.log(error);
        });
    }

});



const linebotParser = bot.parser();
app.post('/', linebotParser);
//==============================================================
// var getJSON = require('get-json');
// bot.on('message', function(event) {
//   console.log(event); //把收到訊息的 event 印出來看看
// });


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {

    var port = server.address().port;

    console.log("App now running on port", port);
});


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
// var server = app.listen(process.env.PORT || 8080, function() {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });