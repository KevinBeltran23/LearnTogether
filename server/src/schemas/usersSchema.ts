import mongoose, { Schema } from "mongoose";
import { 
  IUser, 
  PreferredStudyStyle, 
  PreferredStudyEnvironment, 
  PreferredGroupSize,
  TimeZone,
  StudyFrequency,
  PrivacyLevel,
  ShowLocation,
  StudyAvailabilityPublicity
} from "../types/users";

const usersSchema: Schema<IUser> = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        bio: {
            type: String,
            required: false,
            trim: true,
        },
        location: {
            type: String,
            required: false,
            trim: true,
        },
        institution: {
            type: String,
            required: false,
            trim: true,
        },
        fieldOfStudy: {
            type: String,
            required: false,
            trim: true,
        },
        yearLevel: {
            type: String,
            required: false,
            trim: true,
        },
        academicInterests: {
            type: String,
            required: false,
            trim: true,
        },
        preferredStudyStyle: {
            type: String,
            enum: Object.values(PreferredStudyStyle),
            required: true,
            default: PreferredStudyStyle.ANY
        },
        preferredStudyEnvironment: {
            type: String,
            enum: Object.values(PreferredStudyEnvironment),
            required: true,
            default: PreferredStudyEnvironment.ANY
        },
        preferredGroupSize: {
            type: String,
            enum: Object.values(PreferredGroupSize),
            required: true,
            default: PreferredGroupSize.ANY
        },
        subjectsLookingToStudy: {
            type: [String],
            required: true,
            default: []
        },
        preferredStudyTime: {
            type: String,
            required: true,
            default: "Afternoons"
        },
        timeZone: {
            type: String,
            enum: Object.values(TimeZone),
            required: true,
            default: TimeZone.UTC_MINUS_12 // Default to something sensible for your application
        },
        studyFrequency: {
            type: String,
            enum: Object.values(StudyFrequency),
            required: true,
            default: StudyFrequency.WEEKLY
        },
        weeklyAvailability: {
            monday: {
                type: [String],
                default: []
            },
            tuesday: {
                type: [String],
                default: []
            },
            wednesday: {
                type: [String],
                default: []
            },
            thursday: {
                type: [String],
                default: []
            },
            friday: {
                type: [String],
                default: []
            },
            saturday: {
                type: [String],
                default: []
            },
            sunday: {
                type: [String],
                default: []
            }
        },
        displaySettings: {
            darkMode: {
                type: Boolean,
                default: false
            },
            fontSize: {
                type: String,
                default: "medium"
            },
            colorScheme: {
                type: String,
                default: "default"
            }
        },
        notificationSettings: {
            email: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            },
            studyRequests: {
                type: Boolean,
                default: true
            },
            messages: {
                type: Boolean,
                default: true
            },
            reminders: {
                type: Boolean,
                default: true
            }
        },
        privacySettings: {
            profileVisibility: {
                type: String,
                enum: Object.values(PrivacyLevel),
                default: PrivacyLevel.PUBLIC
            },
            showLocation: {
                type: String,
                enum: Object.values(ShowLocation),
                default: ShowLocation.APPROXIMATE
            },
            studyAvailabilityPublicity: {
                type: String,
                enum: Object.values(StudyAvailabilityPublicity),
                default: StudyAvailabilityPublicity.CONNECTIONS_ONLY
            }
        },
        securitySettings: {
            lastPasswordChange: {
                type: Date,
                default: Date.now
            }
        },
        accountSettings: {
            language: {
                type: String,
                default: "en"
            },
            emailVerified: {
                type: Boolean,
                default: false
            }
        }
    },
    { 
        collection: "users",
        timestamps: true 
    }
);

// Create indexes for improved query performance
usersSchema.index({ email: 1 }, { unique: true });
usersSchema.index({ username: 1 }, { unique: true });
usersSchema.index({ "subjectsLookingToStudy": 1 });

const users = mongoose.model<IUser>("users", usersSchema);

export default users;
