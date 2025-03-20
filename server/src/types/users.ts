import { Document } from "mongoose";

export enum PreferredStudyStyle {
  SILENT = "silent study",
  WORK_TOGETHER = "work together",
  TUTORING = "tutoring",
  ANY = "no preference"
}

export enum PreferredStudyEnvironment {
  QUIET = "quiet",
  ANY = "no preference",
  OUTDOORS = "outdoors",
  CAFE = "cafe",
  LIBRARY = "library",
  VIRTUAL = "virtual"
}

export enum PreferredGroupSize {
  PAIR = "pair",
  SMALL_GROUP = "small_group",
  MEDIUM_GROUP = "medium_group",
  LARGE_GROUP = "large_group",
  ANY = "no preference"
}

export enum TimeZone {
  UTC_MINUS_12 = "UTC-12",
  UTC_MINUS_11 = "UTC-11",
  UTC_MINUS_10 = "UTC-10",
  UTC_MINUS_9 = "UTC-9",
  UTC_MINUS_8 = "UTC-8",
  UTC_MINUS_7 = "UTC-7",
  UTC_MINUS_6 = "UTC-6",
  UTC_MINUS_5 = "UTC-5",
  UTC_MINUS_4 = "UTC-4",
  UTC_MINUS_3 = "UTC-3",
  UTC_MINUS_2 = "UTC-2",
  UTC_MINUS_1 = "UTC-1",
  UTC = "UTC",
  UTC_PLUS_1 = "UTC+1",
  UTC_PLUS_2 = "UTC+2",
  UTC_PLUS_3 = "UTC+3",
  UTC_PLUS_4 = "UTC+4",
  UTC_PLUS_5 = "UTC+5",
  UTC_PLUS_6 = "UTC+6",
  UTC_PLUS_7 = "UTC+7",
  UTC_PLUS_8 = "UTC+8",
  UTC_PLUS_9 = "UTC+9",
  UTC_PLUS_10 = "UTC+10",
  UTC_PLUS_11 = "UTC+11",
  UTC_PLUS_12 = "UTC+12"
}

export enum StudyFrequency {
  DAILY = "daily",
  FEW_TIMES_WEEK = "few_times_week",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
  AS_NEEDED = "as_needed"
}

export enum PrivacyLevel {
  PUBLIC = "public",
  STUDENTS_ONLY = "students_only",
  CONNECTIONS_ONLY = "connections_only",
  PRIVATE = "private"
}

export enum ShowLocation {
  EXACT = "exact",
  APPROXIMATE = "approximate",
  NONE = "none"
}

export enum StudyAvailabilityPublicity {
  PUBLIC = "public",
  CONNECTIONS_ONLY = "connections_only",
  PRIVATE = "private"
}

export interface WeeklyAvailability {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface DisplaySettings {
  darkMode: boolean;
  fontSize: string;
  colorScheme: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  studyRequests: boolean;
  messages: boolean;
  reminders: boolean;
}

export interface PrivacySettings {
  profileVisibility: PrivacyLevel;
  showLocation: ShowLocation;
  studyAvailabilityPublicity: StudyAvailabilityPublicity;
}

export interface SecuritySettings {
  lastPasswordChange: Date;
}

export interface AccountSettings {
  language: string;
  emailVerified: boolean;
}

export interface IUser extends Document {
  email: string;
  username: string;
  bio?: string;
  location?: string;
  institution?: string;
  fieldOfStudy?: string;
  yearLevel?: string;
  academicInterests?: string;
  preferredStudyStyle: PreferredStudyStyle;
  preferredStudyEnvironment: PreferredStudyEnvironment;
  preferredGroupSize: PreferredGroupSize;
  subjectsLookingToStudy: string[];
  preferredStudyTime: string;
  timeZone: TimeZone;
  studyFrequency: StudyFrequency;
  weeklyAvailability: WeeklyAvailability;
  displaySettings: DisplaySettings;
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  securitySettings: SecuritySettings;
  accountSettings: AccountSettings;
  createdAt: Date;
  updatedAt: Date;
}