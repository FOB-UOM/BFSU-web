import { UsefulLinksPage } from '../../views/UsefulLinksPage';
import { 
    getAcademicPortals, 
    getAcademicTimetables, 
    getCampusFacilities,
    getAcademicCalendar,
    getCentralAuthorities 
} from '../../lib/data/portals';
import { fetchDepartments } from '../../lib/data/entities';

export const metadata = {
    title: "Useful Links & Portal Directories | Faculty Resources",
    description: "Official links for Moodle LMS, undergraduate lecture timetables, exam bylaws, departments, and university registry services.",
};

export const revalidate = 60;

export default async function Links() {
    const [portals, timetables, facilities, calendar, authorities, departments] = await Promise.all([
        getAcademicPortals(),
        getAcademicTimetables(),
        getCampusFacilities(),
        getAcademicCalendar(),
        getCentralAuthorities(),
        fetchDepartments()
    ]);

    return (
        <UsefulLinksPage 
            academicPortals={portals}
            semesterTimetables={timetables}
            campusFacilities={facilities}
            academicCalendarConfig={calendar}
            centralUniversityEntities={authorities}
            departmentsData={departments}
        />
    );
}
