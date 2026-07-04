const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateLeadStats } = require('./lead-stats.js');

test('calculateLeadStats returns the right lead counts', () => {
  const leads = [
    { contacted: false, archived: false },
    { contacted: true, archived: false },
    { contacted: false, archived: true },
  ];

  assert.deepStrictEqual(calculateLeadStats(leads), {
    total: 3,
    newLeads: 1,
    contacted: 1,
    archived: 1,
  });
});
