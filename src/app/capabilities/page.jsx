import { CapabilitiesView } from '../../views/CapabilitiesView';
import { getSystemCapabilities } from '../../lib/data/capabilities';

export const metadata = {
    title: "Platform Capabilities & Feature Inventory | BFSU UoM",
    description: "The live, exhaustive map of everything built, in progress, and planned across the BFSU digital ecosystem.",
};

export const revalidate = 60;

export default async function CapabilitiesPage() {
    const capabilities = await getSystemCapabilities();

    return <CapabilitiesView initialCapabilities={capabilities} />;
}
