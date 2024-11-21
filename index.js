const cursor = document.getElementById('cursor');
const portfolioItems = document.querySelectorAll('.project_container');
const portfolioSection = document.querySelector('#portfolio');
const mainElement = document.querySelector('#main');
const scroll = new LocomotiveScroll({
    el: mainElement,
    smooth: true
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* The following method is request animation frame method */
// // current cursor position
// const mouse: Position = {
//     x: 0,
//     y: 0
// }
// // previous cursor position on each frame
// const previousMousePosition: Position = {
//     x: 0,
//     y: 0
// }
// // Current circle position
// const circle: Position = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', (e: MouseEvent) => {
//     mouse.x = e.x;
//     mouse.y = e.y;
// })
// const cursorSpeed = 0.17;
// let currentScale = 0;
// const moveObject = (objectToMove: Position, objectElement: HTMLElement) => {
//     const animate = () => {
//         // Core logic inside animate() for moving the object
//         objectToMove.x = objectToMove.x + ((mouse.x - objectToMove.x) * cursorSpeed);
//         objectToMove.y = objectToMove.y + ((mouse.y - objectToMove.y) * cursorSpeed);
//         console.table({ objectToMove, mouse })
//         const mouseXDistanceCovered = mouse.x - previousMousePosition.x;
//         const mouseYDistanceCovered = mouse.y - previousMousePosition.y;
//         // Pythagoras theorem
//         const distanceBetweenXAndY = (Math.sqrt((mouseXDistanceCovered ** 2) + (mouseYDistanceCovered ** 2)) * 4);
//         const maxMouseVelocity = 150;
//         let mouseVelocity = 0;
//         if (distanceBetweenXAndY <= maxMouseVelocity) {
//             mouseVelocity = distanceBetweenXAndY;
//         } else {
//             mouseVelocity = maxMouseVelocity;
//         }
//         // Convert the velocity into range 0, 0.5
//         const maxRange = 0.3;
//         const scaleValue = (mouseVelocity * maxRange) / maxMouseVelocity;
//         // Smooth acceleration
//         currentScale += (scaleValue - currentScale) * cursorSpeed;
//         // Rotate
//         const angle = Math.atan2(mouseYDistanceCovered, mouseXDistanceCovered) * 180 / Math.PI;
//         previousMousePosition.x = mouse.x;
//         previousMousePosition.y = mouse.y;
//         const translation = `translateX(${objectToMove.x}px) translateY(${objectToMove.y}px)`;
//         const scale = `scale(${1 + currentScale}, ${1 - currentScale})`;
//         const rotate = `rotate(${angle}deg)`;
//         const transformationString = `${translation} ${rotate} ${scale}`;
//         objectElement.style.transform = transformationString;
//         // Continue the animation
//         window.requestAnimationFrame(animate);
//     };
//     // Start the animation
//     window.requestAnimationFrame(animate);
// };
// moveObject(circle, cursor)
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* THE FOLLOWING IS ADD EVENT LISTENER METHOD */
let timer;
let scrollPosition = {
    x: 0,
    y: 0
};
let scaleOptions = {
    x: 0,
    y: 0
};
let angle = 0;
const cursorScaleDueToSpeed = () => {
    let previousPositions = {
        x: 0,
        y: 0
    };
    window.addEventListener('mousemove', (details) => {
        clearTimeout(timer);
        const deltaX = details.clientX - previousPositions.x;
        const deltaY = details.clientY - previousPositions.y;
        angle = (Math.atan2(deltaY, deltaX)) * (180 / Math.PI);
        scaleOptions = {
            x: gsap.utils.clamp(0.6, 1.4, deltaX === 0 || deltaY === 0 ? 0 : deltaX),
            y: gsap.utils.clamp(0.6, 1.4, deltaX === 0 || deltaY === 0 ? 0 : deltaY),
        };
        circleMouseFollower();
        previousPositions = {
            x: details.clientX,
            y: details.clientY,
        };
        timer = setTimeout(() => {
            cursor.style.transform = `translate(${details.clientX + scrollPosition.x}px, ${details.clientY + scrollPosition.y}px)`;
        }, 100);
    });
};
scroll.on('scroll', (args) => {
    scrollPosition = {
        x: args.scroll.x,
        y: args.scroll.y
    };
});
portfolioSection === null || portfolioSection === void 0 ? void 0 : portfolioSection.addEventListener('mouseenter', (details) => {
    const radius = 100;
    cursor.style.width = radius + 'px';
    cursor.style.height = radius + 'px';
    cursor.textContent = "VIEW";
    cursor.style.display = 'flex';
    cursor.style.justifyContent = 'center';
    cursor.style.alignItems = 'center';
    cursor.style.color = '#000000';
    cursor.style.mixBlendMode = 'normal';
    cursor.style.backgroundColor = `rgba(255,255,255, 0.8)`;
});
portfolioSection === null || portfolioSection === void 0 ? void 0 : portfolioSection.addEventListener('mouseleave', (details) => {
    const radius = 20;
    cursor.style.width = radius + 'px';
    cursor.style.height = radius + 'px';
    cursor.style.display = 'flex';
    cursor.style.justifyContent = 'center';
    cursor.style.alignItems = 'center';
    cursor.style.color = '#000000';
    cursor.textContent = "";
    cursor.style.mixBlendMode = 'difference';
    cursor.style.backgroundColor = `rgba(255,255,255, 1)`;
});
const mouseFollow = (htmlElement, mousePosition, scaleOpts, rotateOpts) => {
    const translate = `translate(${mousePosition.x + scrollPosition.x}px, ${mousePosition.y + scrollPosition.y}px)`;
    const scale = `scale(${scaleOpts.x}, ${scaleOpts.y})`;
    const rotate = `rotate(${rotateOpts}deg)`;
    htmlElement.style.transform = `${translate} ${scale} ${rotate}`;
};
const circleMouseFollower = () => {
    window.addEventListener('mousemove', (details) => {
        mouseFollow(cursor, {
            x: details.clientX,
            y: details.clientY
        }, scaleOptions, angle);
    });
};
const { width: cursorWidth, height: cursorHeight } = cursor.getBoundingClientRect();
portfolioItems.forEach(eachPortfolio => {
    let previousX = 0;
    // let diff = 0;
    eachPortfolio.addEventListener('mousemove', (details) => {
        const imgContainer = eachPortfolio.querySelector('.hover_img_container');
        const { left } = eachPortfolio.getBoundingClientRect();
        const { top, height } = eachPortfolio.getBoundingClientRect();
        const img = imgContainer.querySelector('img');
        if (!img) {
            return;
        }
        const { width } = img.getBoundingClientRect();
        const distanceFromTop = details.clientY - top - (height / 2) + (cursorHeight);
        const distanceFromLeft = details.clientX - left - (width / 2) + (cursorWidth);
        const diff = details.clientX - previousX;
        previousX = details.clientX;
        gsap.to(imgContainer, {
            opacity: 1,
            ease: Power1.easeOut,
            top: distanceFromTop,
            left: distanceFromLeft,
            duration: 0.4,
            rotate: gsap.utils.clamp(-20, 20, diff * 0.6)
        });
    });
    eachPortfolio.addEventListener('mouseout', () => {
        const imgContainer = eachPortfolio.querySelector('.hover_img_container');
        gsap.to(imgContainer, {
            opacity: 0,
            ease: Power1.easeOut,
            duration: 0.4,
        });
    });
});
cursorScaleDueToSpeed();
