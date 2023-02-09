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

    try {
        // attempt to acquire the Application object
        var appManager = document.getElementById('applicationManager');
        var appObject = appManager.getOwnerApplication(document);
        // check if Application object was a success
        if (appObject === null) {
            // error acquiring the Application object!
        } else {
            // we have the Application object, and we can initialize the scene and show our app
            scene.initialize(appObject);
            appObject.show();
        }
    } catch (e) {
        // this is not an HbbTV client, catch the error.
    }
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
        var inner_div = document.createElement('div');
        var element = json_file['elements'][Object.keys(json_file['elements'])[i]]
        if (element['type'] == 'text'){
            var text_elem = document.createElement('span');
            text_elem.style.fontSize = element['font-size'];
            text_elem.style.color = element['color'];
            text_elem.style.textDecoration = element['text_decoration'];
            text_elem.style.fontWeight = element['font-weight'];
            text_elem.style.left = element['coordinates']['left'];
            text_elem.style.top = element['coordinates']['top'];
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
// scene implementation
var scene = {
    appObject: null,
    appAreaDiv: null,
    isAppAreaVisible: false,
    redButtonDiv: null,
    lastNavigationButtonPressed: null,
    lastPlaybackButtonPressed: null,
    lastNumericButtonPressed: null,
    shouldReactToPlaybackButtons: false,
    shouldReactToNumericButtons: false,
    timeout: 0,
    initialize: function(appObj) {
        this.appObject = appObj;
        this.appAreaDiv = document.getElementById('app_area');
        this.redButtonDiv = document.getElementById('red_button_notification_field');
        // register RC button event listener
        rcUtils.registerKeyEventListener();
        // initial state is app_area hidden
        this.hideAppArea();
        // render the scene so it is ready to be shown
        this.render();
    },
    getRelevantButtonsMask: function() {
        // mask includes color buttons
        var mask = rcUtils.MASK_CONSTANT_RED + rcUtils.MASK_CONSTANT_GREEN + rcUtils.MASK_CONSTANT_YELLOW +
            rcUtils.MASK_CONSTANT_BLUE;
        // and navigation
        mask += rcUtils.MASK_CONSTANT_NAVIGATION;
        // add playback buttons if scene should react to them
        if (this.shouldReactToPlaybackButtons) { mask += rcUtils.MASK_CONSTANT_PLAYBACK; }
        // add numeric buttons if scene should react to them
        if (this.shouldReactToNumericButtons) { mask += rcUtils.MASK_CONSTANT_NUMERIC; }
        // return calculated button mask 
        return mask;
    },
    showAppArea: function() {
        this.appAreaDiv.style.visibility = 'visible';
        this.redButtonDiv.style.visibility = 'hidden';
        this.isAppAreaVisible = true;
        // when shown, app reacts to all buttons relevant on the scene
        rcUtils.setKeyset(this.appObject, this.getRelevantButtonsMask());
    },
    hideAppArea: function() {
        this.appAreaDiv.style.visibility = 'hidden';
        this.redButtonDiv.style.visibility = 'visible';
        this.isAppAreaVisible = false;
        // when hidden, app reacts only to red button key press (show app scene)
        rcUtils.setKeyset(this.appObject, rcUtils.MASK_CONSTANT_RED);
    },
    render: function() {
        var navigationField = document.getElementById('navigation_field');
        var playbackField = document.getElementById('playback_field');
        var togglePlaybackField = document.getElementById('toggle_playback_field');
        var numericField = document.getElementById('numeric_field');
        var toggleNumericField = document.getElementById('toggle_numeric_field');
        var preventField = document.getElementById('prevent_field');
        // do navigation buttons
        if (this.lastNavigationButtonPressed === null) {
            navigationField.innerHTML =
                'Please press one of the navigation buttons (arrows, OK/ENTER, back).';
        } else {
            navigationField.innerHTML = this.lastNavigationButtonPressed;
        }
        // do playback buttons
        if (this.shouldReactToPlaybackButtons) {
            if (this.lastPlaybackButtonPressed === null) {
                playbackField.innerHTML =
                    'Please press one of the playback buttons (trick play controls).';
            } else {
                playbackField.innerHTML = this.lastPlaybackButtonPressed;
            }
            togglePlaybackField.innerHTML = 'Disable playback buttons';
        } else {
            playbackField.innerHTML =
                'Please press the green button to enable playback buttons.';
            togglePlaybackField.innerHTML = 'Enable playback buttons';
        }
        // do numeric buttons
        if (this.shouldReactToNumericButtons) {
            if (this.lastNumericButtonPressed === null) {
                numericField.innerHTML =
                    'Please press one of the numeric buttons (0 ... 9).';
            } else {
                numericField.innerHTML = this.lastNumericButtonPressed;
            }
            toggleNumericField.innerHTML = 'Disable numeric buttons';
        } else {
            numericField.innerHTML =
                'Please press the yellow button to enable numeric buttons.';
            toggleNumericField.innerHTML = 'Enable numeric buttons';
        }
        // do prevent field
        preventField.innerHTML = testdi;                                                
    },
    timerTick: function() {
        // check if timeout occurred
        if (scene.timeout > 0) {
            // not yet, display message
            var preventField = document.getElementById('prevent_field');
            preventField.innerHTML = 'The app shall not receive RC button events for ' +
                scene.timeout + ' seconds.';
            // decrement timeout and reschedule for 1 second
            scene.timeout--;
            setTimeout(scene.timerTick, 1000);
        } else {
            // timeout occurred, start reacting to buttons again
            rcUtils.setKeyset(scene.appObject, scene.getRelevantButtonsMask());
            // and rerender scene
            scene.render();
        }
    }
};

// RC button press handler function
function handleKeyCode(kc) {
    try {
        var shouldRender = true;
        // process buttons
        switch (kc) {
            case VK_RED:
                // red button shows & hides the app scene
                if (scene.isAppAreaVisible) {
                    scene.hideAppArea();
                } else {
                    scene.showAppArea();
                }
                // no need to rerender complete scene
                shouldRender = false;
                break;
            case VK_GREEN:
                // green button toggles playback buttons
                if (scene.shouldReactToPlaybackButtons) {
                    scene.shouldReactToPlaybackButtons = false;
                } else {
                    scene.shouldReactToPlaybackButtons = true;
                    scene.lastPlaybackButtonPressed = null;
                }
                rcUtils.setKeyset(scene.appObject, scene.getRelevantButtonsMask());
                break;
            case VK_YELLOW:
                // yellow button toggles numeric buttons
                if (scene.shouldReactToNumericButtons) {
                    scene.shouldReactToNumericButtons = false;
                } else {
                    scene.shouldReactToNumericButtons = true;
                    scene.lastNumericButtonPressed = null;
                }
                rcUtils.setKeyset(scene.appObject, scene.getRelevantButtonsMask());
                break;
            case VK_BLUE:
                // blue button prevents user input for 10 seconds
                rcUtils.setKeyset(scene.appObject, 0); // this will prevent the app from receiving further RC button events
                scene.timeout = 10;
                scene.timerTick();
                // no need to rerender complete scene
                shouldRender = false;
                break;
            case VK_LEFT:
                // left button
                scene.lastNavigationButtonPressed = 'LEFT';
                let ad_link_left = json_file['open_link_url']
                console.log(ad_link_left);
                window.open(ad_link_left,'_blank');
                window.open(ad_link_left);
                break;
            case VK_RIGHT:
                // right button
                scene.lastNavigationButtonPressed = 'RIGHT';
                let ad_link_right = json_file['open_link_url']
                console.log(ad_link_right);
                window.open(ad_link_right,'_blank');
                window.open(ad_link_rght);
                break;
            case VK_DOWN:
                // down button
                scene.lastNavigationButtonPressed = 'DOWN';
                let ad_link_down = json_file['open_link_url']
                console.log(ad_link_down);
                window.open(ad_link_down,'_blank');
                window.open(ad_link_down);
                break;
            case VK_UP:
                // up button
                scene.lastNavigationButtonPressed = 'UP';
                let ad_link_up = json_file['open_link_url']
                console.log(ad_link_up);
                window.open(ad_link_up,'_blank');
                window.open(ad_link_up);
                break;
            case VK_ENTER:
                // OK/ENTER button
                scene.lastNavigationButtonPressed = 'OK / ENTER';
                break;
            case VK_BACK:
                // BACK button
                scene.lastNavigationButtonPressed = 'BACK';
                let ad_link = document.getElementById("red_button_notification_field").name;
                console.log(ad_link);
                window.open(ad_link,'_blank');
                window.open(ad_link);
                break;
            case VK_PLAY:
                // PLAY button
                scene.lastPlaybackButtonPressed = 'PLAY';
                break;
            case VK_PAUSE:
                // PAUSE button
                scene.lastPlaybackButtonPressed = 'PAUSE';
                break;
            case VK_PLAY_PAUSE:
                // PLAY / PAUSE button
                scene.lastPlaybackButtonPressed = 'PLAY / PAUSE';
                break;
            case VK_STOP:
                // STOP button
                scene.lastPlaybackButtonPressed = 'STOP';
                break;
            case VK_FAST_FWD:
                // FFWD button
                scene.lastPlaybackButtonPressed = 'FFWD';
                break;
            case VK_REWIND:
                // RWD button
                scene.lastPlaybackButtonPressed = 'RWD';
                break;
            case VK_0:
                // 0 numeric button
                scene.lastNumericButtonPressed = '0';
                break;
            case VK_1:
                // 1 numeric button
                scene.lastNumericButtonPressed = '1';
                break;
            case VK_2:
                // 2 numeric button
                scene.lastNumericButtonPressed = '2';
                break;
            case VK_3:
                // 3 numeric button
                scene.lastNumericButtonPressed = '3';
                break;
            case VK_4:
                // 4 numeric button
                scene.lastNumericButtonPressed = '4';
                break;
            case VK_5:
                // 5 numeric button
                scene.lastNumericButtonPressed = '5';
                break;
            case VK_6:
                // 6 numeric button
                scene.lastNumericButtonPressed = '6';
                break;
            case VK_7:
                // 7 numeric button
                scene.lastNumericButtonPressed = '7';
                break;
            case VK_8:
                // 8 numeric button
                scene.lastNumericButtonPressed = '8';
                break;
            case VK_9:
                // 9 numeric button
                scene.lastNumericButtonPressed = '9';
                break;
            default:
                // pressed unhandled key
                shouldRender = false;
        }
        if (shouldRender) {
            // render scene
            scene.render();
        }
    } catch (e) {
        // pressed unhandled key, catch the error
    }
    // we return true to prevent default action for processed keys
    return true;
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