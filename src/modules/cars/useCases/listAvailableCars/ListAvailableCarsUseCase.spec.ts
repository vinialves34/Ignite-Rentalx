import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 140.0,
      description: "Car description",
      fine_amount: 100,
      license_plate: "DEF-1234",
      name: "Car1",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car_brand_test",
      category_id: "category_id",
      daily_rate: 140.0,
      description: "Car description",
      fine_amount: 100,
      license_plate: "DEF-1234",
      name: "Car2",
    });

    const cars = await listCarsUseCase.execute({ brand: "Car_brand_test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car_brand_test",
      category_id: "category_id",
      daily_rate: 140.0,
      description: "Car description",
      fine_amount: 100,
      license_plate: "DEF-1235",
      name: "Car3",
    });

    const cars = await listCarsUseCase.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car_brand_test",
      category_id: "12345",
      daily_rate: 140.0,
      description: "Car description",
      fine_amount: 100,
      license_plate: "DEF-1235",
      name: "Car3",
    });

    const cars = await listCarsUseCase.execute({ category_id: "12345" });

    expect(cars).toEqual([car]);
  });
});
