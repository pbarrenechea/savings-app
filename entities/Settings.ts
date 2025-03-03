import { Database, Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Settings extends Model {
  static table = "settings";

  @field("preferredCurrency") preferredCurrency: string;
  @field("preferredTheme") preferredTheme: string;
  @field("preferredLanguage") preferredLanguage: string;

  static async getSettings(database: Database): Promise<Settings> {
    const settingsCollection = database.get(this.table);
    const settings = (await settingsCollection.query()) as Settings[];
    if (settings.length > 0) return settings[0];
    return null;
  }

  static async updateLanguage(
    database: Database,
    id: string,
    language: string,
  ): Promise<void> {
    await database.write(async () => {
      const settingsCollection = database.collections.get<Settings>(this.table);
      const settings = await settingsCollection.find(id);
      await settings.update((record) => {
        record.preferredLanguage = language;
      });
    });
  }

  static async updateTheme(
    database: Database,
    id: string,
    theme: string,
  ): Promise<void> {
    await database.write(async () => {
      const settingsCollection = database.collections.get<Settings>(this.table);
      const settings = await settingsCollection.find(id);
      await settings.update((record) => {
        record.preferredTheme = theme;
      });
    });
  }

  static async updateCurrency(
    database: Database,
    id: string,
    currency: string,
  ): Promise<void> {
    await database.write(async () => {
      const settingsCollection = database.collections.get<Settings>(this.table);
      const settings = await settingsCollection.find(id);
      await settings.update((record) => {
        record.preferredCurrency = currency;
      });
    });
  }

  static async createDefault(database: Database): Promise<Settings> {
    return await database.write(async () => {
      const settingsCollection = database.collections.get<Settings>(this.table);
      return await settingsCollection.create((settings) => {
        settings.preferredLanguage = "en";
        settings.preferredTheme = "light";
        settings.preferredCurrency = "€";
      });
    });
  }
}
