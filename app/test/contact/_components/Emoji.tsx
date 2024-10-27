import React, { useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { ContactErrors } from "@/app/_constats/contact";

interface FeedbackState {
  emoji: string;
  symbol?: string;
  message: string;
  color: string;
}

type FeedbackStates = {
  [K in keyof ContactErrors | "initial" | "done"]: FeedbackState;
};

type FeedbackStateKey = keyof FeedbackStates;

const FEED_BACK_STATES: FeedbackStates = {
  initial: {
    emoji: "🙂",
    symbol: "📝",
    message: "Vyplň prosím všechny údaje",
    color: "bg-gray-200",
  },
  done: {
    emoji: "😉",
    symbol: "🎉",
    message: "Vše je v pořádku",
    color: "bg-green-200",
  },
  name: {
    emoji: "😟",
    symbol: "✏️",
    message: "Oprav si prosím jméno",
    color: "bg-red-200",
  },
  surname: {
    emoji: "😕",
    symbol: "✏️",
    message: "Oprav si prosím příjmení",
    color: "bg-red-200",
  },
  email: {
    emoji: "😬",
    symbol: "📧",
    message: "Oprav si prosím email",
    color: "bg-red-200",
  },
  phonePrefix: {
    emoji: "🤔",
    symbol: "🌍",
    message: "Oprav si prosím předvolbu",
    color: "bg-red-200",
  },
  phoneNumber: {
    emoji: "😟",
    symbol: "📞",
    message: "Oprav si prosím telefonní číslo",
    color: "bg-red-200",
  },
};

const containerVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const emojiVariants: Variants = {
  initial: { scale: 0.5, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const symbolVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.1,
    },
  },
};

const messageVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 },
  },
};

export const Emoji = ({
  errors,
  isDone,
}: {
  errors: ContactErrors;
  isDone: boolean;
}) => {
  const determineState = useCallback((): FeedbackStateKey => {
    if (Object.values(errors).some((error) => error)) {
      return Object.keys(errors).find(
        (key) => errors[key as keyof ContactErrors]
      ) as FeedbackStateKey;
    }
    return isDone ? "done" : "initial";
  }, [errors, isDone]);

  const currentFeedback = FEED_BACK_STATES[determineState()];

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex flex-col w-full items-center gap-3 p-6 pt-8 rounded-lg shadow-lg ${currentFeedback.color} transition-colors duration-300 max-w-sm mx-auto`}
    >
      <div className="flex">
        <motion.span
          variants={emojiVariants}
          className="text-6xl filter drop-shadow-md"
          key={currentFeedback.emoji}
        >
          {currentFeedback.emoji}
        </motion.span>
        <motion.span
          variants={symbolVariants}
          className="text-6xl filter drop-shadow-md"
          key={currentFeedback.symbol}
        >
          {currentFeedback.symbol}
        </motion.span>
      </div>
      <motion.span
        variants={messageVariants}
        className="text-lg font-medium text-gray-800 text-center z-10 
          bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm mt-1"
        key={currentFeedback.message}
      >
        {currentFeedback.message}
      </motion.span>
    </motion.div>
  );
};
