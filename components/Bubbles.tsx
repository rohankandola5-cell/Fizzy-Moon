/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Bubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random bubbles on client side
    const generatedBubbles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 4, // 4px to 16px
      left: Math.random() * 100, // 0% to 100% width
      duration: Math.random() * 10 + 5, // 5s to 15s rise time
      delay: Math.random() * 10,
      wobble: Math.random() * 40 - 20,
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-[-20px] rounded-full border border-white/20 bg-white/5 shadow-[0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-[1px]"
          style={{
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: -1100, // Float upwards off screen
            x: [0, bubble.wobble, -bubble.wobble, 0], // Gentle side-to-side sway
            opacity: [0, 0.8, 0], // Fade in/out
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
            times: [0, 0.1, 0.9, 1]
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;