import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAnniversaryStatus,
  selectNextItem,
  formatLetterForDownload,
  validatePersonalizationInput,
} from './anniversaryLogic.ts';

test('calculateAnniversaryStatus returns countdown mode before October 20', () => {
  const now = new Date('2026-10-18T10:00:00-07:00');
  const status = calculateAnniversaryStatus(
    now,
    '2026-10-20T00:00:00-07:00',
    '2025-10-20T00:00:00-07:00'
  );
  assert.equal(status.mode, 'countdown');
  assert.equal(status.daysUntilAnniversary, 1);
  assert.ok(status.daysSinceMilestone >= 363);
});

test('calculateAnniversaryStatus never displays countdown after October 20 has passed', () => {
  const afterDate = new Date('2026-10-25T12:00:00-07:00');
  const status = calculateAnniversaryStatus(
    afterDate,
    '2026-10-20T00:00:00-07:00',
    '2025-10-20T00:00:00-07:00'
  );
  assert.equal(status.mode, 'celebration');
  assert.equal(status.daysUntilAnniversary, 0);
  assert.equal(status.displayLabel, 'Celebrating Our First Anniversary · October 20');
  assert.ok(status.daysSinceMilestone >= 370);
});

test('calculateAnniversaryStatus triggers celebration mode on October 20 itself', () => {
  const onAnniversary = new Date('2026-10-20T08:30:00-07:00');
  const status = calculateAnniversaryStatus(
    onAnniversary,
    '2026-10-20T20:00:00-07:00',
    '2025-10-20T00:00:00-07:00'
  );
  assert.equal(status.mode, 'celebration');
  assert.equal(status.daysUntilAnniversary, 0);
});

test('selectNextItem cycles through wishes and memories deterministically', () => {
  const wishes = ['Wish A', 'Wish B', 'Wish C'];
  const first = selectNextItem(wishes, -1);
  assert.equal(first.item, 'Wish A');
  assert.equal(first.nextIndex, 0);

  const second = selectNextItem(wishes, first.nextIndex);
  assert.equal(second.item, 'Wish B');
  assert.equal(second.nextIndex, 1);

  const third = selectNextItem(wishes, second.nextIndex);
  assert.equal(third.item, 'Wish C');
  assert.equal(third.nextIndex, 2);

  const wrap = selectNextItem(wishes, third.nextIndex);
  assert.equal(wrap.item, 'Wish A');
  assert.equal(wrap.nextIndex, 0);
});

test('formatLetterForDownload creates formatted plain text keepsake', () => {
  const output = formatLetterForDownload(
    '[HER NAME]',
    '[YOUR NAME]',
    'October 20',
    ['My love,', 'Happy first anniversary!']
  );
  assert.ok(output.includes('OUR FIRST ANNIVERSARY LETTER — OCTOBER 20'));
  assert.ok(output.includes('For: [HER NAME]'));
  assert.ok(output.includes('From: [YOUR NAME]'));
  assert.ok(output.includes('Happy first anniversary!'));
});

test('validatePersonalizationInput rejects empty required fields', () => {
  const invalid = validatePersonalizationInput({
    yourName: '   ',
    partnerName: 'Beloved',
    anniversaryDateLabel: 'October 20',
  });
  assert.equal(invalid.valid, false);

  const valid = validatePersonalizationInput({
    yourName: '[YOUR NAME]',
    partnerName: '[HER NAME]',
    anniversaryDateLabel: 'October 20',
  });
  assert.equal(valid.valid, true);
});
