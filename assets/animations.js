const SCROLL_ANIMATION_TRIGGER_CLASSNAME = 'scroll-trigger';
const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'scroll-trigger--offscreen';
const SCROLL_ANIMATION_FADE_IN_CLASSNAME = 'animate--fade-in';
const SCROLL_ANIMATION_CANCEL_CLASSNAME = 'scroll-trigger--cancel';

const onIntersection = (elements, observer) => {
  elements.forEach((element) => {
    if (element.isIntersecting) {
      const elementTarget = element.target;
      if (
        elementTarget.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)
      ) {
        elementTarget.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        elementTarget.classList.add(SCROLL_ANIMATION_FADE_IN_CLASSNAME);
      }
      observer.unobserve(elementTarget);
    } else {
      element.target.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      element.target.classList.remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);
      element.target.classList.remove(SCROLL_ANIMATION_FADE_IN_CLASSNAME);
    }
  });
};

function initializeScrollAnimationTrigger(rootEl = document) {
  const animationScrollTriggerElements = Array.from(
    rootEl.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME),
  );
  if (animationScrollTriggerElements.length === 0) return;

  const observer = new IntersectionObserver(onIntersection, {
    rootMargin: '0px 0px -50px 0px',
    // write a function
  });
  animationScrollTriggerElements.forEach((element) =>
    observer.observe(element),
  );
}

// function percentageSeen(element) {
//   const viewportHeight = window.innerHeight;
//   const scrollY = window.scrollY;
//   const elementPositionY = element.getBoundingClientRect().top + scrollY;
//   const elementHeight = element.offsetHeight;

//   if (elementPositionY > scrollY + viewportHeight) {
//     // If we haven't reached the image yet
//     return 0;
//   } else if (elementPositionY + elementHeight < scrollY) {
//     // If we've completely scrolled past the image
//     return 100;
//   }

//   // When the image is in the viewport
//   const distance = scrollY + viewportHeight - elementPositionY;
//   let percentage = distance / ((viewportHeight + elementHeight) / 100);
//   return Math.round(percentage);
// }

window.addEventListener('DOMContentLoaded', () => {
  initializeScrollAnimationTrigger();
});
