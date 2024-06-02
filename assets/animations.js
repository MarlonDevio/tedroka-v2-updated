const SCROLL_ANIMATION_TRIGGER_CLASSNAME = 'scroll-trigger';
const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'scroll-trigger--offscreen';
const SCROLL_ANIMATION_FADE_IN_CLASSNAME = "animate--fade-in";

function initializeScrollAnimationTrigger(rootEl = document) {
    const animationScrollTriggerElements = Array.from(rootEl.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME))
    if (animationScrollTriggerElements.length === 0) return;

    const observer = new IntersectionObserver(onIntersection, {
        rootMargin: '0px 0px -50px 0px',
    });

    animationScrollTriggerElements.forEach(element => observer.observe(element))
}

window.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimationTrigger();
})

/**
 * graph TD;
    DOMContentLoaded -->|Event Trigger| initializeScrollAnimationTrigger;
    DOMContentLoaded -->|Event Trigger| initializeScrollZoomAnimationTrigger;

    initializeScrollAnimationTrigger -->|Find elements| SCROLL_ANIMATION_TRIGGER_CLASSNAME;
    initializeScrollAnimationTrigger -->|Check Design Mode| addDesignModeClass;
    initializeScrollAnimationTrigger -->|Create Observer| IntersectionObserver(onIntersection);

    IntersectionObserver(onIntersection) --> onIntersection;

    onIntersection -->|If Intersecting| remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
    onIntersection -->|If Intersecting| setAnimationOrder;
    onIntersection -->|If Intersecting| unobserveElement;
    onIntersection -->|If Not Intersecting| add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
    onIntersection -->|If Not Intersecting| remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);

    initializeScrollZoomAnimationTrigger -->|Check Motion Preference| reducedMotionCheck;
    initializeScrollZoomAnimationTrigger -->|Find elements| SCROLL_ZOOM_IN_TRIGGER_CLASSNAME;
    initializeScrollZoomAnimationTrigger -->|Create Observer| IntersectionObserver(zoomObserver);

    IntersectionObserver(zoomObserver) -->|Observe Element| setZoomRatio;
    setZoomRatio -->|Calculate| percentageSeen;
    setZoomRatio -->|Add Scroll Event| updateZoomRatio;

    ShopifyDesignModeEvents -->|Event Trigger| initializeScrollAnimationTrigger;
 */