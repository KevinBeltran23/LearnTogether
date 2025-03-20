import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faLocationDot,
  faSchool,
  faClock,
  faRepeat,
  faChalkboardTeacher,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: string;
  title: string;
  username: string;
  description: string;
  learningType: string; 
  location: string; 
  school?: string; 
  availability: string; 
  subjects: string[]; 
  groupSize: string; 
  frequency: string; 
  createdAt: string;
  createdBy?: string; 
  creatorImage?: string; 
  specificLocation?: string; 
}

export default function PostCard({
  id,
  title,
  username,
  description,
  learningType,
  location,
  school,
  availability,
  subjects,
  groupSize,
  frequency,
  createdAt,
  creatorImage,
  specificLocation,
}: PostCardProps) {
  const router = useRouter();

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

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name?.substring(0, 2).toUpperCase() || '??';
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-0 pt-4">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
              {creatorImage ? (
                <img src={creatorImage} alt={username} />
              ) : (
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{username}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-2">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs font-medium">
              {subject}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Study Style:</span>
            <span className="ml-1">{formatStudyStyle(learningType)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Environment:</span>
            <span className="ml-1">{formatEnvironment(location)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Location:</span>
            <span className="ml-1 truncate">{specificLocation || location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Availability:</span>
            <span className="ml-1">{availability}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Group Size:</span>
            <span className="ml-1">{formatGroupSize(groupSize)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FontAwesomeIcon icon={faRepeat} className="w-4 h-4 text-primary/70" />
            <span className="font-medium">Frequency:</span>
            <span className="ml-1">{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</span>
          </div>
          
          {school && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FontAwesomeIcon icon={faSchool} className="w-4 h-4 text-primary/70" />
              <span className="font-medium">School:</span>
              <span className="ml-1 truncate">{school}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2 pb-4 border-t border-gray-100 dark:border-gray-800 mt-4">
        <Button size="sm" variant="outline" onClick={() => router.push(`/${username}`)}>View Profile</Button>
        <Button size="sm" className="shadow-sm">Connect</Button>
      </CardFooter>
    </Card>
  );
}
