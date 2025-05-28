import { BrainCircuit, Map, BookMarked, Bot } from 'lucide-react'

const brainIcon = BrainCircuit
const mapIcon = Map
const bookIcon = BookMarked
const botIcon = Bot

export const promptData = [
  {
    icon: brainIcon,
    iconColor: "blue",
    boldedText: "AP Learning Game",
    greyedText: "Make studying fun and interactive",
  },
  {
    icon: mapIcon,
    iconColor: "orange",
    boldedText: "Harvard Admission",
    greyedText: "Harvard Medical's capstone project?"
  },
  {
    icon: bookIcon,
    iconColor: "pink",
    boldedText: "Scholarship Finder",
    greyedText: "What are some aid opportunities"
  },
  {
    icon: botIcon,
    iconColor: "purple",
    boldedText: "Counsellor",
    greyedText: "Internship tips and tricks"
  }
]