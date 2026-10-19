export interface AnniversaryStatus {
  mode: 'countdown' | 'celebration';
  daysUntilAnniversary: number;
  hoursUntilAnniversary: number;
  minutesUntilAnniversary: number;
  daysSinceMilestone: number;
  displayLabel: string;
  secondaryLabel: string;
}

/**
 * Pure calculation for the October 20 anniversary status.
 * IMPORTANT RULE: Do not display a countdown to October 20 if the anniversary date has already passed.
 * Instead, show an anniversary celebration message and display the number of days since the relationship milestone.
 */
export function calculateAnniversaryStatus(
  now: Date,
  anniversaryIsoDate: string,
  originalMilestoneIsoDate?: string
): AnniversaryStatus {
  const target = new Date(anniversaryIsoDate);
  const milestone = originalMilestoneIsoDate ? new Date(originalMilestoneIsoDate) : new Date(target.getTime() - 365 * 24 * 60 * 60 * 1000);

  const msDiffToAnniversary = target.getTime() - now.getTime();
  const msSinceMilestone = Math.max(0, now.getTime() - milestone.getTime());
  const daysSinceMilestone = Math.floor(msSinceMilestone / (1000 * 60 * 60 * 24));

  // If now is before target (and more than 0 seconds remaining), show countdown
  // Wait: if we are on October 20 itself (same calendar day in local time) or after target, show celebration!
  const targetDatePrefix = anniversaryIsoDate.slice(0, 10);
  const nowLocalPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const nowUtcPrefix = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;

  const isSameDay = nowLocalPrefix === targetDatePrefix || nowUtcPrefix === targetDatePrefix;

  if (msDiffToAnniversary > 0 && !isSameDay) {
    const totalMinutes = Math.floor(msDiffToAnniversary / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return {
      mode: 'countdown',
      daysUntilAnniversary: days,
      hoursUntilAnniversary: hours,
      minutesUntilAnniversary: minutes,
      daysSinceMilestone,
      displayLabel: days === 0 ? 'Anniversary Eve · Tomorrow is October 20' : `${days} ${days === 1 ? 'Day' : 'Days'} Until Our First Anniversary`,
      secondaryLabel: `${daysSinceMilestone} Days Since Our Forever Began`,
    };
  }

  return {
    mode: 'celebration',
    daysUntilAnniversary: 0,
    hoursUntilAnniversary: 0,
    minutesUntilAnniversary: 0,
    daysSinceMilestone: Math.max(365, daysSinceMilestone),
    displayLabel: 'Celebrating Our First Anniversary · October 20',
    secondaryLabel: `${Math.max(365, daysSinceMilestone)} Days of Love & Togetherness`,
  };
}

/**
 * Deterministic cyclic selector for "Make a Wish" and "One More Memory" so clicks never repeat immediately.
 */
export function selectNextItem<T>(items: T[], currentIndex: number): { item: T; nextIndex: number } {
  if (!items || items.length === 0) {
    throw new Error('Items array must not be empty');
  }
  const nextIndex = (currentIndex + 1) % items.length;
  return {
    item: items[nextIndex],
    nextIndex,
  };
}

/**
 * Formats the personal anniversary letter into a clean downloadable plain-text keepsake.
 */
export function formatLetterForDownload(
  partnerName: string,
  yourName: string,
  anniversaryDateLabel: string,
  paragraphs: string[]
): string {
  const header = `============================================================\nOUR FIRST ANNIVERSARY LETTER — ${anniversaryDateLabel.toUpperCase()}\nFor: ${partnerName}\nFrom: ${yourName}\n============================================================\n\n`;
  const body = paragraphs.join('\n\n');
  const footer = `\n\nForever yours,\n${yourName} ❤️\n============================================================\n`;
  return `${header}${body}${footer}`;
}

/**
 * Validates customization form input so empty names do not silently overwrite config with blanks.
 */
export function validatePersonalizationInput(input: {
  yourName: string;
  partnerName: string;
  anniversaryDateLabel: string;
}): { valid: boolean; error?: string } {
  if (!input.yourName || input.yourName.trim().length === 0) {
    return { valid: false, error: 'Please enter your name.' };
  }
  if (!input.partnerName || input.partnerName.trim().length === 0) {
    return { valid: false, error: "Please enter your partner's name." };
  }
  if (!input.anniversaryDateLabel || input.anniversaryDateLabel.trim().length === 0) {
    return { valid: false, error: 'Please enter the anniversary date label.' };
  }
  return { valid: true };
}
