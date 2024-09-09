import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Column: a
    .model({
      owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])]),
      title: a.string().required(),
      order: a.integer().required(),
      cards: a.hasMany("Card", "columnId"),
      cardsList: a.json().array()
    })
    .authorization((allow) => [allow.ownerDefinedIn("owner")])
    .secondaryIndexes(index => [
      index("owner")
      .queryField("listColumnsByOrder")
      .sortKeys(["order"])
    ]),
  Card: a
    .model({
      title: a.string().required(),
      order: a.integer(),
      columnId: a.id(),
      column: a.belongsTo("Column", "columnId")
    })
    .authorization((allow) => [allow.owner()])
    .secondaryIndexes(index => [
      index("columnId")
      .queryField("listCardsByOrder")
      .sortKeys(["order"])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

