// deno-lint-ignore-file require-await, no-unused-vars
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext } from 'cortex/plugins';

const ctx: PluginContext = {
  pluginId: 'cortex-plugin-customer-support',
  pluginDir: '/tmp/support',
  state: { get: async () => null, set: async () => {} },
  config: {},
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
};
const find = (n: string) => tools.find((t) => t.definition.name === n)!;

Deno.test('support_list_tickets — returns tickets', async () => {
  const r = await find('support_list_tickets').execute(
    { platform: 'zendesk', status: 'open' },
    ctx,
  );
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'TKT-');
});

Deno.test('support_get_ticket — returns details', async () => {
  const r = await find('support_get_ticket').execute({
    platform: 'zendesk',
    ticket_id: 'TKT-1042',
    include_conversations: true,
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'Alice');
});

Deno.test('support_draft_response — generates response', async () => {
  const r = await find('support_draft_response').execute({
    platform: 'zendesk',
    ticket_id: 'TKT-1042',
    tone: 'empathetic',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'draft');
});

Deno.test('support_update_ticket — updates fields', async () => {
  const r = await find('support_update_ticket').execute({
    platform: 'zendesk',
    ticket_id: 'TKT-1042',
    status: 'solved',
    priority: 'normal',
  }, ctx);
  assertEquals(r.success, true);
});

Deno.test('support_update_ticket — rejects no fields', async () => {
  const r = await find('support_update_ticket').execute({
    platform: 'zendesk',
    ticket_id: 'TKT-1042',
  }, ctx);
  assertEquals(r.success, false);
});

Deno.test('support_find_duplicates — finds similar tickets', async () => {
  const r = await find('support_find_duplicates').execute({
    platform: 'zendesk',
    ticket_id: 'TKT-1042',
  }, ctx);
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'duplicates');
});

Deno.test('support_get_trending — returns trends', async () => {
  const r = await find('support_get_trending').execute(
    { platform: 'zendesk', period: 'this_week' },
    ctx,
  );
  assertEquals(r.success, true);
  assertStringIncludes(r.output, 'trends');
});

Deno.test('rejects invalid platform', async () => {
  const r = await find('support_list_tickets').execute({ platform: 'jira' }, ctx);
  assertEquals(r.success, false);
});

Deno.test('tools array — has 6 tools', () => {
  assertEquals(tools.length, 6);
});
