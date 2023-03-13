//
//  define RC button global for terminal
//
// if (typeof(KeyEvent) !== 'undefined') {
//     if (typeof(KeyEvent.VK_RED) !== 'undefined') {
//         var VK_RED = KeyEvent.VK_RED;
//     }
// }

//
// define RC button global for browser emulator
//
if (typeof(VK_RED) === 'undefined') {
    var VK_RED = 0x193;
}

var rcUtils = {
    MASK_CONSTANT_RED: 0x1,
    MASK_CONSTANT_GREEN: 0x2,
    MASK_CONSTANT_YELLOW: 0x4,
    MASK_CONSTANT_BLUE: 0x8,
    MASK_CONSTANT_NAVIGATION: 0x10,
    MASK_CONSTANT_PLAYBACK: 0x20,
    MASK_CONSTANT_NUMERIC: 0x100,
    setKeyset: function(app, mask) {
        try { // try as per OIPF DAE v1.2
            app.privateData.keyset.setValue(mask);
        } catch (e) {
            // try as per OIPF DAE v1.1
            try {
                app.private.keyset.setValue(mask);
            } catch (ee) {
                // catch the error while setting keyset value
            }
        }
    },
    keyEventListener: function(e){
        if (handleKeyCode(e.keyCode)) {
            e.preventDefault();
        }
    },
    registerKeyEventListener: function() {
        document.addEventListener('keydown', this.keyEventListener, false);
    },
    unregisterKeyEventListener: function(){
        document.removeEventListener('keydown', this.keyEventListener);
    }
};