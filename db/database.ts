import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";
import schema from "@/db/schema";
import { Currency, Saving, Settings } from "@/entities";

let database;
try {
  const adapter = new SQLiteAdapter({
    schema,
    dbName: "mydatabase", // Name of the SQLite database
    jsi: true, // Use JSI for better performance, Expo supports this
    onSetUpError: (error) => {
      console.log(error);
    },
  });
  database = new Database({
    adapter,
    modelClasses: [Currency, Settings, Saving], // List all your models here
  });
} catch (e) {
  console.log("on catch");
  console.error(e.message);
}

export default database;
