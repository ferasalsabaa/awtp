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
    // else if (banner_type = 'l-banner'){
    //     render_l_banner(json_file);
    // }
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
}

// render L-Banner
// function render_l_banner(){
//     pass
// }

    // function load_ad() {
    //     var json_data = {{ json_file| tojson }};
    // var div_elem = document.createElement("div");
    // var div_elem_2 = document.createElement("div");
    // var img = document.createElement("img");
    // var img_2 = document.createElement("img");
    // var video = document.createElement("video");

    // console.log(json_data);
    // if (json_data['type'] == 'standard-banner') {
    //     // var elem = document.getElementById("red_button_notification_field");
    //     div_elem.classList.add("red_button_style");
    //     div_elem.id = "red_button_notification_field";
    //     div_elem.style.width = json_data["width"];
    //     div_elem.style.height = json_data["height"];
    //     div_elem.style.left = json_data['left'];
    //     div_elem.style.top = json_data["top"];
    //     div_elem.name = json_data["open_link"];
    //     div_elem.innerHTML = json_data["ad_text"];
    //     if (json_data["background-color"] != false) {
    //         div_elem.style.backgroundColor = json_data["background-color"];
    //     } else {
    //         div_elem.style.backgroundImage = "url('static/background-image.jpeg')";
    //     }
    //     div_elem.style.fontSize = json_data["font-size"];
    //     div_elem.style.textAlign = json_data["text-align"];
    //     div_elem.style.lineHeight = json_data["line-height"];
    //     div_elem.innerHTML = json_data["ad_text"];

    // } else if (json_data['type'] == 'picture') {
    //     div_elem.classList.add("red_button_style");
    //     div_elem.id = "red_button_notification_field";
    //     div_elem.style.width = json_data["width"];
    //     div_elem.style.height = json_data["height"];
    //     div_elem.style.left = json_data['left'];
    //     div_elem.style.top = json_data["top"];
    //     div_elem.name = json_data["open_link"];
    //     img.src = json_data["src"];
    //     img.classList.add("red_button_style");
    //     img.id = "red_button_notification_field";
    //     img.style.width = json_data["width"];
    //     img.style.height = json_data["height"];
    //     img.style.left = json_data['left'];
    //     img.style.top = json_data["top"];
    //     img.name = json_data["open_link"];
    //     img.style.textAlign = json_data["text-align"];
    //     img.style.lineHeight = json_data["line-height"];
    // } else if (json_data['type'] == 'video') {
    //     div_elem.classList.add("red_button_style");
    //     div_elem.id = "red_button_notification_field";
    //     div_elem.style.width = json_data["width"];
    //     div_elem.style.height = json_data["height"];
    //     div_elem.style.left = json_data['left'];
    //     div_elem.style.top = json_data["top"];
    //     div_elem.name = json_data["open_link"];
    //     video.src = json_data["src"];
    //     video.autoplay = true;
    //     video.classList.add("red_button_style");
    //     video.id = "red_button_notification_field";

    //     video.style.width = json_data["width"];
    //     video.style.height = json_data["height"];
    //     video.style.left = json_data['left'];
    //     video.style.top = json_data["top"];

    //     video.name = json_data["open_link"];
    // } else if (json_data['type'] == 'l-banner') {
    //     document.getElementById("broadcastVideo").style.position = json_data["position"];
    //     document.getElementById("broadcastVideo").style.width = json_data["width"];
    //     document.getElementById("broadcastVideo").style.height = json_data["height"];
    //     document.getElementById("broadcastVideo").style.right = json_data["right"];
    //     document.getElementById("broadcastVideo").style.top = json_data["top"];


    //     div_elem_2.classList.add("red_button_style");
    //     div_elem_2.id = "red_button_notification_field_2";
    //     div_elem.style.position = json_data["position"];
    //     div_elem_2.style.width = json_data["width_div_2"];
    //     div_elem_2.style.height = json_data["height_div_2"];
    //     div_elem_2.style.left = json_data["left_div_2"];
    //     div_elem_2.style.top = json_data["top_div_2"];

    //     div_elem.classList.add("red_button_style");
    //     div_elem.id = "red_button_notification_field";
    //     div_elem.style.position = json_data["position"];
    //     div_elem.style.width = json_data["width_div"];
    //     div_elem.style.height = json_data["height_div"];
    //     div_elem.style.left = json_data['left_div'];
    //     div_elem.style.bottom = json_data["bottom_div"];




    //     img.style.width = json_data["width_img_1"];
    //     img.style.height = json_data["height_img_1"];
    //     img.src = json_data["src_1"];

    //     img_2.style.width = json_data["width_img_2"];
    //     img_2.style.height = json_data["height_img_2"];
    //     img_2.src = json_data["src_2"];
    // }
    // document.body.appendChild(div_elem_2)
    // document.body.appendChild(div_elem)
    // document.getElementById("red_button_notification_field").appendChild(img);
    // document.getElementById("red_button_notification_field_2").appendChild(img_2);
    // document.getElementById("red_button_notification_field").appendChild(video);
    // start();
    // setTimeout(delete_ad, json_data["duration_in_ms"], div_elem.id);
    // setTimeout(delete_ad, json_data["duration_in_ms"], div_elem_2.id);
    // setTimeout(delete_ad, json_data["duration_in_ms"], img.id);
    // setTimeout(delete_ad, json_data["duration_in_ms"], img_2.id);
    // setTimeout(delete_ad, json_data["duration_in_ms"], video.id);

    // setTimeout(delete_lBanner, json_data["duration_in_ms"], "broadcastVideo");
    // }

    // function delete_ad(element_id) {
    //     var item = document.getElementById(element_id);
    //     item.remove();
    // }

    // function delete_lBanner(element_id) {
    //     var item = document.getElementById(element_id);
    //     document.getElementById(element_id).style.position = "absolut";
    //     document.getElementById(element_id).style.width = "100%";
    //     document.getElementById(element_id).style.height = "100%";
    //     document.getElementById(element_id).style.top = "0px";

    // }