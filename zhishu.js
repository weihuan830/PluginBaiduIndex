setTimeout(function(){
    var  script=document.createElement('script');
    script.text = `setTimeout(function(){location.reload();},240000);
    function getNewKey_callback(data){
        $("#schword")[0].value = data;
        setTimeout(function(){$("#schsubmit")[0].click();},10000);
    }
    function getNewKey(finishkey){
        $.ajax({
            url: "http://localhost:7777/api/data?finishkey="+encodeURI(finishkey),
            dataType: "jsonp",
            jsonp: "getNewKey_callback",
            success: function(data) {
            }
        });
    }
    function SendEmptyWord_callback(data){
        $("#schword")[0].value = data;
        $("#schsubmit")[0].click();
    }
    function SendEmptyWord(word){
        $.ajax({
            url: "http://localhost:7777/api/data/empty?emptyword="+encodeURI(word),
            dataType: "jsonp",
            jsonp: "SendEmptyWord_callback",
            success: function(data) {
            }
        });
    }
    try{
        if( $(".wrapper div")[0].innerHTML.trim().substring(0,3) == "关键词"){
            var s = $(".wrapper span")[0].innerText;
            var keyword = s.substring(1,s.length-2).trim();
            SendEmptyWord(keyword);
            getNewKey(keyword);
        }
    }catch(e){
        var  saveTextAsFile = function(val,name){var  textToSave = val;var  textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});var  textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);var  fileNameToSaveAs = name;var  downloadLink = document.createElement("a");downloadLink.download = fileNameToSaveAs;downloadLink.href = textToSaveAsURL;document.body.appendChild(downloadLink);downloadLink.click();}
        var s1 = 'type=0&startdate=';
        var s2 = '-01-01&enddate=';
        var s3 = '-06-31&forecast=0word='+(window.location.href).split('word=')[1];
	    var s4 = '-07-01&enddate=';
        var s5 = '-12-31&forecast=0word='+(window.location.href).split('word=')[1];
        var keyword = $('#adv_schfm [name=word]')[0].value;
        var getdata = function(paramsStr,i,monthType){
            BID.dataInterface('Search/getSubIndex/', paramsStr, function (msg) {
                    var datas = msg.data.all[0];
                    var name = i+'-' + keyword + monthType;
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
                    var paramsStr = 'type=0&startdate=2018-01-01&enddate=2018-02-19&forecast=0word='+(window.location.href).split('word=')[1];;
                    var datas = msg.data.all[0];
                    var name = '2018-'+keyword;
                    saveTextAsFile(datas.userIndexes_100,name);
                    var imgSrc = '/Interface/IndexShow/getYaxis/?res=' + window.PPval.ppt + '&res2=' + window.PPval.res2 +'&max_y=' + datas.max_y + '&min_y=' + datas.min_y + '&axis=' + datas.step_y;
                    var a = $('<a>').attr('href', imgSrc).attr('download', name+'.png').appendTo('body');
                    a[0].click();
                    getNewKey(keyword);
    
            }, {loading: T('#trend').parent()[0]});
        }
	var timeOut = function(i){
		if(i<2018){
			setTimeout(timeOut.bind(undefined,i+1),1000);
			        paramsStr = s1+i+s2+i+s3;
                	getdata(paramsStr,i,'-a');
                	paramsStr = s1+i+s4+i+s5;
                	getdata(paramsStr,i,'-b');
		}else{
			getNewKey(keyword);
		}
    }
    timeOut(2011);
    }
   `
    document.body.appendChild(script);
},500);