/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  activeItem,
  onCardChange,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  activeItem: number;
  onCardChange: (index: number) => void;
}) => {
  const CARD_OFFSET = offset || 20; // Reduced offset for smaller cards
  const SCALE_FACTOR = scaleFactor || 0.04;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const newCards = [...items];
    const activeCard = newCards.splice(activeItem, 1)[0];
    newCards.unshift(activeCard);
    setCards(newCards);
  }, [activeItem, items]);

  return (
    <div className="relative h-[500px] w-[800px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-[500px] w-[700px] rounded-xl p-5 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200 overflow-auto flex-grow text-base">
              {card.content}
            </div>
            <div className="mt-4">
              <p className="text-neutral-500 font-medium dark:text-white text-lg">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200 text-base">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};