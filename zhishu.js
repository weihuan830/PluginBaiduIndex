setTimeout(function(){
    var  script=document.createElement('script');
    script.text = `var  saveTextAsFile = function(val,name){var  textToSave = val;var  textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});var  textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);var  fileNameToSaveAs = name;var  downloadLink = document.createElement("a");downloadLink.download = fileNameToSaveAs;downloadLink.href = textToSaveAsURL;document.body.appendChild(downloadLink);downloadLink.click();}
    var s1 = 'type=0&startdate=';
    var s2 = '-01-01&enddate=';
    var s3 = '-12-21&forecast=0word='+(window.location.href).split('word=')[1];
    var keyword = $('#adv_schfm [name=word]')[0].value;
    var getdata = function(paramsStr,i){
        BID.dataInterface('Search/getSubIndex/', paramsStr, function (msg) {
            var datas = msg.data.all[0];
            var name = i+'-'+keyword;
            saveTextAsFile(datas.userIndexes_100,name);
            var imgSrc = '/Interface/IndexShow/getYaxis/?res=' + window.PPval.ppt + '&res2=' + window.PPval.res2 +'&max_y=' + datas.max_y + '&min_y=' + datas.min_y + '&axis=' + datas.step_y;
            var a = $('<a>').attr('href', imgSrc).attr('download', name+'.png').appendTo('body');
            a[0].click();
        }, {loading: T('#trend').parent()[0]});
    }
    var get2018 = function(){
        BID.dataInterface('Search/getSubIndex/', paramsStr, function (msg) {
            var date = new Date();
            var month = date.getMonth()+1;
            var day = date.getDate();
            if(day < 10){
                day = "0"+day;
            }
            if(month<10){
                month = "0"+month;
            }
            var paramsStr = 'type=0&startdate=2018-01-01&enddate=2018-'+month+'-'+date.getDate()+'&forecast=0word='+(window.location.href).split('word=')[1];;
            var datas = msg.data.all[0];
            var name = '2018-'+keyword;
            saveTextAsFile(datas.userIndexes_100,name);
            var imgSrc = '/Interface/IndexShow/getYaxis/?res=' + window.PPval.ppt + '&res2=' + window.PPval.res2 +'&max_y=' + datas.max_y + '&min_y=' + datas.min_y + '&axis=' + datas.step_y;
            var a = $('<a>').attr('href', imgSrc).attr('download', name+'.png').appendTo('body');
            a[0].click();
        }, {loading: T('#trend').parent()[0]});
    }
    for (var i = 2011; i < 2018; i++) {
        paramsStr = s1+i+s2+i+s3;
        getdata(paramsStr,i);
    }
    get2018();`
    document.body.appendChild(script);
},1000);