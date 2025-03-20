"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyAvailabilityPublicity = exports.ShowLocation = exports.PrivacyLevel = exports.StudyFrequency = exports.TimeZone = exports.PreferredGroupSize = exports.PreferredStudyEnvironment = exports.PreferredStudyStyle = void 0;
var PreferredStudyStyle;
(function (PreferredStudyStyle) {
    PreferredStudyStyle["SILENT"] = "silent study";
    PreferredStudyStyle["WORK_TOGETHER"] = "work together";
    PreferredStudyStyle["TUTORING"] = "tutoring";
    PreferredStudyStyle["ANY"] = "no preference";
})(PreferredStudyStyle || (exports.PreferredStudyStyle = PreferredStudyStyle = {}));
var PreferredStudyEnvironment;
(function (PreferredStudyEnvironment) {
    PreferredStudyEnvironment["QUIET"] = "quiet";
    PreferredStudyEnvironment["ANY"] = "no preference";
    PreferredStudyEnvironment["OUTDOORS"] = "outdoors";
    PreferredStudyEnvironment["CAFE"] = "cafe";
    PreferredStudyEnvironment["LIBRARY"] = "library";
    PreferredStudyEnvironment["VIRTUAL"] = "virtual";
})(PreferredStudyEnvironment || (exports.PreferredStudyEnvironment = PreferredStudyEnvironment = {}));
var PreferredGroupSize;
(function (PreferredGroupSize) {
    PreferredGroupSize["PAIR"] = "pair";
    PreferredGroupSize["SMALL_GROUP"] = "small_group";
    PreferredGroupSize["MEDIUM_GROUP"] = "medium_group";
    PreferredGroupSize["LARGE_GROUP"] = "large_group";
    PreferredGroupSize["ANY"] = "no preference";
})(PreferredGroupSize || (exports.PreferredGroupSize = PreferredGroupSize = {}));
var TimeZone;
(function (TimeZone) {
    TimeZone["UTC_MINUS_12"] = "UTC-12";
    TimeZone["UTC_MINUS_11"] = "UTC-11";
    TimeZone["UTC_MINUS_10"] = "UTC-10";
    TimeZone["UTC_MINUS_9"] = "UTC-9";
    TimeZone["UTC_MINUS_8"] = "UTC-8";
    TimeZone["UTC_MINUS_7"] = "UTC-7";
    TimeZone["UTC_MINUS_6"] = "UTC-6";
    TimeZone["UTC_MINUS_5"] = "UTC-5";
    TimeZone["UTC_MINUS_4"] = "UTC-4";
    TimeZone["UTC_MINUS_3"] = "UTC-3";
    TimeZone["UTC_MINUS_2"] = "UTC-2";
    TimeZone["UTC_MINUS_1"] = "UTC-1";
    TimeZone["UTC"] = "UTC";
    TimeZone["UTC_PLUS_1"] = "UTC+1";
    TimeZone["UTC_PLUS_2"] = "UTC+2";
    TimeZone["UTC_PLUS_3"] = "UTC+3";
    TimeZone["UTC_PLUS_4"] = "UTC+4";
    TimeZone["UTC_PLUS_5"] = "UTC+5";
    TimeZone["UTC_PLUS_6"] = "UTC+6";
    TimeZone["UTC_PLUS_7"] = "UTC+7";
    TimeZone["UTC_PLUS_8"] = "UTC+8";
    TimeZone["UTC_PLUS_9"] = "UTC+9";
    TimeZone["UTC_PLUS_10"] = "UTC+10";
    TimeZone["UTC_PLUS_11"] = "UTC+11";
    TimeZone["UTC_PLUS_12"] = "UTC+12";
})(TimeZone || (exports.TimeZone = TimeZone = {}));
var StudyFrequency;
(function (StudyFrequency) {
    StudyFrequency["DAILY"] = "daily";
    StudyFrequency["FEW_TIMES_WEEK"] = "few_times_week";
    StudyFrequency["WEEKLY"] = "weekly";
    StudyFrequency["BIWEEKLY"] = "biweekly";
    StudyFrequency["MONTHLY"] = "monthly";
    StudyFrequency["AS_NEEDED"] = "as_needed";
})(StudyFrequency || (exports.StudyFrequency = StudyFrequency = {}));
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["PUBLIC"] = "public";
    PrivacyLevel["STUDENTS_ONLY"] = "students_only";
    PrivacyLevel["CONNECTIONS_ONLY"] = "connections_only";
    PrivacyLevel["PRIVATE"] = "private";
})(PrivacyLevel || (exports.PrivacyLevel = PrivacyLevel = {}));
var ShowLocation;
(function (ShowLocation) {
    ShowLocation["EXACT"] = "exact";
    ShowLocation["APPROXIMATE"] = "approximate";
    ShowLocation["NONE"] = "none";
})(ShowLocation || (exports.ShowLocation = ShowLocation = {}));
var StudyAvailabilityPublicity;
(function (StudyAvailabilityPublicity) {
    StudyAvailabilityPublicity["PUBLIC"] = "public";
    StudyAvailabilityPublicity["CONNECTIONS_ONLY"] = "connections_only";
    StudyAvailabilityPublicity["PRIVATE"] = "private";
})(StudyAvailabilityPublicity || (exports.StudyAvailabilityPublicity = StudyAvailabilityPublicity = {}));
