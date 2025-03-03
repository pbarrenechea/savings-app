import { Database, Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";
import { SavingDataProps } from "@/types";

export default class Saving extends Model {
  static table = "saving";

  @field("name") name: string;
  @field("currency") currency: string;
  @field("value") value: number;

  static async getAll(database: Database): Promise<Saving[]> {
    try {
      const savingsCollection = database.get(this.table);
      return (await savingsCollection.query().fetch()) as Saving[];
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteById(database: Database, id: string): Promise<void> {
    const savingsCollection = database.collections.get(this.table);
    const currency = await savingsCollection.find(id);
    await database.write(async () => {
      await currency.destroyPermanently();
    });
  }

  static async update(
    database: Database,
    savingData: SavingDataProps,
  ): Promise<void> {
    await database.write(async () => {
      const savingsCollection = database.collections.get<Saving>(this.table);
      const currentSaving = await savingsCollection.find(savingData.id);
      await currentSaving.update((record) => {
        record.name = savingData.name;
        record.currency = savingData.currency;
        record.value = savingData.value;
      });
    });
  }

  static async create(
    database: Database,
    currencyData: SavingDataProps,
  ): Promise<Saving> {
    return await database.write(async () => {
      const savingsCollection = database.collections.get<Saving>(this.table);
      return await savingsCollection.create((record) => {
        record.name = currencyData.name;
        record.value = currencyData.value;
        record.currency = currencyData.currency;
      });
    });
  }
}
