'use client';

import { InPageFullProfile } from './InPageFullProfile';

/**
 * Backwards compatibility re-export
 * Delegates directly to the comprehensive InPageFullProfile component.
 */
export const ProfilePeekModal = ({ isOpen, onClose, profileData, username }) => {
    return (
        <InPageFullProfile
            isOpen={isOpen}
            onClose={onClose}
            targetProfile={profileData}
            targetUsername={username}
        />
    );
};

export default ProfilePeekModal;
