import "server-only";

import type { SubscriberInput } from "@/domains/subscribers/schemas/subscriber.schema";
import { queryDatabase } from "@/shared/database/pool";

export async function createOrUpdateSubscriber(input: SubscriberInput) {
  await queryDatabase(
    `insert into subscribers (email, interests, status)
     values ($1, $2, 'active')
     on conflict (email) do update set
       interests = excluded.interests,
       status = 'active',
       updated_at = timezone('utc', now())`,
    [input.email.toLowerCase(), input.interests],
  );
}
