import { ResearchPage } from '../../views/ResearchPage';
import { getResearchPapers, getStudentProjects } from '../../lib/data/research';

export const metadata = {
    title: "Undergraduate Research Showcase | Faculty of Business",
    description: "Explore undergraduate research dissertations, machine learning models, and economic policy studies from the Faculty of Business, University of Moratuwa.",
};

export default async function Research() {
    const [papers, projects] = await Promise.all([
        getResearchPapers(),
        getStudentProjects()
    ]);

    return <ResearchPage papers={papers} projects={projects} />;
}
