import { motion } from "framer-motion";

export default function AnimatedText({ text, speed = 0.1 }) {
  const letters = text.split("");

  return (
    <h1>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}
