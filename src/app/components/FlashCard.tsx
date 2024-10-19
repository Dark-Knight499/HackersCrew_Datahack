import React, { useState } from 'react';
import { CardStack } from "./ui/card-stack";
import { cn } from "../../utils/cn";
import { Button } from "../components/ui/moving-border";
import { SkipForward, Send, ArrowRight } from 'lucide-react';

interface CardItem {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  correctAnswer: string;
}

export function CardStackDemo() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleNext = () => {
    if (isSubmitted) {
      setActiveCard((prev) => (prev + 1) % CARDS.length);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleSkip = () => {
    let nextCard;
    do {
      nextCard = Math.floor(Math.random() * CARDS.length);
    } while (nextCard === activeCard);
    setActiveCard(nextCard);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleOptionSelect = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !isSubmitted) {
      setIsSubmitted(true);
      if (selectedOption === CARDS[activeCard].correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent p-4 flex flex-col items-center justify-center text-black">
      <div className="absolute top-4 right-4 text-lg font-bold bg-transparent px-4 py-2 rounded-full">
        Score: {score}
      </div>
      
      <div className="flex flex-col items-center w-full max-w-3xl">
        <div className="w-full mb-8">
          <CardStack
            items={CARDS}
            activeItem={activeCard}
            onCardChange={setActiveCard}
          />
        </div>
        
        <div className="w-full bg-transparent rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {['A', 'B', 'C', 'D'].map((option) => (
              <Button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "text-lg font-semibold border-2 border-gray-300 rounded-lg p-4 bg-transparent text-black",
                  selectedOption === option && !isSubmitted ? "border-gray-600" : "",
                  isSubmitted && option === CARDS[activeCard].correctAnswer ? "border-gray-600" : "",
                  "hover:border-gray-600"
                )}
              >
                {option}
              </Button>
            ))}
          </div>

          <div className="flex space-x-6 w-full justify-between">
            <Button 
              onClick={handleSkip} 
              className="px-6 py-3 flex-1 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-600 bg-transparent text-black"
              disabled={isSubmitted}
            >
              <SkipForward className="w-6 h-6" />
            </Button>
            <Button 
              onClick={handleSubmit} 
              className={cn(
                "px-6 py-3 flex-1 font-semibold rounded-lg border-2 border-gray-300 bg-transparent text-black",
                (!selectedOption || isSubmitted) ? "opacity-50" : "hover:border-gray-600"
              )}
              disabled={!selectedOption || isSubmitted}
            >
              <Send className="w-6 h-6" />
            </Button>
            <Button 
              onClick={handleNext} 
              className={cn(
                "px-6 py-3 flex-1 font-semibold rounded-lg border-2 border-gray-300 bg-transparent text-black",
                !isSubmitted ? "opacity-50" : "hover:border-gray-600"
              )}
              disabled={!isSubmitted}
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARDS: CardItem[] = [
  {
    id: 0,
    name: "Question 1",
    designation: "General Knowledge",
    content: (
      <p className="text-black">
        What is the capital of France?
      </p>
    ),
    correctAnswer: 'A'
  },
  {
    id: 1,
    name: "Question 2",
    designation: "Science",
    content: (
      <p className="text-black">
        What is the chemical symbol for water?
      </p>
    ),
    correctAnswer: 'B'
  },
  {
    id: 2,
    name: "Question 3",
    designation: "History",
    content: (
      <p className="text-black">
        Who was the first President of the United States?
      </p>
    ),
    correctAnswer: 'C'
  },
];