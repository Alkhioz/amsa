send_flag = (flag) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { flag: flag });
    });
}

set_badge = (text, color) => {
    chrome.action.setBadgeText({ text: text });
    chrome.action.setBadgeBackgroundColor({ color: color });
}

buttonServiceHandler = () => {
    chrome.storage.local.get(["status"]).then((result) => {
        let status = result.status;
        if (status === "on") {
            power_off();
        } else if (status === "off") {
            power_on();
            set_mod_normal();
        }
    })
}

buttonBeastHandler = () => {
    chrome.storage.local.get(["mode"]).then((result) => {
        let mode = result.mode;
        if (mode === "normal") {
            set_mod_beast();
        } else if (mode === "beast") {
            set_mod_normal();
        }
    })
}

power_on = () => {
    set_badge('ON', '#46f193');
    chrome.storage.local.set({ 'status': 'on' });
    send_flag('START');
    let beastButton = document.querySelector("#beast");
    beastButton.disabled = false;
}

set_mod_normal = () => {
    set_badge('ON', '#46f193');
    chrome.storage.local.set({ 'mode': 'normal' });
}

set_mod_beast = () => {
    set_badge('BM', '#6a4cec');
    chrome.storage.local.set({ 'mode': 'beast' });
}

power_off = () => {
    set_badge('OFF', '#ee6363');
    chrome.storage.local.set({ 'status': 'off' });
    send_flag('STOP');
    let beastButton = document.querySelector("#beast");
    beastButton.checked = false;
    beastButton.disabled = true;
}

close_ = () => {
    window.close();
}

document.querySelector('#close').addEventListener('click', close_);
document.querySelector('#on').addEventListener('click', buttonServiceHandler);
document.querySelector('#beast').addEventListener('click', buttonBeastHandler);
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['status', 'mode']).then((result) => {
        let status = result.status;
        let mode = result.mode;
        let statusButton = document.querySelector('#on');
        let beastButton = document.querySelector("#beast");
        if (status === "off") {
            statusButton.checked = false;
            beastButton.disabled = true;
        } else if (status === "on") {
            statusButton.checked = true;
            beastButton.disabled = false;
            if (mode === "beast") {
                beastButton.checked = true;
            }
        }
    })
});