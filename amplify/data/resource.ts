import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Subscriber: a
    .model({
      email: a.string().required(),
      source: a.string(), // 'home', 'tour', etc.
      subscribedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
