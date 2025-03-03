import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "settings",
      columns: [
        { name: "preferredCurrency", type: "string" },
        { name: "preferredTheme", type: "string" },
        { name: "preferredLanguage", type: "string" },
      ],
    }),
    tableSchema({
      name: "currency",
      columns: [
        { name: "name", type: "string" },
        { name: "symbol", type: "string" },
        { name: "icon", type: "string" },
        { name: "referenceValue", type: "number" },
      ],
    }),
    tableSchema({
      name: "saving",
      columns: [
        { name: "currency", type: "string" },
        { name: "name", type: "string" },
        { name: "value", type: "number" },
      ],
    }),
  ],
});

export default schema;
