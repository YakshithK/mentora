import { PromptData } from '@/types/prompt'
import { HelpCircle, ListChecks, FileText, Info } from 'lucide-react'

const helpIcon = HelpCircle         
const checklistIcon = ListChecks    
const fileIcon = FileText           
const infoIcon = Info              

export const promptSuggestions: PromptData[] = [
  {
    icon: helpIcon,
    boldedText: "Clarify feedback",
    greyedText: "Ask what the feedback means."
  },
  {
    icon: checklistIcon,
    boldedText: "Action steps",
    greyedText: "Request specific changes."
  },
  {
    icon: fileIcon,
    boldedText: "Show examples",
    greyedText: "Ask for sample revisions."
  },
  {
    icon: infoIcon,
    boldedText: "Reason for feedback",
    greyedText: "Understand why you got it."
  }
]