import { Employee } from 'src/app/domains/employee/services/employee.model'

export class Recipe {
  public timestamp?: Date
  public name?: string
  public history?: string
  public cost?: number
  public price?: number
  public nutritionValue?: NutritionValue
  public products?: Array<Product> = []
  public type?: string
  public proteinCategory?: string
  public id?: string
}

export class Cambio {
  public timestamp?: Date
  public cargo: Array<any> = new Array()
  public platos: number
  public id?: string
}

export class Plate {
  public name?: string
  public price?: number
  public type?: string
  public plato?: Recipe
  public entradaList?: Array<Recipe>
  public bebidaList?: Array<Recipe>
  public toppingsList?: Array<Recipe>
  public timestamp?: Date
  public proteinCategory?: string
  public index?: number
  public imgURL?: string
  public open?: boolean
  public id?: string
}

export class OrderTemplate {
  public type?: string
  public name?: string
  public plato?: Recipe
  public entradaList?: Array<Recipe>
  public bebidaList?: Array<Recipe>
  public toppingList?: Array<Recipe>
  public entrada?: Recipe = new Recipe()
  public bebida?: Recipe = new Recipe()
  public ensalada?: Recipe = new Recipe()
  public garnish?: Recipe = new Recipe()
  public rice?: Recipe = new Recipe()
  public postre?: Recipe = new Recipe()
}

export class PlateOrder {
  public timestamp?: Date
  public hasWaiter?: boolean
  public FBbug?: string
  public data?: any
  public cooker?: any
  public tempPlates?: Array<Plate> = [] as any
  public tempBar?: Array<any> = [] as any
  public plates?: Array<OrderTemplate>
  public bar?: Array<any>
  public chosenPlates?: Array<OrderTemplate>
  public totalPrice?: number
  public deliveryPrice?: number
  public discountPrice?: number
  public chief?: Employee
  public waiter?: Employee
  public client?: Employee
  public address?: ClientAddress
  public table?: number
  public type?: string
  public payment?: string
  public change?: string
  public comments?: string
  public deliveryTime?: string
  public isCooked?: boolean
  public isTable?: boolean
  public isDelivered?: boolean
  public isPaid?: boolean
  public isArchived?: boolean
  public isRejected?: boolean
  public rejectedAt: Date
  public orderId?: string
  public hasTableClientName?: boolean
  public tableClientName?: string
  public tableClientPhone?: string
  public id?: string
}

export class RecipeHistory {
  public timestamp?: Date
  public name?: string
  public type?: string
  public id?: string
}

export class Client extends Employee {
  public availableMoney?: number
  public orders?: Array<PlateOrder> = []
  public availability?: boolean
  public type?: string
  public isConfirmed?: boolean
}

export class ClientAddress {
  public name?: string = ''
  public address?: string = ''
  public phone?: number = 0
}

export class Product {
  public timestamp?: Date
  public name?: string
  public price?: number
  public quantity?: number
  public supplier?: Supplier
  public id?: string
}

export class ProductOrder {
  public timestamp?: Date
  public name?: string
  public product: Product
  public supplier?: Supplier
  public user?: Employee
  public bill?: Bill
  public id?: string
  public data?: any
}

export class Supplier {
  public timestamp?: Date
  public name?: string
  public contacts?: string
  public type?: string
  public orders?: Array<ProductOrder> = []
  public id?: string
}

export class NutritionValue {
  public calories?: number
  public fat?: number
  public salt?: number
  public sugar?: number
  public protein?: number
  public carbohydrates?: number
}

// export class Role {
//   public cliente?: boolean
//   public mesero?: boolean
//   public gerente?: boolean
//   public cocinero?: boolean
//   public proveedor?: boolean
// }

export class Bill {
  public timestamp?: Date
  public amount?: number
  public products?: Array<ProductOrder> = []
  public plates?: Array<PlateOrder> = []
  public id?: string
}
