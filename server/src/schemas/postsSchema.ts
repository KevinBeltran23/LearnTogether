import mongoose, { Schema } from "mongoose";
import { 
  IPost
} from "../types/posts";
import { PreferredStudyStyle, PreferredStudyEnvironment, PreferredGroupSize, StudyFrequency } from "../types/users";

const postsSchema: Schema<IPost> = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        username: { 
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
            enum: Object.values(PreferredStudyStyle),
            required: true,
            default: PreferredStudyStyle.ANY
        },
        subjectsLookingToStudy: {
            type: [String],
            required: true,
            default: []
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
        preferredStudyTime: {
            type: String,
            required: true,
            default: "Afternoons"
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
    },
    { 
        collection: "posts",
        timestamps: true 
    }
);

const posts = mongoose.model<IPost>("posts", postsSchema);

export default posts;
