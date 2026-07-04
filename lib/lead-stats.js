export function calculateLeadStats(leads) {
  const total = leads.length;
  const newLeads = leads.filter((lead) => !lead.contacted && !lead.archived).length;
  const contacted = leads.filter((lead) => lead.contacted && !lead.archived).length;
  const archived = leads.filter((lead) => lead.archived).length;

  return { total, newLeads, contacted, archived };
}
