export * from './router.js'
export { default as Router } from './router.svelte'
export { default as Link } from './link.svelte'

import { route, router } from './router'

/**
 * Catch default pushState event and trigger onroutechangestate after execute pushState
 * Allow to update router on any push state event
 */

const pushState = window.history.pushState;
window.history.pushState = function(state) {
    let event = pushState.apply(window.history, arguments);

    if (typeof window.history.onroutechangestate == "function")
    {
        window.history.onroutechangestate({
            state: state
        });
    };
    return event;
};

const redirect = function(href) {

    if (window.history) {
        history.pushState(null, '', location.origin === 'file://' ? '#' + href : href)
    } else {
        location.hash = href
    }

    window.scrollTo(0, 0)
    router.set(route())
}

export { redirect };

window.redirect = redirect;