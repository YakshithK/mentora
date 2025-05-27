import { Feature } from "@/types/button/feature";
import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { GraduationCapIcon, ServerIcon, Users } from "lucide-react";

export const bodyDescriptionFeatures: Feature[] = [
  {
    name: 'AI Grader',
    description:
      'Mentora uses advanced AI neural networks to provide personalized feedback on your assignments, helping you understand your strengths and areas for improvement.',
    icon: GraduationCapIcon,
  },
  {
    name: 'Bias Dectection',
    description:
      'Mentora identifies and highlights any potential biases in your assignments, ensuring that your work is fair and objective.',
    icon: Users,
  },
];

export const detailedFeatures: Feature[] = [
    {
        name: 'Secure and Private',
        description:
        'Mentora ensures that your data is secure and private, so you can focus on learning without worrying about your information being compromised.',
        icon: LockClosedIcon,
    },
    {
        name: 'Cloud-Based',
        description:
        'Mentora is a cloud-based platform, allowing you to access your assignments and feedback from anywhere, anytime.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Scalable Infrastructure',
        description:
        'Mentora is built on a scalable infrastructure, ensuring that it can handle large volumes of assignments and users without compromising performance.',
        icon: ServerIcon,
    },
]