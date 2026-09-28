import { AboutUs } from '../../views/AboutUs';
import { fetchSyncedCouncilMembers } from '../../lib/services/people';
import { fetchBatchRepresentatives, fetchPlatformMaintainers, fetchEntityMilestones } from '../../lib/data/entities';
import { getAboutPageJsonLd } from '../../lib/seo/schema';

export const metadata = {
    title: "About the Union & Mandate | Business Faculty Students' Union - Moratuwa",
    description: "Constitutional mission, executive council office bearers, history, and welfare mandate of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Sri Lanka.",
    alternates: {
        canonical: "https://bfsu-uom.lk/about",
    },
};

export default async function AboutPage() {
    const [councilMembers, batchReps, maintainers, milestones] = await Promise.all([
        fetchSyncedCouncilMembers(),
        fetchBatchRepresentatives(),
        fetchPlatformMaintainers(),
        fetchEntityMilestones()
    ]);

    const aboutJsonLd = getAboutPageJsonLd(councilMembers);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            <AboutUs 
                councilMembers={councilMembers} 
                batchReps={batchReps}
                platformMaintainers={maintainers}
                entityMilestones={milestones}
            />
        </>
    );
}
