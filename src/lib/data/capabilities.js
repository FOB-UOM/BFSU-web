import { createClient } from '../supabase/server';

/**
 * Database-First System Capabilities Inventory Service
 */

export async function getSystemCapabilities() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('system_capabilities')
            .select('*')
            .order('display_order', { ascending: true });

        if (error || !data) return [];
        return data.map(c => ({
            id: c.code || c.id,
            domain: c.domain,
            name: c.name,
            description: c.description,
            status: c.status,
            carrier: c.carrier,
            carrierKey: c.carrier_key,
            route: c.route,
            mobileInstructions: c.mobile_instructions,
            whatExists: c.what_exists,
            whatIsMissing: c.what_is_missing
        }));
    } catch (err) {
        console.warn('[Capabilities] Failed to fetch system capabilities:', err.message);
        return [];
    }
}
