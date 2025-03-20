"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("../types/users");
const usersSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(users_1.PreferredStudyStyle),
        required: true,
        default: users_1.PreferredStudyStyle.ANY
    },
    preferredStudyEnvironment: {
        type: String,
        enum: Object.values(users_1.PreferredStudyEnvironment),
        required: true,
        default: users_1.PreferredStudyEnvironment.ANY
    },
    preferredGroupSize: {
        type: String,
        enum: Object.values(users_1.PreferredGroupSize),
        required: true,
        default: users_1.PreferredGroupSize.ANY
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
        enum: Object.values(users_1.TimeZone),
        required: true,
        default: users_1.TimeZone.UTC_MINUS_12 // Default to something sensible for your application
    },
    studyFrequency: {
        type: String,
        enum: Object.values(users_1.StudyFrequency),
        required: true,
        default: users_1.StudyFrequency.WEEKLY
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
            enum: Object.values(users_1.PrivacyLevel),
            default: users_1.PrivacyLevel.PUBLIC
        },
        showLocation: {
            type: String,
            enum: Object.values(users_1.ShowLocation),
            default: users_1.ShowLocation.APPROXIMATE
        },
        studyAvailabilityPublicity: {
            type: String,
            enum: Object.values(users_1.StudyAvailabilityPublicity),
            default: users_1.StudyAvailabilityPublicity.CONNECTIONS_ONLY
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
}, {
    collection: "users",
    timestamps: true
});
// Create indexes for improved query performance
usersSchema.index({ email: 1 }, { unique: true });
usersSchema.index({ username: 1 }, { unique: true });
usersSchema.index({ "subjectsLookingToStudy": 1 });
const users = mongoose_1.default.model("users", usersSchema);
exports.default = users;
