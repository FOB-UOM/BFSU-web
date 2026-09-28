'use client';

import React from 'react';
import { UniversalCollaborationHub } from './collaboration/UniversalCollaborationHub';

export const NotionHubWidget = ({ 
    title = "Official Collaborative Workspace", 
    workspaceUrl = "https://notion.so/bfsu-uom",
    description = "Connected collaborative workspace for student executives, project boards, and academic resource databases.",
    workspaces = {},
    resources = [],
    stats = null,
    societyCode = "BFSU"
}) => {
    // Provide backwards-compatible workspaces structure
    const resolvedWorkspaces = {
        notion: {
            workspaceUrl: workspaces?.notion?.workspaceUrl || workspaceUrl,
            workspaceName: workspaces?.notion?.workspaceName || title
        },
        googleWorkspace: workspaces?.googleWorkspace || {},
        repository: workspaces?.repository || {}
    };

    return (
        <UniversalCollaborationHub
            title={title}
            description={description}
            workspaceUrl={workspaceUrl}
            workspaces={resolvedWorkspaces}
            resources={resources}
            stats={stats}
            societyCode={societyCode}
        />
    );
};

