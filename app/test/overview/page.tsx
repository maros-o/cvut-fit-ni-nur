"use client";

import { NextButton } from "../_components/Navigation";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const tagVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};

const checkmarkVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.5,
    },
  },
};

export default function OverviewPage() {
  const { movie, contact } = useContext(TestSessionContext);

  return (
    <motion.div
      className="flex flex-col h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col h-full justify-evenly gap-2 py-3">
        <motion.div
          className="flex gap-4 items-center justify-center px-4"
          variants={itemVariants}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/2"
          >
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={movie.thumbnail_url}
                alt={`${movie.title} poster`}
                fill
                className="drop-shadow-lg rounded-md object-cover"
              />
            </div>
          </motion.div>
          <div className="flex flex-col gap-1 w-1/2">
            <motion.h1 className="text-xl font-bold" variants={itemVariants}>
              {movie.title}
            </motion.h1>
            <motion.div
              className="flex-shrink-0 text-md"
              variants={itemVariants}
            >
              {movie.day}{" "}
              <span className="font-semibold">{movie.datetime}</span>
            </motion.div>
            <motion.div
              className="flex gap-1.5 flex-wrap"
              variants={itemVariants}
            >
              {movie.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-1.5 py-1 bg-white rounded-md text-xs drop-shadow"
                  variants={tagVariants}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="flex items-center justify-center"
          variants={checkmarkVariants}
        >
          <IoMdCheckmarkCircleOutline className="text-[160px] text-green-500" />
        </motion.div>
        <motion.article className="flex flex-col px-4" variants={itemVariants}>
          <div className="flex flex-col text-left">
            <motion.p className="mt-2 text-left" variants={itemVariants}>
              Děkujeme a těšíme se na Vás
            </motion.p>
            <motion.p className="font-bold" variants={itemVariants}>
              č. transakce{" "}
              <span className="bg-gray-100 px-2 py-1 rounded tracking-wide font-semibold">
                {Math.floor(Math.random() * 100000)}
              </span>
            </motion.p>
            <motion.p className="mt-2" variants={itemVariants}>
              Vstupenky Vám byly zaslány na{" "}
              <span className="font-bold">{contact.email}</span>
            </motion.p>
            <motion.p className="mt-2" variants={itemVariants}>
              Chybný e-mail?{" "}
            </motion.p>
            <Link className="underline" href="./help">
              Kontaktujte nás s č. transakce
            </Link>
          </div>
        </motion.article>
      </div>
      <motion.div
        className="flex items-center p-2 w-full border-t sticky bottom-0 bg-white"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <NextButton
          href={"/"}
          fullWidth
          hideIcon
          text="Zpět na hlavní stránku"
        />
      </motion.div>
    </motion.div>
  );
}
