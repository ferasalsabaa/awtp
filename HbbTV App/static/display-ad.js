// load first ad after 15 seconds
function wait_before_requesting_first_ad(){
    setTimeout(request_Ad, 15000)
}

// request ad from webserver
function request_Ad() {
    console.log('Requesting Ad!')
    const d = new Date();
    let minutes = d.getMinutes();
    console.log(d)
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: 'http://127.0.0.1:8000/ads/random',
        responseType:'application/json',
        data: { minute : minutes},
        dataType: 'json',
        success: function (response) {
            console.log(response)
            call_render(response)
            scene.resp = response
        }
    })
}

// check type of new banner and call render function
function call_render(json_file){
    if (json_file['generalInfo']['type'] == 'standard-banner'){
        render_standard_banner(json_file);
    } else if (json_file['generalInfo']['type'] = 'l-banner'){
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
    if (json_file['generalInfo']['alignment'] == 'right'){
        div_elem.style.right = '10%';
    } else if (json_file['generalInfo']['alignment'] == 'left'){
        div_elem.style.left = '10%';
    } else {
        div_elem.style.left = '50%';
        div_elem.style.transform = 'translateX(-50%)'
    }
    div_elem.style.bottom = '30px';
    if (json_file['generalInfo']['background-type']=='Color'){
        div_elem.style.backgroundColor = json_file['generalInfo']["background-color"];
    } else if (json_file['generalInfo']['background-type']=='Image'){
        div_elem.style.backgroundImage = 'url(' + json_file['generalInfo']['background-image'] + ')'
        div_elem.style.backgroundSize = 'cover'
    }
    div_elem.style.zIndex = '1';

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

    // Start function makes interaction with banner possible
    start();

    // delete banner from DOM after specific duration and request new ad after 20sec
    setTimeout(() => {delete_ad(div_elem.id); setTimeout(request_Ad, 20000)}, json_file['generalInfo']['duration']);
}

// shrink video to the top right corner
function moveVideo(json_file){
    document.getElementById("broadcastVideo").style.position = 'absolute';
    document.getElementById("broadcastVideo").style.width = `calc(100% - ${json_file["generalInfo"]["width"]})`;
    document.getElementById("broadcastVideo").style.height = `calc(100% - ${json_file["generalInfo"]["height"]})`;
    document.getElementById("broadcastVideo").style.right = '0';
    document.getElementById("broadcastVideo").style.top = '0';
    document.getElementById("broadcastVideo").style.transition = 'all 1s';
}

// render L-Banner
function render_l_banner(json_file){
    // Shrink video and move to top right corner
    moveVideo(json_file);
    var left_div = document.createElement('div')
    var bottom_div = document.createElement('div')
    
    // Initialise left div
    left_div.classList.add("red_button_style");
    left_div.id = "red_button_notification_field_2";
    left_div.style.position = 'absolute';
    left_div.style.width = json_file['generalInfo']['width'];
    left_div.style.bottom = json_file['generalInfo']['height'];
    left_div.style.left = '0';
    left_div.style.top = '0';
    left_div.style.zIndex = '-1';
    if (json_file['generalInfo']['background-type-left']=='Color'){
        left_div.style.backgroundColor = json_file['generalInfo']["background-color-left"];
    } else if (json_file['generalInfo']['background-type-left']=='Image'){
        left_div.style.backgroundImage = 'url(' + json_file['generalInfo']['background-image-left'] + ')'
        left_div.style.backgroundSize = 'cover'
    }
    
    //Initialise bottom div
    bottom_div.classList.add("red_button_style");
    bottom_div.id = "red_button_notification_field";
    bottom_div.style.position = 'absolute';
    bottom_div.style.width = '100%';
    bottom_div.style.height = json_file['generalInfo']['height'];
    bottom_div.style.left = '0';
    bottom_div.style.bottom = '0';
    bottom_div.style.zIndex = '-1';
    if (json_file['generalInfo']['background-type-bottom']=='Color'){
        bottom_div.style.backgroundColor = json_file['generalInfo']["background-color-bottom"];
    } else if (json_file['generalInfo']['background-type-bottom']=='Image'){
        bottom_div.style.backgroundImage = 'url(' + json_file['generalInfo']['background-image-bottom'] + ')'
        bottom_div.style.backgroundSize = 'cover'
    }
    
    
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
            img_elem.style.width = '100%';
            img_elem.style.height = '100%';
            img_elem.style['object-fit'] = 'cover';
            inner_div.style.width = element['width'];
            inner_div.style.height = element['height'];
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
    start();
    setTimeout(function(){
        delete_lBanner("broadcastVideo")
    }, json_file['generalInfo']['duration'])
}

// delete banner from DOM
function delete_ad(element_id) {
    var item = document.getElementById(element_id);
    item.remove();
}

// grow video back to full size and then delete l-banner from DOM
function delete_lBanner(element_id) {
    var item = document.getElementById(element_id);
    item.style.position = "absolute";
    item.style.width = "100%";
    item.style.height = "100%";
    item.style.top = "0px";
    item.style.transition= 'all 1s';
    // delete l-banner from DOM and request new ad after 20secs
    setTimeout(function(){
        delete_ad("red_button_notification_field_2")
        delete_ad("red_button_notification_field")
        setTimeout(request_Ad, 20000)
    }, 2000)
}

var scene = {
    resp: null,
    appObject: null,
    appAreaDiv: null,
    isAppAreaVisible: false,
    redButtonDiv: null,
    redButtonDiv2 : null,
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
        try{
            this.redButtonDiv2 = document.getElementById('red_button_notification_field_2')
        }
        catch(e){}
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
        this.appAreaDiv.style.visibility = 'hidden';
        this.redButtonDiv.style.visibility = 'visible';
        try{
            this.redButtonDiv2.style.visibility = 'visible';
            item.style.zIndex = 0;
        } catch(e){}
        this.isAppAreaVisible = true;
        var banner_text = this.redButtonDiv.firstChild.firstChild;
        console.log(banner_text)
        banner_text.innerHTML = scene.resp['generalInfo']['promo-code'];
        console.log(scene.resp['generalInfo']['promo-code']);
        // when shown, app reacts to all buttons relevant on the scene
        rcUtils.setKeyset(this.appObject, this.getRelevantButtonsMask());
    },
    hideAppArea: function() {
        this.appAreaDiv.style.visibility = 'hidden';
        this.redButtonDiv.style.visibility = 'visible';
        try{
            this.redButtonDiv2.style.visibility = 'visible';
        }catch(e){}
        this.isAppAreaVisible = false;
        // when hidden, app reacts only to red button key press (show app scene)
        rcUtils.setKeyset(this.appObject, rcUtils.MASK_CONSTANT_RED);
    },
    render: function() {
        var shopField = document.getElementById('shop_field');
        var codeField = document.getElementById('code_field');
        var playbackField = document.getElementById('playback_field');
        var togglePlaybackField = document.getElementById('toggle_playback_field');
        var numericField = document.getElementById('numeric_field');
        var toggleNumericField = document.getElementById('toggle_numeric_field');
        var preventField = document.getElementById('prevent_field');
        // do navigation buttons
        if (this.lastNavigationButtonPressed === null) {
            shopField.innerHTML =
                '';
            
        } else if (this.lastNavigationButtonPressed === 'DOWN'){
            shopField.innerHTML = scene.resp['generalInfo']['coop-shops'];
        } else if (this.lastNavigationButtonPressed === 'UP') {
            codeField.innerHTML = scene.resp['generalInfo']['promo-code']
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
                var ad_link_left = scene.resp['generalInfo']['link-url']
                console.log("xx"+ad_link_left);
                window.open(ad_link_left,'_blank');
                window.open(ad_link_left);
                break;
            case VK_RIGHT:
                // right button
                scene.lastNavigationButtonPressed = 'RIGHT';
                var ad_link_right = scene.resp['generalInfo']['link-url']
                console.log("ad_link_right");
                console.log(ad_link_right);
                window.open(ad_link_right,'_blank');
                window.open(ad_link_rght);
                break;
            case VK_DOWN:
                // down button
                scene.lastNavigationButtonPressed = 'DOWN';
                break;
            case VK_UP:
                // up button
                scene.lastNavigationButtonPressed = 'UP';
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

// app entry function
function start() {
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
