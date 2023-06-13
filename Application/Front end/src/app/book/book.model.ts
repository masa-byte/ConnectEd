import { FacultyMember } from "../faculty-member/faculty-member.model";
import { BookApplication } from "./book-application.model";

export interface Book {
    id: number;
    title: string;
    topic: string;
    description: string;
    contributors: number;
    closed?: boolean;
    facultyMember?: FacultyMember;
    applications: BookApplication[];
}