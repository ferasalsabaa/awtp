// Request Ad from Webserver, will be repeated every 5 mins
function request_Ad() {
    console.log('Requesting Ad!')
    const d = new Date();
    let minutes = d.getMinutes();
    console.log(d)
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: 'http://127.0.0.1:8000/get_ad',
        responseType:'application/json',
        data: { minute : minutes},
        dataType: 'json',
        success: function (response) {
            console.log(response)
            load_Ad(response)
        }
    })
    var newAd = setTimeout(request_Ad, 300000)
}

// Check Type of new Banner and call render function
function load_Ad(json_file){
    console.log(json_file);
    console.log(json_file['generalInfo']['type']);
    var banner_type = json_file['generalInfo']['type'];
    if (banner_type == 'standard-banner'){
        render_standard_banner(json_file);
    }
    else if (banner_type = 'l-banner'){
        render_l_banner(json_file);
    }
}

// render standard-banner
function render_standard_banner(json_file){
    // Create new Div, which will be the banner
    var div_elem = document.createElement("div");

    // Setting ClassList and ID of Banner in order to listen to Commands on the RC
    div_elem.classList.add("red_button_style");
    div_elem.id = "red_button_notification_field";

    // Set up general Styling of Banner
    div_elem.style.width = json_file['generalInfo']["width"];
    div_elem.style.height = json_file['generalInfo']["height"];
    if (json_file['generalInfo']['alignment'] == 'Right-aligned'){
        div_elem.style.right = json_file['generalInfo']['alignment']['right'];
    } else {
        div_elem.style.left = json_file['generalInfo']['alignment']['left'];
    }
    div_elem.style.top = json_file['generalInfo']['alignment']["top"];

    var interactivity = json_file['generalInfo']['interactivity'];
    if (interactivity == 'Link to Webpage'){
        div_elem.name = json_file['generalInfo']["open_link_url"];
    }
    
    if (json_file['generalInfo']['background-type'] == 'Color'){
        div_elem.style.backgroundColor = json_file['generalInfo']["background-color"];
    }
    else if (json_file['generalInfo']['background-type'] == 'Image') {
        div_elem.style.backgroundImage = json_file[generalInfo]["background-image"];
    }

    // Set up inner elements of Banner
    for (var i=0; i < Object.keys(json_file['elements']).length; i++ ){
        var element = json_file['elements'][Object.keys(json_file['elements'])[i]]
        var inner_div = document.createElement('div');
        inner_div.style.position = 'relative';
        inner_div.style.left = String(element['coordinates']['left']) + 'px';
        inner_div.style.top = String(element['coordinates']['top'])+'px';
        if (element['type'] == 'text'){
            var text_elem = document.createElement('span');
            text_elem.style.fontSize = element['font-size'];
            text_elem.style.color = element['color'];
            text_elem.style.textDecoration = element['text_decoration'];
            text_elem.style.fontWeight = element['font-weight'];
            text_elem.style.textAlign = element['text-align'];
            text_elem.innerHTML = element['content'];
            inner_div.appendChild(text_elem);
        } else {
            var img_elem = document.createElement('img');
            img_elem.src = element['url'];
            img_elem.width = element['width'];
            img_elem.height = element['height'];
            img_elem.style.left = element['coordinates']['left'];
            img_elem.style.top = element['coordinates']['top'];
            inner_div.appendChild(img_elem);
        }
        div_elem.appendChild(inner_div);
    }
    document.body.appendChild(div_elem)
    setTimeout(delete_ad, json_file['generalInfo']['duration'], div_elem.id);
}

function moveVideo(){
    document.getElementById("broadcastVideo").style.position = 'absolute';
    document.getElementById("broadcastVideo").style.width = '90%';
    document.getElementById("broadcastVideo").style.height = '90%';
    document.getElementById("broadcastVideo").style.right = '0';
    document.getElementById("broadcastVideo").style.top = '0';
    document.getElementById("broadcastVideo").style.transition = '1s';
}

// render L-Banner
function render_l_banner(json_file){
    // Shrink video and move to top right corner
    moveVideo();
    var left_div = document.createElement('div')
    var bottom_div = document.createElement('div')
    
    // Initialise left div
    left_div.classList.add("red_button_style");
    left_div.id = "red_button_notification_field_2";
    left_div.style.position = 'absolute';
    left_div.style.width = '200px';
    left_div.style.bottom = '100px';
    left_div.style.left = '0';
    left_div.style.top = '0';
    left_div.style.backgroundColor = json_file['generalInfo']['background-color']
    
    //Initialise bottom div
    bottom_div.classList.add("red_button_style");
    bottom_div.id = "red_button_notification_field";
    bottom_div.style.position = 'absolute';
    bottom_div.style.width = '100%';
    bottom_div.style.height = '100px';
    bottom_div.style.left = '0';
    bottom_div.style.bottom = '0';
    bottom_div.style.backgroundColor = json_file['generalInfo']['background-color']
    
    
    for (var i =0; i < Object.keys(json_file['elements']).length; i++){
        var element = json_file['elements'][Object.keys(json_file['elements'])[i]]
        var inner_div = document.createElement('div');
        inner_div.style.position = 'relative';
        inner_div.style.left = String(element['coordinates']['left']) + 'px';
        inner_div.style.top = String(element['coordinates']['top'])+'px';
        if (element['type'] == 'text'){
            var text_elem = document.createElement('span');
            text_elem.style.fontSize = element['font-size'];
            text_elem.style.color = element['color'];
            text_elem.style.textDecoration = element['text_decoration'];
            text_elem.style.fontWeight = element['font-weight'];
            text_elem.style.textAlign = element['text-align'];
            text_elem.innerHTML = element['content'];
            inner_div.appendChild(text_elem);
        } else if (element['type']=='image'){
            var img_elem = document.createElement('img');
            img_elem.src = element['url'];
            img_elem.width = element['width'];
            img_elem.height = element['height'];
            img_elem.style.left = element['coordinates']['left'];
            img_elem.style.top = element['coordinates']['top'];
            inner_div.appendChild(img_elem);
        }
        if (element['area']=='left'){
            left_div.appendChild(inner_div)
        } else if (element['area']=='bottom'){
            bottom_div.appendChild(inner_div)
        }
    }
    document.body.appendChild(left_div)
    document.body.appendChild(bottom_div)
    setTimeout(function(){
        delete_lBanner("broadcastVideo")
    }, json_file['generalInfo']['duration'])
}

function delete_ad(element_id) {
    var item = document.getElementById(element_id);
    item.remove();
}

function delete_lBanner(element_id) {
    var item = document.getElementById(element_id);
    item.style.position = "absolute";
    item.style.width = "100%";
    item.style.height = "100%";
    item.style.top = "0px";
    item.style.transition= '1s';
    item.style.zIndex = 1;
    setTimeout(function(){
        delete_ad("red_button_notification_field_2")
        delete_ad("red_button_notification_field")
    }, 2000)

}
