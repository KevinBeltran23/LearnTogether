import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faLocationDot,
  faSchool,
  faClock,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  learningType: string; // Mapped from preferredStudyStyle
  location: string; // Mapped from preferredStudyEnvironment
  school?: string; // Optional, mapped from institution
  availability: string; // Mapped from preferredStudyTime
  subjects: string[]; // Mapped from subjectsLookingToStudy
  groupSize: string; // Mapped from preferredGroupSize
  frequency: string; // Mapped from studyFrequency
  createdAt: string;
}

export default function PostCard({
  id,
  title,
  description,
  learningType,
  location,
  school,
  availability,
  subjects,
  groupSize,
  frequency,
  createdAt,
}: PostCardProps) {
  // Format the study style for display
  const formatStudyStyle = (style: string) => {
    return style.replace(/_/g, ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format the group size for display
  const formatGroupSize = (size: string) => {
    if (size === 'small_group') return 'Small Group (3-5)';
    if (size === 'medium_group') return 'Medium Group (6-10)';
    if (size === 'large_group') return 'Large Group (10+)';
    if (size === 'pair') return 'Pair';
    return 'Solo';
  };

  // Format the environment for display
  const formatEnvironment = (env: string) => {
    return env.charAt(0).toUpperCase() + env.slice(1).toLowerCase();
  };

  return (
    <Card className="shadow-sm border-gray-100 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {subject}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            <span>{formatStudyStyle(learningType)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
            <span>{formatEnvironment(location)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            <span>{availability}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            <span>{formatGroupSize(groupSize)}</span>
          </div>
          {school && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSchool} className="w-4 h-4" />
              <span>{school}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faRepeat} className="w-4 h-4" />
            <span>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end pt-2">
        <Button size="sm">Connect</Button>
      </CardFooter>
    </Card>
  );
}
