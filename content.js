const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };
const callback = () => {
    chrome.storage.local.get(null, function(result) {
        if (result.status === 'off') return
        const classSelector = '[class*="ytp"][class*="skip"][class*="ad"][class*="button"]';
        if (!document.querySelectorAll(classSelector)?.[0]) return
        const adbutton = document.querySelectorAll(classSelector)?.[0];
        check_mode(result.mode, adbutton);
    });
};

const observer = new MutationObserver(callback);

check_mode = (mode, object) => {
    if (mode === 'normal') {
        setTimeout(() => {
            eventFire(object, 'click');
        }, 5000);
        return 0;
    }
    eventFire(object, 'click');
}

atach_event = (el, etype) => {
    let evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
}

eventFire = (el, etype) => {
    if (!el.fireEvent) {
        atach_event(el, etype);
        return;
    }
    el.fireEvent('on' + etype);
}

observer_start = () => {
    if (!targetNode) return;
    observer.observe(targetNode, config);
}
observer_stop = () => {
    if (!targetNode) return;
    observer.disconnect();
}

chrome.runtime.onMessage.addListener(
    (request) => {
        if (request.flag === 'START') {
            observer_start();
        }
        if (request.flag === 'STOP') {
            observer_stop();
        }
    });
observer_start();