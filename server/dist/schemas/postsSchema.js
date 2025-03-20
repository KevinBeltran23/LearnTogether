"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("../types/users");
const postsSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    preferredStudyStyle: {
        type: String,
        enum: Object.values(users_1.PreferredStudyStyle),
        required: true,
        default: users_1.PreferredStudyStyle.MIXED
    },
    subjectsLookingToStudy: {
        type: [String],
        required: true,
        default: []
    },
    preferredStudyEnvironment: {
        type: String,
        enum: Object.values(users_1.PreferredStudyEnvironment),
        required: true,
        default: users_1.PreferredStudyEnvironment.QUIET
    },
    preferredGroupSize: {
        type: String,
        enum: Object.values(users_1.PreferredGroupSize),
        required: true,
        default: users_1.PreferredGroupSize.SMALL_GROUP
    },
    preferredStudyTime: {
        type: String,
        required: true,
        default: "Afternoons"
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
}, {
    collection: "posts",
    timestamps: true
});
const posts = mongoose_1.default.model("posts", postsSchema);
exports.default = posts;
