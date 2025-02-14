import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faCalendar,
  faGraduationCap,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';

type PostProps = {
  id: string;
  user: string;
  learningType: string;
  location: string;
  title: string;
  description: string;
  school?: string | null;
  availability: string;
  subjects: string[];
};

export default function PostCard({
  id,
  user,
  learningType,
  location,
  title,
  description,
  school,
  availability,
  subjects,
}: PostProps) {
  return (
    <Card key={id} className="p-4 shadow-md">
      <CardContent>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          <Badge variant="secondary">{learningType}</Badge>
        </div>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">
          <FontAwesomeIcon icon={faMapPin} className="mr-2" /> {location}
        </p>
        {school && (
          <p className="text-sm text-gray-500">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> {school}
          </p>
        )}
        <p className="text-sm text-gray-500">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" /> {availability}
        </p>
        <div className="flex gap-2 mt-2">
          {subjects.map((subject) => (
            <Badge key={subject} variant="outline">
              {subject}
            </Badge>
          ))}
        </div>
        <Button className="mt-4 w-full" variant="default">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Message {user}
        </Button>
      </CardContent>
    </Card>
  );
}
