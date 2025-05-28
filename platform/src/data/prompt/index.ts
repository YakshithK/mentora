import { PromptData } from '@/types/prompt'
import { BrainCircuit, Map, BookMarked, Bot } from 'lucide-react'

const brainIcon = BrainCircuit
const mapIcon = Map
const bookIcon = BookMarked
const botIcon = Bot

export const promptData: PromptData[] = [
  {
    icon: brainIcon,
    boldedText: "AP Learning Game",
    greyedText: "Make studying fun and interactive",
  },
  {
    icon: mapIcon,
    boldedText: "Harvard Admission",
    greyedText: "Harvard Medical's capstone project?"
  },
  {
    icon: bookIcon,
    boldedText: "Scholarship Finder",
    greyedText: "What are some aid opportunities"
  },
  {
    icon: botIcon,
    boldedText: "Counsellor",
    greyedText: "Internship tips and tricks"
  }
]