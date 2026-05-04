import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function ZoomParallax({ images }) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} style={{ position: 'relative', height: '300vh' }}>
			<div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

                    // Positioning logic adapted from the user's snippet
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
						<motion.div
							key={index}
							style={{ 
                                scale,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
						>
							<div style={{ position: 'relative', height, width, top, left }}>
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									style={{ height: '100%', width: '100%', objectFit: 'cover' }}
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

export default ZoomParallax;
