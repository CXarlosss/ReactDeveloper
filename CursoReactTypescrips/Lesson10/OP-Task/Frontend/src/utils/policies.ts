import { Project, TeamMember } from "../types"

/**
 * Checks if a given user is the manager of a project
 * 
 * @param {Project['manager']} managerId - The ID of the project manager
 * @param {TeamMember['_id']} userId - The ID of the user to check
 * @returns {boolean} True if the user is the manager, false otherwise
 * 
 * @example
 * const isUserManager = isManager(project.manager, currentUser._id);
 */
export const isManager = (
    managerId: Project['manager'], 
    userId: TeamMember['_id']
): boolean => managerId === userId