import { Document } from "mongoose";
import { PreferredStudyStyle, PreferredStudyEnvironment, PreferredGroupSize, StudyFrequency, WeeklyAvailability } from "./users";
export interface IPost extends Document {
  email: string;
  username: string;
  title: string;
  description?: string;
  preferredStudyStyle: PreferredStudyStyle;
  subjectsLookingToStudy?: string[];
  preferredStudyEnvironment: PreferredStudyEnvironment;
  preferredGroupSize: PreferredGroupSize;
  preferredStudyTime: string;
  studyFrequency: StudyFrequency;
  weeklyAvailability: WeeklyAvailability;
  location?: string;
  institution?: string;
  createdAt: Date;
  updatedAt: Date;
}