import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ZoomParallax({ images }) {
    const container = useRef(null);
    const stickyElement = useRef(null);
    const imagesRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=300%", // Balanced duration
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });

        const scales = [4, 5, 6, 5, 6, 8, 9];

        imagesRef.current.forEach((el, index) => {
            if (!el) return;
            const targetScale = scales[index % scales.length];
            tl.to(el, {
                scale: targetScale,
                ease: "power1.inOut"
            }, 0);
        });

        // Smallest possible buffer to ensure animation finishes
        tl.to({}, { duration: 0.1 }); 

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: container });

    return (
        <div ref={container} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <div ref={stickyElement} style={{ height: '100vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {images.map(({ src, alt }, index) => {
                    // Positioning logic
                    let top = '0';
                    let left = '0';
                    let width = '25vw';
                    let height = '25vh';

                    if (index === 1) { top = '-30vh'; left = '5vw'; width = '35vw'; height = '30vh'; }
                    if (index === 2) { top = '-10vh'; left = '-25vw'; width = '20vw'; height = '45vh'; }
                    if (index === 3) { left = '27.5vw'; width = '25vw'; height = '25vh'; }
                    if (index === 4) { top = '27.5vh'; left = '5vw'; width = '20vw'; height = '25vh'; }
                    if (index === 5) { top = '27.5vh'; left = '-22.5vw'; width = '30vw'; height = '25vh'; }
                    if (index === 6) { top = '22.5vh'; left = '25vw'; width = '15vw'; height = '15vh'; }

                    return (
                        <div
                            key={index}
                            ref={el => imagesRef.current[index] = el}
                            style={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                willChange: 'transform'
                            }}
                        >
                            <div style={{ position: 'relative', height, width, top, left }}>
                                <img
                                    src={src || '/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ZoomParallax;
