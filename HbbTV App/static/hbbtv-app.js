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
                let ad_link_left = document.getElementById("red_button_notification_field").name;
                console.log(ad_link_left);
                window.open(ad_link_left,'_blank');
                window.open(ad_link_left);
                break;
            case VK_RIGHT:
                // right button
                scene.lastNavigationButtonPressed = 'RIGHT';
                let ad_link_right = document.getElementById("red_button_notification_field").name;
                console.log(ad_link_right);
                window.open(ad_link_right,'_blank');
                window.open(ad_link_rght);
                break;
            case VK_DOWN:
                // down button
                scene.lastNavigationButtonPressed = 'DOWN';
                let ad_link_down = document.getElementById("red_button_notification_field").name;
                console.log(ad_link_down);
                window.open(ad_link_down,'_blank');
                window.open(ad_link_down);
                break;
            case VK_UP:
                // up button
                scene.lastNavigationButtonPressed = 'UP';
                let ad_link_up = document.getElementById("red_button_notification_field").name;
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

// app entry function
function start(promo_code) {
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