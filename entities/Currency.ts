import { Database, Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";
import { CurrencyDataProps } from "@/types";

export default class Currency extends Model {
  static table = "currency";

  @field("name") name: string;
  @field("symbol") symbol: string;
  @field("referenceValue") referenceValue: number;
  @field("icon") icon: string;

  static async getAll(database: Database): Promise<Currency[]> {
    const currencyCollection = database.get(this.table);
    return (await currencyCollection.query().fetch()) as Currency[];
  }

  static async deleteById(database: Database, id: string): Promise<void> {
    const currencyCollection = database.collections.get(this.table);
    const currency = await currencyCollection.find(id);
    await database.write(async () => {
      await currency.destroyPermanently();
    });
  }

  static async update(
    database: Database,
    currencyData: CurrencyDataProps,
  ): Promise<void> {
    await database.write(async () => {
      const currenciesCollection = database.collections.get<Currency>(
        this.table,
      );
      const currentCurrency = await currenciesCollection.find(currencyData.id);
      await currentCurrency.update((record) => {
        record.icon = currencyData.icon;
        record.symbol = currencyData.symbol;
        record.referenceValue = currencyData.referenceValue;
        record.name = currencyData.name;
      });
    });
  }

  static async create(
    database: Database,
    currencyData: CurrencyDataProps,
  ): Promise<Currency> {
    return await database.write(async () => {
      const currencyCollection = database.collections.get<Currency>(this.table);
      return await currencyCollection.create((currency) => {
        currency.name = currencyData.name; // Assign the name
        currency.symbol = currencyData.symbol; // Assign the symbol
        currency.referenceValue = currencyData.referenceValue; // Assign the reference value
        currency.icon = currencyData.icon; // Assign the icon
      });
    });
  }
}
